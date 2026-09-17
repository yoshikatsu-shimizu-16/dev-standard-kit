# H068 Public API / Helper JSDoc

## Purpose

AI Coding Agentと人間が公開境界の契約・制約・副作用・例外・設計上の役割をコードの近くで理解できるようにする。
JSDocの量そのものを目的にせず、TypeScript型だけでは伝わらない意味を残す。

## Enforced scope

Frontend / Backendでは次をJSDoc必須とする。

- exported function
- exported React component / hook（Frontend）
- exported class
- exported TypeScript type / interface / enum
- project-owned sourceのトップレベル非export helper function / function-valued variable

次は必須対象外とする。

- inline callback
- function内部だけに閉じた短いnested callback
- test / story / E2E
- `frontend/src/components/ui/` のshadcn生成source

トップレベルのprivate helperは「公開APIを読んだあと、その実装詳細を上から追える」状態を作るためJSDoc必須とする。private helperのJSDocも原則日本語で記述し、名前の言い換えではなく、そのhelperが担う判断・正規化・変換・前提条件を説明する。

`frontend/src/components/ui/` はCLI生成物を上流へ追従しやすく保つため、機械的JSDoc必須対象外とする。project固有の意味・契約を持つUIは、原則 `components/common` または `features` でwrapper/compositionとして表現し、そこでJSDocを付ける。

Backendではroute / service / repository / validation / contractのexportを同じpublic API規則で検証する。型情報の言い換えではなく、HTTP contract、layer responsibility、runtime constraint、error条件を優先して記述する。

## Mechanical enforcement

公開APIのJSDocは次のESLint設定をsource of truthとする。

- `frontend/eslint.config.js`
- `backend/eslint.config.js`

共通gate:

- `jsdoc/require-jsdoc`: `error`
- `publicOnly`: ESM exportのみ
- `enableFixer`: `false`
- `jsdoc/no-blank-blocks`: `error`
- `jsdoc/no-types`: `error`

トップレベルprivate helperのJSDocとpublic-first配置は `.agents/scripts/harness/checks/source-layout-check.mjs` が検証する。通常は内部checkerを直接呼ばず、`npm run harness:verify` から実行してローカルとCIで同じgateを利用する。

## Authoring rule

良いJSDocは「何をするか」という名前の言い換えより、次を優先する。

- contract / precondition
- side effect
- error / exceptional behavior
- architectural responsibility
- non-obvious constraint or decision

TypeScriptが表現済みの型をJSDocへ重複記述しない。
公開APIだけでなく、トップレベルprivate helperも「なぜこの処理が必要か」が初見で分かる説明を残す。
