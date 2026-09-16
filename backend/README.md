# Backend boilerplate

`backend/` は Hono を使った API / business logic / repository / validation の reference implementation です。
Issue #14 では Cloudflare に依存しない application core を作り、Issue #15 で Workers / D1 / R2 の concrete runtime adapter を接続します。

## Local development

root から:

```bash
npm run dev:backend
```

Backend単体では:

```bash
npm run dev
```

Node.js adapter が `http://localhost:8787` で Hono app を起動します。この adapter はローカル開発専用です。application core (`app.ts` / routes / services / repositories / validation) は Node.js 専用APIへ依存させません。

## Minimal API contract

### `GET /api/health`

通常:

```json
{
  "status": "ok",
  "service": "backend"
}
```

`?detail=true`:

```json
{
  "status": "ok",
  "service": "backend",
  "details": {
    "dependencies": "ok"
  }
}
```

`detail` が `true` / `false` 以外なら `400` と共通error envelopeを返します。

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Query parameter \"detail\" must be \"true\" or \"false\"."
  }
}
```

Frontendとの統合では `/api` をsame-origin API prefixとして使います。Vite proxy / Workers routingの具体設定はIssue #16で接続します。

## Architecture

```text
HTTP Request
    ↓
routes/          request parse / validation call / response mapping
    ↓
services/        application/business logic
    ↓
repositories/    storage/runtime boundary
```

補助境界:

- `contracts/`: Frontendや外部境界から見えるresponse/error shape
- `validation/`: raw requestをtyped inputへ変換し、invalid inputを拒否
- `errors/`: public error contractへ安全に変換できるapplication error
- `app.ts`: composition root / error handling / route registration
- `index.ts`: Cloudflare Workersでも利用できるdefault Hono export
- `dev.ts`: Node.js local adapterのみ

D1 SQL、R2 object key、Cloudflare bindingをrouteへ直接書きません。Issue #15でrepository implementationとruntime bindingを追加します。

## Verification

Backend単体:

```bash
npm run format:check --workspace @dev-standard/backend
npm run typecheck --workspace @dev-standard/backend
npm run lint --workspace @dev-standard/backend
npm run test --workspace @dev-standard/backend
npm run test:runtime --workspace @dev-standard/backend
npm run test:integration --workspace @dev-standard/backend
npm run build --workspace @dev-standard/backend
```

Repository全体:

```bash
npm run harness:verify
```

### Runtime test policy

Issue #14では Hono `app.request()` を使い、Web Standard `Request` / `Response` のHTTP入口から route と error mapping を検証します。

Issue #15で `wrangler.jsonc` とbindingsが追加されたら、Cloudflare推奨の `@cloudflare/vitest-pool-workers` による実Worker runtime testを追加し、D1/R2 binding込みのintegrationへ昇格します。Node adapterのテストをCloudflare runtime testの代用品にはしません。

## H068 Public API JSDoc

exportされた function / class / type / interface は `eslint-plugin-jsdoc` の `require-jsdoc` で検証します。test codeは対象外です。型情報をJSDocへ重複させず、contract / responsibility / error条件を説明します。

## Out of scope for Issue #14

- D1/R2 bindingの実装
- Wrangler / deploy configuration
- production resource ID / secret
- authentication / authorization
- domain-specific sample application

これらをBackendに先回りして埋め込まず、Infrastructureとの境界を保ちます。
