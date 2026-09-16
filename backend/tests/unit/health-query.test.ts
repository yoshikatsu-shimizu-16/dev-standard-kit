import { describe, expect, it } from 'vitest'

import { ApiError } from '../../src/errors/api-error'
import { parseHealthQuery } from '../../src/validation/health-query'

describe('parseHealthQuery', () => {
  it('uses compact responses by default', () => {
    expect(parseHealthQuery(undefined)).toEqual({ detail: false })
    expect(parseHealthQuery('false')).toEqual({ detail: false })
  })

  it('accepts detail=true', () => {
    expect(parseHealthQuery('true')).toEqual({ detail: true })
  })

  it('rejects unsupported values with the common API error type', () => {
    expect(() => parseHealthQuery('yes')).toThrowError(ApiError)
  })
})
