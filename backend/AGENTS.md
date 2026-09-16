# Backend AGENTS.md

## Scope

このファイルは `backend/` 配下を変更するAI Coding Agent向けのナビゲーションです。root `AGENTS.md`、`ARCHITECTURE.md`、`.agents/profiles/hono/architecture-rules.md` を先に読みます。

## Required layering

```text
Route -> Service -> Repository / Storage
```

- `routes/`: HTTP boundary。request parse、validation呼び出し、service call、response mappingだけを担当する。
- `services/`: application/business ruleを担当する。Hono ContextやCloudflare bindingを直接受け取らない。
- `repositories/`: D1/R2等のstorage/runtime boundary。SQLやobject key規則をrouteへ漏らさない。
- `validation/`: raw requestをtyped inputへ変換する。invalid inputは共通 `ApiError` にする。
- `contracts/`: public response/error shape。Frontendと共有する意味を持つため変更時は互換性を確認する。
- `app.ts`: composition root。dependency injection、route registration、共通error handlingを担当する。

## Runtime boundary

Cloudflare Workersがproduction targetです。`app.ts`以下のapplication coreでNode.js専用APIを使いません。

`src/dev.ts` と `@hono/node-server` はローカル起動だけのadapterです。Cloudflare runtimeの代替実装ではありません。Wrangler、D1/R2 binding、migration、deploy設定は `infrastructure/` とIssue #15の責務です。

## API rules

- starterのAPI prefixは `/api`。
- 最小contractは `GET /api/health`。
- raw query/bodyをserviceへ渡さず、validation boundaryを通す。
- public errorは `{ error: { code, message, requestId? } }` を使う。
- unexpected errorの内部情報・stack・secretをresponseへ出さない。
- authを追加する場合は401/403 negative testを必須にする。

## H068 Public API JSDoc

exported function / class / type / interface / enumには意味のあるJSDocを付けます。

優先して説明する内容:

- contract / precondition
- architectural responsibility
- error / exceptional behavior
- non-obvious runtime constraint

TypeScript型をJSDocへ重複記述しません。test filesは機械ゲートの対象外です。

## Tests

- `tests/unit/`: validation / service等の局所ロジック
- `tests/runtime/`: Hono HTTP entrypointをWeb Standard Request/Responseで検証
- `tests/integration/`: route -> validation -> service -> repositoryの代表経路
- Cloudflare binding追加後は `@cloudflare/vitest-pool-workers` のWorker runtime testを追加する

変更後はroot `npm run harness:verify` を最終gateとして使います。
