import { createFactory } from 'hono/factory'

import type { AppEnv } from './env'

/**
 * Honoアプリとmiddlewareを生成する共通Factory。
 * Cloudflare bindingsのEnv型をここへ集約する。
 */
export const factory = createFactory<AppEnv>()
