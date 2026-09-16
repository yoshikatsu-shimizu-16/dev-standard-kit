# H068 Public API JSDoc

## Purpose

AI Coding Agentと人間が公開境界の契約・制約・副作用・例外・設計上の役割をコードの近くで理解できるようにする。
JSDocの量そのものを目的にせず、TypeScript型だけでは伝わらない意味を残す。

## Enforced scope

Frontend / Backendでは次をJSDoc必須とする。

- exported function
- exported React component / hook（Frontend）
- exported class
- exported TypeScript type / interface / enum

次は必須対象外とする。

- private helper
- inline callback
- test / story / E2E
- `frontend/src/components/ui/` のshadcn生成source

`frontend/src/components/ui/` はCLI生成物を上流へ追従しやすく保つため、変更済みかどうかをESLintで推測しない。この境界は常に機械的JSDoc必須対象外とする。
project固有の意味・契約を持つUIは、原則 `components/common` または `features` でwrapper/compositionとして表現し、そこでJSDocを必須化する。`components/ui` を直接customizeする場合はStory/testで差分を保証し、必要な説明は任意でJSDocへ追加する。

Backendではroute / service / repository / validation / contractのexportを同じpublic API規則で検証する。型情報の言い換えではなく、HTTP contract、layer responsibility、runtime constraint、error条件を優先して記述する。

## Mechanical enforcement

次のESLint設定をsource of truthとする。

- `frontend/eslint.config.js`
- `backend/eslint.config.js`

共通gate:

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

CIも `npm run harness:verify` を呼び、ローカルと同じlint gateを利用する。

## Authoring rule

良いJSDocは「何をするか」という名前の言い換えより、次を優先する。

- contract / precondition
- side effect
- error / exceptional behavior
- architectural responsibility
- non-obvious constraint or decision

TypeScriptが表現済みの型をJSDocへ重複記述しない。
形式だけ満たす `/** Foo. */` の増殖を避け、意味が不要な内部実装にはJSDocを要求しない。
