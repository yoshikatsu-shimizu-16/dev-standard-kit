import { createFactory } from 'hono/factory'

/**
 * Honoアプリとmiddlewareを生成する共通Factory。
 * Cloudflare bindingsのEnv型はIssue #15でここへ集約する。
 */
export const factory = createFactory()
