/** APIとして公開するエラーで利用するHTTP status。 */
export type ApiErrorStatus = 400 | 404 | 500

/** APIが公開する共通エラーresponse。 */
export type ApiErrorResponse = {
  error: {
    code: string
    message: string
    requestId?: string
  }
}
