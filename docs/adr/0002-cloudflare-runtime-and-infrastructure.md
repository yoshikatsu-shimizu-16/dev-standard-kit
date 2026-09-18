# ADR-0002: Cloudflare runtimeとInfrastructureの境界

## Status

Accepted for Issue #15.

## Context

BackendのNode adapterだけでは、production targetであるCloudflare WorkersのD1/R2 binding、migration、deploy設定を検証できません。Terraform stateをlocal fileのまま扱うと、CI間でstateが分岐し、credentialをrepositoryへ置く誘惑も生じます。

## Decision

- Workers bindingのsource of truthは`backend/wrangler.jsonc`とし、remote deploy時だけ同じ契約の非追跡configをTerraform outputから生成する。
- D1 schemaは`infrastructure/d1/migrations/`でversion管理し、`DB` bindingを`D1TaskRepository`へ適合させる。
- R2へは`OBJECTS` binding経由の`R2ObjectStorage` adapterからアクセスし、object keyはnamespace/id/filenameの共通関数で作る。
- Terraform resourceは`infrastructure/terraform/`へ置き、stateはS3互換のCloudflare R2 backendへpartial configで保存する。
- production apply、migration、deploy、storage destructive operationは人間承認境界に置く。
- `@cloudflare/vitest-plugin`でlocal Worker runtimeとD1/R2 round-tripを検証する。

## Consequences

初回は人間がR2 state bucketとCI secretをbootstrapする必要があります。その代わりrepositoryへsecretを置かず、local・CI・Worker runtimeでbinding契約を同じ設定から検証できます。
