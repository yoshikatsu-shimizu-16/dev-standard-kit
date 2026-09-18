# Hono Backend boilerplate design

## Review

- [x] レビュー済み

## Architecture

```text
src/app.ts
  ├─ app.route('/api/health', features/health/route.ts)
  └─ app.route('/api/tasks',  features/tasks/route.ts)

features/tasks/route.ts
  ├─ Command ─> domain/Task ─> TaskWriteRepository
  │    ├─ Create
  │    ├─ Update
  │    └─ Delete
  └─ Query ────────────────> TaskReadRepository
       ├─ Get
       └─ List
```

feature単位でcodeを凝集する。単純な `health` はrouteだけ、CRUDを持つ `tasks` はcommands / queries / domain / repositoryを持つ。全sliceへ同じ層を強制しない。

`src/app.ts` はcomposition root、共通error mapping、404、feature registrationを担当する。Hono handlerは各 `route.ts` のroute定義へinlineで置く。

## Hono integration

- `factory.ts` で `createFactory()` を利用する。
- rootは `app.route()` でsub-appを合成する。
- route chainの推論結果を `AppType` としてexportする。
- validationはHono `validator` middlewareをrouteの近くへ置く。
- HTTP testは `app.request()` を使う。

## CQRS / DDD boundary

CQRSは論理的なCommand / Query分離までを採用する。同じInMemory adapterがread/write portを実装してよく、物理DB分離は要求しない。

Command側は `Task` domain modelを利用し、titleのtrim、blank拒否、120文字上限を守る。Query側は `TaskReadModel` を返し、ドメインモデルを必須にしない。

## Runtime boundary

`src/index.ts` はHono appをdefault exportする。`src/dev.ts` のみ `@hono/node-server` を利用する。

Issue #15でWrangler / D1 / R2 bindingsとD1 adapterを追加した。InMemory adapterをproduction永続化として扱わない。

## API

### Health

- `GET /api/health`
- optional query: `detail=true|false`

### Tasks

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Error

```ts
type ApiErrorResponse = {
  error: {
    code: string
    message: string
    requestId?: string
  }
}
```

unexpected exceptionのstackや内部情報はpublic responseへ含めない。

## Verification strategy

- Unit: Task domain rule
- Runtime: Hono `app.request()` でhealth / error / 404
- Integration: Tasks CRUD全経路を同一app instanceで実行
- Build: strict TypeScript emit
- H068: Backend exported public APIをESLintで機械検証
- Worker runtime with bindings: `@cloudflare/vitest-plugin`で検証する

## References

- ADR: `docs/adr/0001-feature-oriented-vertical-slice.md`
- Hono Best Practices: https://hono.dev/docs/guides/best-practices
- Hono official Skill: https://github.com/honojs/skills/blob/main/skills/hono/SKILL.md
- Vertical Slice Architecture: https://www.jimmybogard.com/vertical-slice-architecture/
- CQRS: https://martinfowler.com/bliki/CQRS.html
