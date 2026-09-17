# H069 Public-first Source Layout

## Purpose

ソースを開いた直後に公開入口を見つけ、その下へprivate helperを読み進められる順序を固定する。
AI Coding Agentが生成するコードでも、人間が「上から読む」だけで処理の全体像を追えることを優先する。

## Rule

project-owned TypeScript / TSX sourceでは、同一ファイル内のトップレベルfunction-like declarationを次の順に置く。

1. exported public function / exported function-valued variable
2. non-exported private helper function / function-valued variable

imports、type/interface、module constant、classなどはこの並び判定の対象外とする。
private helperは、可能な範囲で公開関数から呼ばれる順に上から積み上げる。

```ts
/** 外部から呼ばれる公開入口。 */
export function execute() {
  const value = normalizeInput()
  return buildResult(value)
}

/** 入力を内部表現へ正規化する。 */
function normalizeInput() {
  // ...
}

/** 正規化済みの値から結果を組み立てる。 */
function buildResult(value: string) {
  // ...
}
```

## JSDoc

トップレベルprivate helperにも日本語JSDocを付ける。
inline callbackや短いnested callbackには要求しない。大きなnested helperになった場合は、トップレベルhelperへ切り出して読み順を明確にすることを検討する。

## Exclusions

- test / story / E2E
- `frontend/src/components/ui/` のshadcn生成source
- inline callback
- class memberの並び

## Mechanical enforcement

`.agents/scripts/source-layout-check.mjs` が `frontend/src` と `backend/src` を走査し、次をfail-closedで検証する。

- private helperの後ろにpublic functionが現れないこと
- トップレベルprivate helperにJSDocが存在すること

`npm run harness:verify` とGitHub Actionsの両方から同じcheckerを実行する。
