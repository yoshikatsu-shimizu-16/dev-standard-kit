# ADR-0001: BackendにFeature-oriented Vertical Slice Architectureを採用する

- Status: Accepted
- Date: 2026-09-17

## Context

Hono Backend boilerplateを今後の個人開発でforkして利用する。従来の `routes/` / `services/` / `repositories/` のような技術レイヤー別構成は理解しやすい一方、1つのfeature変更で複数directoryを横断しやすい。

Hono公式Best Practicesと公式Skillは、Rails風Controllerを避け、handlerをroute定義へinlineで置き、大きなapplicationではfeatureごとのsub-appを `app.route()` で合成する方向を推奨している。

また、CRUD referenceがhealth endpointだけでは弱く、実アプリで頻出する状態変更、読み取り、ドメインルール、永続化境界の例が必要である。

## Decision

Backendの既定architectureとして **Feature-oriented Vertical Slice Architecture** を採用する。

1. codeは技術レイヤーではなく `features/<feature>/` を第一の分割単位にする。
2. 各featureはHono sub-appを持ち、root appが `app.route()` で合成する。
3. Hono handlerはroute定義へinlineで置き、Controllerを原則作らない。
4. slice内部のService / Repository / Domainは必要な責務がある場合だけ追加する。
5. CRUDを持つ複雑なsliceではCQRSの考え方を軽量に利用し、CommandとQueryを分ける。
6. Command側では業務不変条件がある場合にDDDのドメインモデルを使う。
7. Query側はドメインモデルを必須とせず、用途に合うread modelを直接利用してよい。
8. CQRS採用だけを理由にread/write DB分離、Event Sourcing、message busを導入しない。
9. 複数featureで本当に共有する横断関心だけを `shared/` またはmiddlewareへ置く。
10. project-owned sourceのコメント/JSDocは原則日本語とする。

## Reference implementation

`features/health/` は単純なsliceとしてrouteだけを持つ。

`features/tasks/` はCRUD referenceとして次を持つ。

```text
features/tasks/
├── route.ts
├── commands/
│   ├── create-task.ts
│   ├── update-task.ts
│   └── delete-task.ts
├── queries/
│   ├── get-task.ts
│   └── list-tasks.ts
├── domain/
│   └── task.ts
├── repository.ts
└── in-memory-task-repository.ts
```

InMemory adapterはIssue #14の実行可能なreferenceに限定し、Issue #15でD1 adapterへ置き換える。

## Consequences

### Positive

- feature変更時に読む範囲が狭くなり、人間とAI Coding Agentの双方が変更対象を見つけやすい。
- Honoの型推論、`app.route()`、RPCの `AppType` と自然に組み合わせられる。
- 単純なfeatureは薄く、複雑なfeatureだけDDD/CQRSを使える。
- CommandとQueryで異なる最適化やモデルを後から選択できる。

### Trade-offs

- 同種の技術コードがfeature間で重複する場合がある。重複だけを理由に早期共通化しない。
- CQRSやDDDを全featureへ強制すると逆に複雑になるため、導入条件を守る必要がある。
- D1導入まではCRUD sampleのデータは永続化されない。

## References

- Hono Best Practices: https://hono.dev/docs/guides/best-practices
- Hono official Skill: https://github.com/honojs/skills/blob/main/skills/hono/SKILL.md
- Jimmy Bogard, Vertical Slice Architecture: https://www.jimmybogard.com/vertical-slice-architecture/
- Martin Fowler, CQRS: https://martinfowler.com/bliki/CQRS.html
- Martin Fowler, Command Query Separation: https://martinfowler.com/bliki/CommandQuerySeparation.html
- 日本語補助資料: https://zenn.dev/saitom_tech/articles/vertical-slice-architecture-poem
