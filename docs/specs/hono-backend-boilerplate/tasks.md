# Hono Backend boilerplate tasks

## Implementation

- [x] Backend npm workspaceを追加する
- [x] Hono executable app / local Node adapterを追加する
- [x] Feature-oriented Vertical Slice Architectureへ再構成する
- [x] Hono sub-appを `app.route()` で合成する
- [x] `createFactory()` を導入する
- [x] root `AppType` をexportする
- [x] health featureを薄いsliceとして実装する
- [x] Tasks CRUD referenceを追加する
- [x] Command / Queryを分離する
- [x] Task domain modelへ不変条件を実装する
- [x] read/write repository portとInMemory adapterを追加する
- [x] 共通API / Domain error mappingを追加する
- [x] source comments / JSDocを日本語へ統一する
- [x] unit / runtime / integration testを追加する
- [x] ADR-0001を追加する
- [x] Backend README / AGENTS / SKILLSを更新する
- [x] root Harness / GitHub Actionsへ接続する

## Deferred

- [ ] Issue #15: Wrangler / Workers / D1 / R2 bindings
- [ ] Issue #15: D1 TaskRepository adapter
- [ ] Issue #15: `@cloudflare/vitest-pool-workers` runtime test
- [ ] Issue #16: FrontendからHono RPC / same-origin `/api` を接続する
