import { validator } from 'hono/validator'

import { factory } from '../../factory'
import { ApiError } from '../../shared/errors/api-error'

const healthQueryValidator = validator('query', (value) => {
  const detail = value['detail']

  if (detail !== undefined && detail !== 'true' && detail !== 'false') {
    throw new ApiError(
      400,
      'INVALID_QUERY',
      'Query parameter "detail" must be "true" or "false".',
    )
  }

  return { detail: detail === 'true' }
})

/**
 * runtime確認用のhealth feature。
 * 単純なsliceなのでServiceやRepositoryを追加せずroute内で完結させる。
 */
export const healthRoute = factory
  .createApp()
  .get('/', healthQueryValidator, (c) => {
    const { detail } = c.req.valid('query')

    if (detail) {
      return c.json({
        status: 'ok' as const,
        service: 'backend' as const,
        details: {
          dependencies: 'ok' as const,
        },
      })
    }

    return c.json({
      status: 'ok' as const,
      service: 'backend' as const,
    })
  })
