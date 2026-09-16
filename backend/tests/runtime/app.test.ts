import { describe, expect, it } from 'vitest'

import { createApp } from '../../src/app'

describe('Hono runtime boundary', () => {
  it('serves the minimal health contract through Web Standard Request/Response', async () => {
    const response = await createApp().request('http://localhost/api/health')

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      status: 'ok',
      service: 'backend',
    })
  })

  it('maps validation failures to the common error envelope', async () => {
    const response = await createApp().request(
      'http://localhost/api/health?detail=invalid',
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'INVALID_QUERY',
        message: 'Query parameter "detail" must be "true" or "false".',
      },
    })
  })
})
