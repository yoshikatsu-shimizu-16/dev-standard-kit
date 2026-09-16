/** HTTP status codes emitted through the starter's common API error contract. */
export type ApiErrorStatus = 400 | 404 | 500

/** Stable JSON error envelope shared by Backend routes and future Frontend clients. */
export interface ApiErrorResponse {
  error: {
    code: string
    message: string
    requestId?: string
  }
}
