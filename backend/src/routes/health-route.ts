import type { Hono } from 'hono'

import type { HealthService } from '../services/health-service'
import { parseHealthQuery } from '../validation/health-query'

/** Registers the health HTTP boundary; request parsing and response mapping remain in the route layer. */
export function registerHealthRoutes(
  app: Hono,
  healthService: HealthService,
): void {
  app.get('/api/health', async (c) => {
    const query = parseHealthQuery(c.req.query('detail'))
    const response = await healthService.getHealth(query)
    return c.json(response, response.status === 'ok' ? 200 : 503)
  })
}
