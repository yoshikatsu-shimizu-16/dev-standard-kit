import { ApiError } from '../errors/api-error'

/** Parsed query accepted by the health service; routes must not pass raw request strings beyond validation. */
export interface HealthQuery {
  detail: boolean
}

/** Parses the optional detail query and rejects values outside the explicit true/false contract. */
export function parseHealthQuery(value: string | undefined): HealthQuery {
  if (value === undefined || value === 'false') {
    return { detail: false }
  }

  if (value === 'true') {
    return { detail: true }
  }

  throw new ApiError(
    400,
    'INVALID_QUERY',
    'Query parameter "detail" must be "true" or "false".',
  )
}
