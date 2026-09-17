import type { Task, TaskReadModel } from './domain/task'

/** Command側が利用するTask永続化port。 */
export interface TaskWriteRepository {
  findForUpdate(id: string): Promise<Task | null>
  save(task: Task): Promise<void>
  delete(id: string): Promise<boolean>
}

/** Query側が利用するTask読み取りport。 */
export interface TaskReadRepository {
  getById(id: string): Promise<TaskReadModel | null>
  list(): Promise<readonly TaskReadModel[]>
}

/** 同一adapterでread/write両portを提供するときに利用するrepository型。 */
export type TaskRepository = TaskWriteRepository & TaskReadRepository
