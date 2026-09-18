# Cloudflare runtime design

## Review

- [x] レビュー済み

## Design

`backend/wrangler.jsonc` is the committed local configuration. `infrastructure/scripts/generate-wrangler-config.mjs` creates the ignored `backend/wrangler.remote.jsonc`; remote IDs and names are supplied from Terraform outputs at the workflow boundary.

`D1TaskRepository` implements the existing Tasks read/write ports using parameterized D1 statements. `R2ObjectStorage` wraps the `OBJECTS` binding, while `createObjectKey` provides a shared encoded namespace/id/filename policy.

Terraform declares the Cloudflare D1 database and application R2 bucket. An empty `backend "s3" {}` declaration receives R2 endpoint, bucket, key, and credential settings as partial configuration so no secret is committed. The state bucket is bootstrapped separately because a backend cannot manage its own first creation.

GitHub Actions has independent plan, approved apply, and application deploy workflows. Pull requests use no remote credentials. Infrastructure apply is manual, while a main merge runs production migration and deploy only after the production Environment approval boundary. Local verification and CI both use the root `npm run harness:verify` entrypoint.
