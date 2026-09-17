import type { TaskReadModel } from '../domain/task'
import type { TaskReadRepository } from '../repository'

/** Task一覧を取得するQuery。 */
export async function listTasks(
  repository: TaskReadRepository,
): Promise<readonly TaskReadModel[]> {
  return repository.list()
}
