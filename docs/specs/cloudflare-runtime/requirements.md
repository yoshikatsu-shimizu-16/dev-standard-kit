# Cloudflare runtime requirements

## Review

- [x] レビュー済み

## Requirements

### REQ-013 Cloudflare bindings

When the Worker runs with configured bindings, the system shall expose D1 as `DB` and R2 as `OBJECTS`, and the TypeScript environment contract shall use the same names.

### REQ-014 D1 persistence

When Tasks CRUD is called through the Worker entrypoint, the system shall persist and read tasks through D1 and apply migrations from `infrastructure/d1/migrations/`.

### REQ-015 R2 adapter

When object storage is used, the system shall access R2 through an adapter and shall preserve not-found, content-type, custom metadata, and delete behavior.

### REQ-016 Reproducible runtime configuration

When a deployment environment supplies binding values, a repository-owned script shall generate Wrangler configuration without embedding secrets or environment-specific production IDs in source templates.

### REQ-017 Infrastructure state and approval

Terraform state shall use a Cloudflare R2 S3-compatible backend with runtime-injected credentials, while apply and Worker deploy remain behind a human-approved production workflow.

### REQ-018 Verification

The root Harness shall invoke Worker runtime tests in addition to existing format, typecheck, lint, unit, integration, and build checks.
