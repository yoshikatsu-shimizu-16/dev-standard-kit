# Cloudflare runtime tasks

## Review

- [x] レビュー済み

## Tasks

- [x] T011 Workers environment contract and generated Wrangler bindings — verifies: REQ-013, REQ-016 — checks: `npm run typecheck`, `npm run infrastructure:generate-wrangler`
- [x] T012 D1 TaskRepository and Worker persistence round-trip — verifies: REQ-014 — checks: `npm run test:worker --workspace @dev-standard/backend`
- [x] T013 R2 object storage adapter, key policy, and metadata test — verifies: REQ-015 — checks: `npm run test:worker --workspace @dev-standard/backend`, `npm run test --workspace @dev-standard/backend`
- [x] T014 Terraform R2 state backend and Cloudflare resource definitions — verifies: REQ-017 — checks: `terraform fmt -check -recursive infrastructure/terraform`
- [x] T015 Plan/apply/deploy workflows with production approval boundary — verifies: REQ-017 — checks: `git diff --check`
- [x] T016 Root workspace and Harness Worker integration — verifies: REQ-018 — checks: `npm run harness:verify`

