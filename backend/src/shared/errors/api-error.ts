import type { ApiErrorStatus } from '../api-error'

/** HTTP境界へ安全に公開できるapplication error。 */
export class ApiError extends Error {
  constructor(
    public readonly status: ApiErrorStatus,
    public readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
