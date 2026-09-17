import type { TaskReadModel } from '../domain/task'
import type { TaskReadRepository } from '../repository'
import { ApiError } from '../../../shared/errors/api-error'

/** idでTaskを取得するQuery。 */
export async function getTask(
  id: string,
  repository: TaskReadRepository,
): Promise<TaskReadModel> {
  const task = await repository.getById(id)

  if (task === null) {
    throw new ApiError(404, 'TASK_NOT_FOUND', 'Task not found.')
  }

  return task
}
