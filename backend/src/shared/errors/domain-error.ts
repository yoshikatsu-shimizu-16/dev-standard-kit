/** ドメインの不変条件違反を表すHTTP非依存のerror。 */
export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'DomainError'
  }
}
