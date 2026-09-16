# Cloudflare Workers + D1 + R2 Profile

## Recommended architecture

新規フルスタックでは次を第一候補とする。

```text
React + Vite SPA
      ↓
Cloudflare Workers + Workers Assets
      ↓
Hono API
   ├─ D1
   └─ R2
```

Cloudflare Pages は既存構成やfrontend/API分離が必要な場合の選択肢とする。

## Workers
- `wrangler.jsonc` または `wrangler.toml` をbinding設定のsource of truthにする。
- binding名とTypeScriptのEnvironment型を一致させる。
- Workers runtime固有コードはNode.js専用APIへ依存させない。
- Workers Vitest integrationを使いruntime上で検証する。
- production deployは人間承認境界に置く。

## D1
- schema変更はmigrationとして追加する。
- 適用済みmigrationは書き換えない。
- migration変更時は空DBからの適用をローカルで検証する。
- repository/queryをD1 binding込みでintegration testする。
- production migrationはAIが自動実行しない。

例:
```bash
npx wrangler d1 migrations apply <DB_NAME> --local
```

## R2
- bucket名を実装へ直書きしない。
- binding経由でアクセスする。
- object key生成規則を共通関数化する。
- put/get/delete/not-found/metadata/content-type/overwrite policyを検証する。
- production objectの削除・上書きは人間承認境界に置く。

## Bindings example

```ts
export type Bindings = {
  DB: D1Database
  BUCKET: R2Bucket
}
```

## Integration Harness
Cloudflare Workers Vitest integration と、利用可能な場合は `createTestHarness()` を用いて、設定済みWorkerをHTTP入口から検証する。

最低限:
- health endpoint
- representative GET
- representative mutation
- validation failure
- persistence round-trip
