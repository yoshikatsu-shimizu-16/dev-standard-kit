import { describe, expect, it } from 'vitest'

import { createApp } from '../../src/app'

describe('Hono runtime boundary', () => {
  it('health endpointをWeb Standard Request/Responseで処理できる', async () => {
    const app = createApp()
    const response = await app.request('/api/health?detail=true')

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      status: 'ok',
      service: 'backend',
      details: {
        dependencies: 'ok',
      },
    })
  })

  it('不正なhealth queryを共通error responseへ変換する', async () => {
    const app = createApp()
    const response = await app.request('/api/health?detail=yes')

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: {
        code: 'INVALID_QUERY',
        message: 'Query parameter "detail" must be "true" or "false".',
      },
    })
  })

  it('未登録routeを404へ変換する', async () => {
    const app = createApp()
    const response = await app.request('/api/unknown')

    expect(response.status).toBe(404)
  })
})
