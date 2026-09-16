import { Hono } from 'hono'

import type { ApiErrorResponse } from './contracts/api-error'
import { ApiError } from './errors/api-error'
import {
  StaticSystemRepository,
  type SystemRepository,
} from './repositories/system-repository'
import { registerHealthRoutes } from './routes/health-route'
import { HealthService } from './services/health-service'

/** Creates the Hono application while keeping runtime/storage adapters injectable at the composition root. */
export function createApp(
  systemRepository: SystemRepository = new StaticSystemRepository(),
): Hono {
  const app = new Hono()
  const healthService = new HealthService(systemRepository)

  registerHealthRoutes(app, healthService)

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
}
