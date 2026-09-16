# Hono Backend boilerplate tasks

## Review

- [x] レビュー済み

## Tasks

- [x] T001 Backend workspaceとlocal dev adapterを追加する — verifies: REQ-001, REQ-005 — checks: `npm run typecheck --workspace @dev-standard/backend`, `npm run dev:backend`
- [x] T002 `/api/health` contractと共通error contractを実装する — verifies: REQ-002, REQ-003 — checks: `npm run test:runtime --workspace @dev-standard/backend`
- [x] T003 Route / Service / Repository / Validation境界をreference implementationとして実装する — verifies: REQ-004 — checks: `npm run test:integration --workspace @dev-standard/backend`
- [x] T004 Backend H068、format、typecheck、lint、unit/runtime/integration/buildをHarnessへ接続する — verifies: REQ-006 — checks: `npm run harness:verify`
- [x] T005 Backend向けREADME / AGENTS / SKILLSと公式referenceを追加する — verifies: REQ-007 — checks: `bash .agents/scripts/knowledge-base-check.sh`
