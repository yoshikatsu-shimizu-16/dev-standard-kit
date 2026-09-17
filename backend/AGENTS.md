# Backend AGENTS.md

## Scope

このファイルは `backend/` 配下を変更するAI Coding Agent向けのナビゲーションです。root `AGENTS.md`、`ARCHITECTURE.md`、`.agents/profiles/hono/architecture-rules.md`、`docs/adr/0001-feature-oriented-vertical-slice.md` を先に読みます。

## Architecture

Backendは **Feature-oriented Vertical Slice Architecture** を採用します。

```text
src/
├── app.ts
├── factory.ts
├── features/
│   ├── health/
│   └── tasks/
└── shared/
```

- featureごとに変更理由を凝集する。
- rootに `routes/` / `services/` / `repositories/` を横並びにしない。
- `app.ts` はcomposition rootとし、feature sub-appを `app.route()` で合成する。
- Hono handlerはroute定義へinlineで置き、Controllerを原則作らない。
- 単純なsliceへService / Repositoryを機械的に追加しない。

## CQRS / DDD

CRUDを持つ `tasks` はreference implementationとしてCQRSを軽量に適用します。

- `commands/`: Create / Update / Delete。状態を変更する。
- `queries/`: Get / List。状態を変更しない。
- `domain/`: Command側で守る業務不変条件を持つ。
- `repository.ts`: write/readのportを分ける。ただしIssue #14では同じInMemory adapterが両方を実装する。

CQRSを理由にread/write DB、message bus、Event Sourcingを自動導入しません。DDDもEntityやRepositoryを置くこと自体を目的にしません。

## Runtime boundary

Cloudflare Workersがproduction targetです。application coreでNode.js専用APIを使いません。

`src/dev.ts` と `@hono/node-server` はローカル起動だけのadapterです。Wrangler、D1/R2 binding、migration、deploy設定はIssue #15の責務です。

`tasks` の `InMemoryTaskRepository` はCRUD構造を実行可能にするためのreference adapterであり、永続化用途ではありません。Issue #15でD1 adapterへ置き換えられる境界を維持します。

## API rules

- starterのAPI prefixは `/api`。
- `GET /api/health` を最小runtime確認に使う。
- CRUD referenceは `/api/tasks`。
- request validationはHono validator middlewareをrouteの近くに置く。
- public errorは `{ error: { code, message, requestId? } }` を使う。
- unexpected errorの内部情報・stack・secretをresponseへ出さない。
- root appはRPC利用に備えて `AppType` をexportする。

## Comments / JSDoc

project-owned sourceのコメントとJSDocは原則日本語で記述します。識別子、HTTP field名、規格名、外部ライブラリ名は英語のままで構いません。

H068によりexported function / class / type / interface / enumには意味のあるJSDocを付けます。TypeScript型をJSDocへ重複記述しません。

## Tests

- `tests/unit/`: domain ruleなど局所ロジック
- `tests/runtime/`: Hono HTTP entrypointを `app.request()` で検証
- `tests/integration/`: CRUDを含む代表ユースケースをHTTP境界から検証
- Cloudflare binding追加後は `@cloudflare/vitest-pool-workers` のWorker runtime testを追加する

変更後はroot `npm run harness:verify` を最終gateとして使います。
