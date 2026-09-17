# Hono Backend boilerplate requirements

Source: GitHub Issue #14

## Review

- [x] レビュー済み

## Requirements

### REQ-001 Executable backend workspace

root workspaceは `backend/` を `@dev-standard/backend` として認識し、Backendのdev / format / typecheck / lint / test / buildをrootから呼び出せなければならない。

### REQ-002 Health API

`GET /api/health` は正常時にHTTP 200と `{ status: "ok", service: "backend" }` を返さなければならない。`detail` queryは `true` / `false` だけを受け付ける。

### REQ-003 Feature-oriented Vertical Slice

Backendはfeatureを第一の分割単位とし、Hono sub-appを `app.route()` で合成しなければならない。handlerはroute定義へinlineで置き、Controllerを既定パターンにしない。

### REQ-004 CRUD reference

boilerplateはCreate / List / Read / Update / DeleteをHTTP境界から実行できるreference featureを持たなければならない。

### REQ-005 CQRS / DDD reference

CRUD referenceはCommandとQueryをコード上で分離し、Command側で少なくとも1つのドメイン不変条件をドメインモデルに閉じ込めなければならない。read/write DB分離やEvent Sourcingは必須にしない。

### REQ-006 Validation and common error contract

request validationをrouteの近くで行い、invalid input / domain rule violation / not foundを `{ error: { code, message, requestId? } }` 形式へ変換しなければならない。

### REQ-007 Cloudflare-compatible core

application coreはNode.js専用APIへ依存せず、Cloudflare Workersで利用できるHono appをdefault exportしなければならない。Node adapterはlocal developmentだけに限定する。

### REQ-008 Type-safe app composition

Hono route chainの型推論を維持し、FrontendのHono RPC clientから利用できる `AppType` をexportしなければならない。

### REQ-009 Verification

Backend変更はformat / typecheck / lint / H068 JSDoc / unit / runtime / integration / buildを機械的に検証でき、root `npm run harness:verify` へ接続されなければならない。

### REQ-010 Documentation and references

ADR、`backend/README.md` / `backend/AGENTS.md` / `backend/SKILLS.md` はarchitecture、CQRS / DDDの適用範囲、runtime test方針、Hono公式資料を記録しなければならない。

### REQ-011 Comment language

project-owned Backend sourceのコメント/JSDocは原則日本語で記述しなければならない。

## Non-goals

- D1/R2 bindingの本実装
- Wrangler / deploy configuration
- 認証
- 複雑な業務ドメイン
- read/write databaseの物理分離
- Event Sourcing / message bus
