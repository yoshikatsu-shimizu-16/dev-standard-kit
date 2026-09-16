import { describe, expect, it } from 'vitest'

import { createApp } from '../../src/app'

describe('health route integration', () => {
  it('runs route -> validation -> service -> repository through the HTTP entrypoint', async () => {
    const response = await createApp().request(
      'http://localhost/api/health?detail=true',
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      status: 'ok',
      service: 'backend',
      details: {
        dependencies: 'ok',
      },
    })
  })

  it('uses the shared error contract for unmatched routes', async () => {
    const response = await createApp().request('http://localhost/api/missing')

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found.',
      },
    })
  })
})
