import { validator } from 'hono/validator'

import { factory } from '../../factory'
import { ApiError } from '../../shared/errors/api-error'
import { createTask } from './commands/create-task'
import { deleteTask } from './commands/delete-task'
import { updateTask } from './commands/update-task'
import type { TaskStatus } from './domain/task'
import { getTask } from './queries/get-task'
import { listTasks } from './queries/list-tasks'
import type { TaskRepository } from './repository'

const createTaskValidator = validator('json', (value) => {
  const body = asObject(value)
  const title = body['title']

  if (typeof title !== 'string') {
    throw new ApiError(400, 'INVALID_REQUEST', '"title" must be a string.')
  }

  return { title }
})

const updateTaskValidator = validator('json', (value) => {
  const body = asObject(value)
  const titleValue = body['title']
  const statusValue = body['status']

  if (titleValue !== undefined && typeof titleValue !== 'string') {
    throw new ApiError(400, 'INVALID_REQUEST', '"title" must be a string.')
  }

  let status: TaskStatus | undefined
  if (statusValue !== undefined) {
    if (statusValue !== 'open' && statusValue !== 'done') {
      throw new ApiError(
        400,
        'INVALID_REQUEST',
        '"status" must be "open" or "done".',
      )
    }
    status = statusValue
  }

  if (titleValue === undefined && status === undefined) {
    throw new ApiError(
      400,
      'INVALID_REQUEST',
      'At least one of "title" or "status" is required.',
    )
  }

  return {
    title: typeof titleValue === 'string' ? titleValue : undefined,
    status,
  }
})

/** Task CRUDのHTTP境界を提供するfeature sub-appを生成する。 */
export function createTaskRoutes(repository: TaskRepository) {
  return factory
    .createApp()
    .get('/', async (c) => {
      const items = await listTasks(repository)
      return c.json({ items })
    })
    .get('/:id', async (c) => {
      const task = await getTask(c.req.param('id'), repository)
      return c.json(task)
    })
    .post('/', createTaskValidator, async (c) => {
      const command = c.req.valid('json')
      const task = await createTask(command, repository)
      return c.json(task, 201)
    })
    .patch('/:id', updateTaskValidator, async (c) => {
      const input = c.req.valid('json')
      const task = await updateTask(
        {
          id: c.req.param('id'),
          title: input.title,
          status: input.status,
        },
        repository,
      )
      return c.json(task)
    })
    .delete('/:id', async (c) => {
      await deleteTask({ id: c.req.param('id') }, repository)
      return c.body(null, 204)
    })
}

function asObject(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new ApiError(400, 'INVALID_REQUEST', 'JSON body must be an object.')
  }

  return value as Record<string, unknown>
}
