import type { ApiErrorStatus } from '../contracts/api-error'

/** Error raised at application boundaries when a request can be mapped safely to the public API error envelope. */
export class ApiError extends Error {
  readonly status: ApiErrorStatus
  readonly code: string

  constructor(status: ApiErrorStatus, code: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}
