import { afterEach, describe, expect, it, vi } from 'vitest'
import { getJson } from './httpClient'

afterEach(() => {
  vi.restoreAllMocks()
})

function mockSuccessfulFetch() {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: vi.fn().mockResolvedValue({ ok: true }),
  } as unknown as Response)
}

describe('getJson', () => {
  it.each([
    ['Headers', new Headers({ Authorization: 'Bearer token' })],
    ['tuple array', [['Authorization', 'Bearer token']] as [string, string][]],
  ])('preserves %s RequestInit headers', async (_name, requestHeaders) => {
    const fetchMock = mockSuccessfulFetch()

    await getJson('/api/example', { headers: requestHeaders })

    const requestInit = fetchMock.mock.calls[0]?.[1]
    const headers = new Headers(requestInit?.headers)

    expect(headers.get('Authorization')).toBe('Bearer token')
    expect(headers.get('Accept')).toBe('application/json')
  })

  it('preserves a caller supplied Accept header', async () => {
    const fetchMock = mockSuccessfulFetch()

    await getJson('/api/example', {
      headers: { Accept: 'application/problem+json' },
    })

    const requestInit = fetchMock.mock.calls[0]?.[1]
    const headers = new Headers(requestInit?.headers)

    expect(headers.get('Accept')).toBe('application/problem+json')
  })
})
