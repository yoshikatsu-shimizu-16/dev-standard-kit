# Backend skills / references

Backend boilerplateおよび今後のAI実装で参照する外部知識を記録します。repository-owned rulesと `.agents/profiles/hono/` を優先し、外部Skillは補助情報として扱います。

## Adopted skills.sh references

### Hono official skill

- skills.sh: https://www.skills.sh/yusukebe/hono-skill/hono
- source: https://github.com/yusukebe/hono-skill
- use for: Hono routing、Context、middleware、`app.request()`、typed API、runtime-aware implementation
- note: Hono作者のrepositoryを優先候補とし、API詳細は常にHono公式docsで再確認する

### Cloudflare official skill

- skills.sh: https://www.skills.sh/cloudflare/skills/cloudflare
- source: https://github.com/cloudflare/skills
- use for: Workers / D1 / R2 / Static Assetsのproduct選択と最新docsへの導線
- note: Issue #14ではbinding/deployを実装しない。Issue #15のInfrastructure作業で主に利用する

## Hono official docs

- Hono docs: https://hono.dev/docs/
- Hono API / `app.fetch`: https://hono.dev/docs/api/hono
- Testing / `app.request()`: https://hono.dev/docs/guides/testing
- Cloudflare Workers: https://hono.dev/docs/getting-started/cloudflare-workers
- Node.js local adapter: https://hono.dev/docs/getting-started/nodejs

採用方針:

- application coreはWeb Standard APIを使い、Cloudflare Workersで動く形を維持する
- `export default app` をCloudflare側から利用できるentrypointにする
- unit/runtime段階では `app.request()` を使ってHTTP contractを検証する
- Cloudflare bindingsが必要なtestはIssue #15でWorkers Vitest integrationへ移す
- `@hono/node-server` はローカル起動adapterとしてのみ使い、business logicへNode APIを持ち込まない

## Tooling references

- TypeScript: https://www.typescriptlang.org/docs/
- Vitest: https://vitest.dev/
- ESLint: https://eslint.org/docs/latest/
- eslint-plugin-jsdoc: https://github.com/gajus/eslint-plugin-jsdoc
- Prettier: https://prettier.io/docs/
