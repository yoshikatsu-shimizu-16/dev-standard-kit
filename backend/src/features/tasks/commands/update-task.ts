import type { TaskReadModel, TaskStatus } from '../domain/task'
import type { TaskWriteRepository } from '../repository'
import { ApiError } from '../../../shared/errors/api-error'

/** Task更新Command。 */
export type UpdateTaskCommand = Readonly<{
  id: string
  title: string | undefined
  status: TaskStatus | undefined
}>

/** Task更新Commandを実行し、更新後のread modelを返す。 */
export async function updateTask(
  command: UpdateTaskCommand,
  repository: TaskWriteRepository,
  now: () => string = () => new Date().toISOString(),
): Promise<TaskReadModel> {
  const task = await repository.findForUpdate(command.id)

  if (task === null) {
    throw new ApiError(404, 'TASK_NOT_FOUND', 'Task not found.')
  }

  const updated = task.update(command.title, command.status, now())
  await repository.save(updated)
  return updated.toReadModel()
}
