# Backend skills / references

Backend boilerplateおよび今後のAI実装で参照する外部知識を記録します。repository-owned rulesと `.agents/profiles/hono/`、ADRを優先し、外部資料は判断根拠として利用します。

## Hono official skill

- Hono Skill: https://github.com/honojs/skills/blob/main/skills/hono/SKILL.md
- Hono Best Practices: https://hono.dev/docs/guides/best-practices
- Hono Factory: https://hono.dev/docs/helpers/factory
- Hono Testing: https://hono.dev/docs/guides/testing
- Hono RPC: https://hono.dev/docs/guides/rpc

採用事項:

- handlerをroute定義へinlineで置く
- 大きなapplicationは `app.route()` でfeatureごとのsub-appを合成する
- `createFactory()` をHono app生成の共通入口にする
- route chainの型推論を維持し `AppType` をexportする
- `app.request()` でHTTP境界をtestする
- Rails/Spring風Controllerを既定パターンにしない

## Architecture references

### Vertical Slice Architecture

- Jimmy Bogard: https://www.jimmybogard.com/vertical-slice-architecture/
- 日本語の補助資料: https://zenn.dev/saitom_tech/articles/vertical-slice-architecture-poem

採用事項:

- 技術レイヤーではなくfeature / use case方向へ凝集する
- sliceごとに必要な構造を選び、全sliceへ同じ層を強制しない
- Command / Queryの違いに応じて内部構造を変えてよい

### CQRS

- Martin Fowler: https://martinfowler.com/bliki/CQRS.html
- Command Query Separation: https://martinfowler.com/bliki/CommandQuerySeparation.html

採用事項:

- CQRS = Command Query Responsibility Segregation
- CommandとQueryのコード上の責務を分ける
- CQRSを理由にread/write DB分離やEvent Sourcingを自動導入しない
- 複雑さに見合うfeatureだけで利用する

## Cloudflare official references

- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Hono Cloudflare Workers: https://hono.dev/docs/getting-started/cloudflare-workers

Issue #14ではbinding/deployを実装しません。Issue #15でWorkers / D1 / R2のruntime adapterと実Worker testを追加します。

## Tooling references

- TypeScript: https://www.typescriptlang.org/docs/
- Vitest: https://vitest.dev/
- ESLint: https://eslint.org/docs/latest/
- eslint-plugin-jsdoc: https://github.com/gajus/eslint-plugin-jsdoc
- Prettier: https://prettier.io/docs/
