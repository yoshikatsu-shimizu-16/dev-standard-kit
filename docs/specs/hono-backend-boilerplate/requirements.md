# Hono Backend boilerplate requirements

Source: GitHub Issue #14

## Review

- [x] レビュー済み

## Requirements

### REQ-001 Executable backend workspace

root workspaceは `backend/` を `@dev-standard/backend` として認識し、Backendのdev / format / typecheck / lint / test / buildをrootから呼び出せなければならない。

### REQ-002 Minimal API contract

`GET /api/health` は正常時にHTTP 200と `{ status: "ok", service: "backend" }` を返さなければならない。

### REQ-003 Validation and common error contract

`detail` queryは `true` / `false` だけを受け付け、それ以外ではHTTP 400と `{ error: { code, message, requestId? } }` 形式を返さなければならない。

### REQ-004 Layer responsibility

Backendは Route -> Service -> Repository / Storage の依存方向を持ち、raw request validationを専用boundaryへ分離しなければならない。

### REQ-005 Cloudflare-compatible core

application coreはNode.js専用APIへ依存せず、Cloudflare Workersで利用できるHono appをdefault exportしなければならない。Node adapterはlocal developmentだけに限定する。

### REQ-006 Verification

Backend変更はformat / typecheck / lint / H068 JSDoc / unit / runtime / integration / buildを機械的に検証でき、root `npm run harness:verify` へ接続されなければならない。

### REQ-007 Documentation and references

`backend/README.md` / `backend/AGENTS.md` / `backend/SKILLS.md` は責務境界、実行方法、runtime test方針、Hono公式資料と採用Skillを記録しなければならない。

## Non-goals

- D1/R2 bindingの本実装
- Wrangler / deploy configuration
- 認証
- 複雑な業務ドメイン
