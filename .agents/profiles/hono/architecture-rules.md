# Hono Profile

## Scope

Hono を API 層として利用するプロジェクトを想定する。

## Architecture style

Backend の既定構成は **Feature-oriented Vertical Slice Architecture** とする。

```text
src/
├── app.ts
├── factory.ts
├── features/
│   └── <feature>/
│       ├── route.ts
│       ├── commands/       # 状態を変更するユースケースがある場合
│       ├── queries/        # 読み取りユースケースがある場合
│       ├── domain/         # ドメインルールがある場合
│       └── repository.ts   # 永続化境界が必要な場合
└── shared/                 # 複数featureで本当に共有する横断関心だけ
```

技術レイヤー単位の `routes/` / `services/` / `repositories/` をrootへ並べる構成は既定にしない。変更理由が同じコードをfeature内へ凝集させる。

## Hono rules

- 大きなアプリはfeatureごとのHono sub-appに分け、rootでは `app.route()` で合成する。
- Hono handlerはroute定義へinlineで置き、Rails/Spring風Controllerを原則作らない。
- HonoのEnv型を共有する必要がある場合は `createFactory()` をsource of truthにする。
- request validationはrouteの近くでHono validator middlewareを使い、validated dataをhandlerから利用する。
- RPCを使えるようroute chainの型推論を壊さず、root appの `AppType` をexportする。
- 単純なfeatureへServiceやRepositoryを機械的に追加しない。必要になった責務だけをslice内へ追加する。

## CQRS / DDD

CRUDを持つfeatureでは、必要に応じてCQRS（Command Query Responsibility Segregation）の考え方を使う。

- Command: Create / Update / Deleteなど状態を変更する処理。
- Query: Readなど状態を変更しない処理。
- Command側は業務不変条件がある場合にドメインモデルを利用する。
- Query側はドメインモデルを必須にせず、用途に適したread modelを直接返してよい。
- CQRS採用だけを理由にread/write DBを分離しない。Event Sourcingも既定では導入しない。
- DDDのEntity / Value Object / Repositoryはドメイン上の意味や不変条件がある場合だけ導入する。

## Shared code

認証、logging、error mapping、request idなど複数featureを横断する処理はmiddlewareまたは `shared/` に置く。早すぎる共通化を避け、feature間の直接importを増やさない。

## Comments / JSDoc

project-owned sourceのコメントとJSDocは原則日本語で記述する。識別子、HTTP/API field名、標準規格名、外部ライブラリ固有名は英語のままでよい。

- exported function / class / type / interface / enumには意味のあるJSDocを付ける。
- トップレベルprivate helper functionにも日本語JSDocを付ける。
- 同一ファイルのfunction-like declarationはpublic exportを先に置き、その下へprivate helperを呼び出し順に積み上げる。
- inline callbackへ機械的にJSDocを付けない。大きなcallbackはnamed helperへ切り出すことを検討する。

## Required verification

- H068 public API JSDoc
- H069 public-first source layout / private helper JSDoc
- route/runtime test
- validation failure test
- representative integration test
- domain ruleがある場合はunit test
- authを触る場合は401/403 negative test
