import type { D1Database, R2Bucket } from '@cloudflare/workers-types'

/** Cloudflare Workersから注入されるruntime bindingの型。 */
export type Bindings = {
  DB: D1Database
  OBJECTS: R2Bucket
}

/** Hono applicationが利用するCloudflare環境型。 */
export type AppEnv = {
  Bindings: Bindings
}
