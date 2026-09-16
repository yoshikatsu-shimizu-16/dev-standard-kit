# Hono Backend boilerplate design

## Review

- [x] レビュー済み

## Architecture

```text
GET /api/health
      ↓
routes/health-route.ts
      ↓
validation/health-query.ts
      ↓
services/health-service.ts
      ↓
repositories/system-repository.ts
```

`src/app.ts` をcomposition rootとし、repositoryをserviceへ注入してrouteを登録する。public error mappingと404もここへ集約する。

## Runtime boundary

`src/index.ts` はHono appをdefault exportする。これはCloudflare Workers側からそのまま利用できる形を維持する。

`src/dev.ts` のみ `@hono/node-server` を利用し、port 8787でlocal developmentを可能にする。Node adapterはproduction runtime contractに含めない。

Issue #15でInfrastructureが追加されたら、Wrangler / D1 / R2 bindingsは `infrastructure/` をsource of truthとし、repository implementationへ注入する。

## Contracts

### Health

- path: `/api/health`
- method: GET
- optional query: `detail=true|false`
- normal status: 200
- degraded status: 503

### Error

```ts
type ApiErrorResponse = {
  error: {
    code: string
    message: string
    requestId?: string
  }
}
```

unexpected exceptionのstackや内部情報はpublic responseへ含めない。

## Verification strategy

- Unit: validation / service
- Runtime: Hono `app.request()` でRequest/Response boundary
- Integration: route -> validation -> service -> repository
- Build: strict TypeScript emit
- H068: Backend exported public APIをESLintで機械検証
- Worker runtime with bindings: Issue #15で `@cloudflare/vitest-pool-workers` を追加

## References

- Hono testing: https://hono.dev/docs/guides/testing
- Hono Cloudflare Workers: https://hono.dev/docs/getting-started/cloudflare-workers
- Hono Node.js: https://hono.dev/docs/getting-started/nodejs
