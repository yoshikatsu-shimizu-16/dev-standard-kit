import type { TaskWriteRepository } from '../repository'
import { ApiError } from '../../../shared/errors/api-error'

/** Task削除Command。 */
export type DeleteTaskCommand = Readonly<{
  id: string
}>

/** Task削除Commandを実行する。 */
export async function deleteTask(
  command: DeleteTaskCommand,
  repository: TaskWriteRepository,
): Promise<void> {
  const deleted = await repository.delete(command.id)

  if (!deleted) {
    throw new ApiError(404, 'TASK_NOT_FOUND', 'Task not found.')
  }
}
