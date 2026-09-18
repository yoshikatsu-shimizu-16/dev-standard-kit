import { Task, type TaskReadModel, type TaskStatus } from './domain/task'
import type { TaskRepository } from './repository'

type TaskRow = {
  id: string
  title: string
  status: string
  created_at: string
  updated_at: string
}

/** Cloudflare D1をTasksのread/write portへ適合させる永続化adapter。 */
export class D1TaskRepository implements TaskRepository {
  /** Cloudflareから注入されたD1 bindingをTaskRepositoryへ接続する。 */
  constructor(private readonly database: D1Database) {}

  // 🔵 Intent: D1の1行をドメインモデルへ戻し、Command側でも不変条件を維持する。
  async findForUpdate(id: string): Promise<Task | null> {
    const row = await this.findRow(id)
    return row === null ? null : Task.restore(toReadModel(row))
  }

  // 🔵 Intent: INSERTと更新を同じupsertに統一し、Commandのsave portを単純に保つ。
  async save(task: Task): Promise<void> {
    await this.database
      .prepare(
        `INSERT INTO tasks (id, title, status, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5)
         ON CONFLICT(id) DO UPDATE SET
           title = excluded.title,
           status = excluded.status,
           updated_at = excluded.updated_at`,
      )
      .bind(task.id, task.title, task.status, task.createdAt, task.updatedAt)
      .run()
  }

  // 🔵 Intent: D1のchangesを使い、存在しないidをCommandへ正確に通知する。
  async delete(id: string): Promise<boolean> {
    const result = await this.database
      .prepare('DELETE FROM tasks WHERE id = ?1')
      .bind(id)
      .run()
    return result.meta.changes > 0
  }

  // 🔵 Intent: Queryはドメイン操作を経由せず、永続化済みread modelを直接返す。
  async getById(id: string): Promise<TaskReadModel | null> {
    const row = await this.findRow(id)
    return row === null ? null : toReadModel(row)
  }

  // 🔵 Intent: 一覧取得の順序をcreated_atとidで固定し、API応答を再現可能にする。
  async list(): Promise<readonly TaskReadModel[]> {
    const result = await this.database
      .prepare(
        `SELECT id, title, status, created_at, updated_at
         FROM tasks
         ORDER BY created_at ASC, id ASC`,
      )
      .all<TaskRow>()
    return result.results.map(toReadModel)
  }

  /** D1からTaskの永続化行を1件取得する。 */
  private async findRow(id: string): Promise<TaskRow | null> {
    return this.database
      .prepare(
        'SELECT id, title, status, created_at, updated_at FROM tasks WHERE id = ?1',
      )
      .bind(id)
      .first<TaskRow>()
  }
}

/** D1のsnake_case行をAPIとドメイン共通のread modelへ変換する。 */
function toReadModel(row: TaskRow): TaskReadModel {
  return {
    id: row.id,
    title: row.title,
    status: toTaskStatus(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** 永続化データのstatusを許容されたTask状態へ絞り込む。 */
function toTaskStatus(status: string): TaskStatus {
  if (status !== 'open' && status !== 'done') {
    throw new Error('Invalid task status persisted in D1.')
  }
  return status
}
