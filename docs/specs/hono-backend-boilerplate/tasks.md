# Hono Backend boilerplate tasks

## Review

- [x] レビュー済み

## Tasks

- [x] T001 Backend workspaceとlocal dev adapterを維持する — verifies: REQ-001, REQ-007 — checks: `npm run typecheck --workspace @dev-standard/backend`, `npm run build --workspace @dev-standard/backend`
- [x] T002 health featureをHonoの薄いVertical Sliceとして実装する — verifies: REQ-002, REQ-003 — checks: `npm run test:runtime --workspace @dev-standard/backend`
- [x] T003 Tasks CRUDをFeature-oriented Vertical Sliceとして実装する — verifies: REQ-003, REQ-004 — checks: `npm run test:integration --workspace @dev-standard/backend`
- [x] T004 Create / Update / DeleteをCommand、Get / ListをQueryへ分離し、Task domain invariantを実装する — verifies: REQ-005 — checks: `npm run test --workspace @dev-standard/backend`, `npm run test:integration --workspace @dev-standard/backend`
- [x] T005 Hono validatorと共通API / Domain error mappingを実装する — verifies: REQ-006 — checks: `npm run test:runtime --workspace @dev-standard/backend`, `npm run test:integration --workspace @dev-standard/backend`
- [x] T006 route chainと `AppType` exportを維持してHono RPCへ接続可能にする — verifies: REQ-008 — checks: `npm run typecheck --workspace @dev-standard/backend`, `npm run build --workspace @dev-standard/backend`
- [x] T007 Backendのformat / typecheck / lint / H068 / H069 / unit / runtime / integration / buildをroot Harnessへ接続する — verifies: REQ-009 — checks: `npm run harness:verify`
- [x] T008 ADR-0001とBackend README / AGENTS / SKILLSへarchitecture decisionと公式referenceを記録する — verifies: REQ-010 — checks: `npm run harness:verify`
- [x] T009 project-owned Backend sourceのコメント / JSDocを原則日本語へ統一する — verifies: REQ-011 — checks: `npm run lint --workspace @dev-standard/backend`
- [x] T010 public functionをprivate helperより上へ配置し、トップレベルprivate helperへ日本語JSDocを付けるHarness checkerを追加する — verifies: REQ-012 — checks: `npm run harness:verify`

## Deferred

- [ ] Issue #15: Wrangler / Workers / D1 / R2 bindings
- [ ] Issue #15: D1 TaskRepository adapter
- [ ] Issue #15: `@cloudflare/vitest-pool-workers` runtime test
- [ ] Issue #16: FrontendからHono RPC / same-origin `/api` を接続する
