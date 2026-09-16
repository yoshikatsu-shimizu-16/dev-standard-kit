# H068 Public API JSDoc

## Purpose

AI Coding Agentと人間が公開境界の契約・制約・副作用・例外・設計上の役割をコードの近くで理解できるようにする。
JSDocの量そのものを目的にせず、TypeScript型だけでは伝わらない意味を残す。

## Enforced scope

Frontendでは次をJSDoc必須とする。

- exported function
- exported React component
- exported hook
- exported class
- exported TypeScript type / interface / enum

次は必須対象外とする。

- private helper
- inline callback
- test / story / E2E
- `src/components/ui/` の未変更shadcn生成source

## Mechanical enforcement

`frontend/eslint.config.js` の `eslint-plugin-jsdoc` をsource of truthとする。

- `jsdoc/require-jsdoc`: `error`
- `publicOnly`: ESM exportのみ
- `enableFixer`: `false`
- `jsdoc/no-blank-blocks`: `error`
- `jsdoc/no-types`: `error`

`npm run lint` に含まれるため、次のどちらでも不足時に失敗する。

```bash
npm run lint
npm run harness:verify
```

CIも同じlint gateを利用する。

## Authoring rule

良いJSDocは「何をするか」という名前の言い換えより、次を優先する。

- contract / precondition
- side effect
- error / exceptional behavior
- architectural responsibility
- non-obvious constraint or decision

TypeScriptが表現済みの型をJSDocへ重複記述しない。
形式だけ満たす `/** Foo. */` の増殖を避け、意味が不要な内部実装にはJSDocを要求しない。
