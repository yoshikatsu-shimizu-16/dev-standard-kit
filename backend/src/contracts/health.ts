/** Health values exposed by the starter contract and reused by dependency checks. */
export type HealthStatus = 'ok' | 'degraded'

/** Response contract for GET /api/health. */
export interface HealthResponse {
  status: HealthStatus
  service: 'backend'
  details?: {
    dependencies: HealthStatus
  }
}
