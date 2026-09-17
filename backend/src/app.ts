import type { ApiErrorResponse } from './shared/api-error'
import { DomainError } from './shared/errors/domain-error'
import { ApiError } from './shared/errors/api-error'
import { factory } from './factory'
import { healthRoute } from './features/health/route'
import { InMemoryTaskRepository } from './features/tasks/in-memory-task-repository'
import { createTaskRoutes } from './features/tasks/route'
import type { TaskRepository } from './features/tasks/repository'

/**
 * Hono applicationを生成するcomposition root。
 * storage adapterを注入可能にし、feature sub-appを `app.route()` で合成する。
 */
export function createApp(
  taskRepository: TaskRepository = new InMemoryTaskRepository(),
) {
  const app = factory.createApp()

  app.notFound((c) => {
    const response: ApiErrorResponse = {
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found.',
      },
    }
    return c.json(response, 404)
  })

  app.onError((error, c) => {
    if (error instanceof DomainError) {
      const response: ApiErrorResponse = {
        error: {
          code: error.code,
          message: error.message,
        },
      }
      return c.json(response, 400)
    }

    if (error instanceof ApiError) {
      const response: ApiErrorResponse = {
        error: {
          code: error.code,
          message: error.message,
        },
      }
      return c.json(response, error.status)
    }

    const response: ApiErrorResponse = {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error.',
      },
    }
    return c.json(response, 500)
  })

  return app
    .route('/api/health', healthRoute)
    .route('/api/tasks', createTaskRoutes(taskRepository))
}

/** FrontendのHono RPC clientから利用するroot application type。 */
export type AppType = ReturnType<typeof createApp>
