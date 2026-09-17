import type { Task, TaskReadModel } from './domain/task'
import type { TaskRepository } from './repository'

/** CRUD referenceを実行可能にする揮発性Task repository。 */
export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks = new Map<string, Task>()

  async findForUpdate(id: string): Promise<Task | null> {
    return this.tasks.get(id) ?? null
  }

  async save(task: Task): Promise<void> {
    this.tasks.set(task.id, task)
  }

  async delete(id: string): Promise<boolean> {
    return this.tasks.delete(id)
  }

  async getById(id: string): Promise<TaskReadModel | null> {
    return this.tasks.get(id)?.toReadModel() ?? null
  }

  async list(): Promise<readonly TaskReadModel[]> {
    return Array.from(this.tasks.values(), (task) => task.toReadModel())
  }
}
