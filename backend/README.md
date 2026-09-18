# Backend boilerplate

`backend/` はHonoを使ったAPIのreference implementationです。単なるHello Worldではなく、Hono公式の構成、Feature-oriented Vertical Slice Architecture、軽量なDDD / CQRS、CRUD、test / Harnessまでを一式で示します。

## Local development

rootから:

```bash
npm run dev:backend
```

Backend単体では:

```bash
npm run dev
```

Node.js adapterが `http://localhost:8787` でHono appを起動します。このadapterはローカル開発専用です。application coreはNode.js専用APIへ依存させません。

## Architecture

採用方針は `docs/adr/0001-feature-oriented-vertical-slice.md` に記録しています。

```text
src/
├── app.ts                 # composition root / error mapping / app.route()
├── factory.ts             # Hono Factory
├── features/
│   ├── health/
│   │   └── route.ts       # 単純なsliceは薄いまま保つ
│   └── tasks/
│       ├── route.ts
│       ├── commands/      # Create / Update / Delete
│       ├── queries/       # Get / List
│       ├── domain/        # Taskの不変条件
│       ├── repository.ts  # read/write port
│       ├── in-memory-task-repository.ts
│       └── storage/              # R2 adapter / object key policy
└── shared/
    ├── api-error.ts
    └── errors/
```

rootへ技術レイヤー別の `routes/` / `services/` / `repositories/` を並べず、変更理由が同じコードをfeatureへまとめます。Honoのhandlerはroute定義へinlineで置き、feature sub-appをrootの `app.route()` で合成します。

## CQRSとは

CQRSは **Command Query Responsibility Segregation** の略で、日本語では「コマンド・クエリ責務分離」と説明できます。

このboilerplateでは次の範囲だけを採用します。

- Command: Create / Update / Delete。状態を変更する。
- Query: Get / List。状態を変更しない。
- Command側ではTaskドメインモデルを使って不変条件を守る。
- Query側では用途に合ったread modelを直接返す。
- read/write repository interfaceは分け、WorkerではD1 adapter、Node testではInMemory adapterを使う。

別DB、Event Sourcing、message busまでは導入しません。CQRSは複雑さも増やすため、必要なfeatureだけに適用します。

## DDDの扱い

DDD（Domain-Driven Design）はディレクトリを増やすためのルールとして扱いません。`tasks` では「titleは空にできず120文字以下」という不変条件を `Task` ドメインモデルへ閉じ込め、Command側から利用します。

単純な `health` featureにはdomain/service/repositoryを作りません。複雑さがないのに層だけ増やす、あの伝統的な儀式はここではしません。

## API

### Health

- `GET /api/health`
- `GET /api/health?detail=true`

### Tasks CRUD reference

| 操作   | Method | Path             |
| ------ | ------ | ---------------- |
| Create | POST   | `/api/tasks`     |
| List   | GET    | `/api/tasks`     |
| Read   | GET    | `/api/tasks/:id` |
| Update | PATCH  | `/api/tasks/:id` |
| Delete | DELETE | `/api/tasks/:id` |

Create body:

```json
{
  "title": "Try Hono"
}
```

Update body:

```json
{
  "title": "Try Hono RPC",
  "status": "done"
}
```

`InMemoryTaskRepository` はNode.jsテストと構造確認用の揮発性adapterです。Worker runtimeではD1 bindingを`D1TaskRepository`へ接続します。

R2 object storageは`R2ObjectStorage`を介して`OBJECTS` bindingへ接続します。object keyはnamespace・identifier・filenameを`createObjectKey`でエンコードし、metadataとnot-foundをR2の契約どおり扱います。

## Error response

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task not found."
  }
}
```

unexpected exceptionのstackや内部情報はpublic responseへ含めません。

## Type-safe RPC

root appはrouteをchainして `AppType` をexportします。Frontend統合時に `hono/client` の `hc<AppType>()` を利用できる形を維持します。

## Verification

Backend単体:

```bash
npm run format:check --workspace @dev-standard/backend
npm run typecheck --workspace @dev-standard/backend
npm run lint --workspace @dev-standard/backend
npm run test --workspace @dev-standard/backend
npm run test:runtime --workspace @dev-standard/backend
npm run test:integration --workspace @dev-standard/backend
npm run build --workspace @dev-standard/backend
```

Repository全体:

```bash
npm run harness:verify
```

`@cloudflare/vitest-plugin` による実Worker runtime testで、D1 persistenceとR2 metadata round-tripを検証します。Infrastructure・Terraform・deploy承認境界は`infrastructure/README.md`を参照してください。
