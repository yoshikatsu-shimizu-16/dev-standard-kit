import { DomainError } from '../../../shared/errors/domain-error'

/** Taskが取り得る状態。 */
export type TaskStatus = 'open' | 'done'

/** Query側やAPI responseで利用するTaskのread model。 */
export type TaskReadModel = Readonly<{
  id: string
  title: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}>

/** Taskの不変条件と状態遷移を保持するドメインモデル。 */
export class Task {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly status: TaskStatus,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}

  static create(id: string, title: string, createdAt: string): Task {
    const normalizedTitle = normalizeTitle(title)
    return new Task(id, normalizedTitle, 'open', createdAt, createdAt)
  }

  static restore(model: TaskReadModel): Task {
    return new Task(
      model.id,
      model.title,
      model.status,
      model.createdAt,
      model.updatedAt,
    )
  }

  update(
    title: string | undefined,
    status: TaskStatus | undefined,
    updatedAt: string,
  ): Task {
    return new Task(
      this.id,
      title === undefined ? this.title : normalizeTitle(title),
      status ?? this.status,
      this.createdAt,
      updatedAt,
    )
  }

  toReadModel(): TaskReadModel {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

/** Task titleをdomain ruleに従う内部表現へ正規化し、不正値を拒否する。 */
function normalizeTitle(title: string): string {
  const normalized = title.trim()

  if (normalized.length === 0) {
    throw new DomainError('INVALID_TASK_TITLE', 'Task title must not be blank.')
  }

  if (normalized.length > 120) {
    throw new DomainError(
      'INVALID_TASK_TITLE',
      'Task title must be 120 characters or fewer.',
    )
  }

  return normalized
}
