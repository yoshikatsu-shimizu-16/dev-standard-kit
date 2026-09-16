# Hono Profile

## Scope
Hono をAPI層として利用するプロジェクトを想定する。

## Layering
```text
Route -> Service -> Repository / Storage
```

## Rules
- Routeはrequest parse、validation、auth context、service call、response mappingに限定する。
- 大きなbusiness logicをrouteへ直書きしない。
- SQLやobject key生成規則をrouteへ持ち込まない。
- request validationを明示し、invalid input testを持つ。
- response shapeはshared contract/schemaとして定義する。
- error responseは共通形式を使う。

推奨エラー形式:
```ts
type ApiError = {
  error: {
    code: string
    message: string
    requestId?: string
  }
}
```

## Required verification
- route unit/runtime test
- validation failure test
- representative integration test
- authを触る場合は401/403 negative test
