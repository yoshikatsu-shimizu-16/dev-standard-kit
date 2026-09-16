export class HttpError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export async function getJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers)

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  const response = await fetch(input, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new HttpError(
      `HTTP request failed with ${response.status}`,
      response.status,
    )
  }

  return (await response.json()) as T
}
