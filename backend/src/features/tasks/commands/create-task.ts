import { Task, type TaskReadModel } from '../domain/task'
import type { TaskWriteRepository } from '../repository'

/** Task作成Command。 */
export type CreateTaskCommand = Readonly<{
  title: string
}>

/** Task作成Commandを実行し、作成後のread modelを返す。 */
export async function createTask(
  command: CreateTaskCommand,
  repository: TaskWriteRepository,
  createId: () => string = () => globalThis.crypto.randomUUID(),
  now: () => string = () => new Date().toISOString(),
): Promise<TaskReadModel> {
  const task = Task.create(createId(), command.title, now())
  await repository.save(task)
  return task.toReadModel()
}
