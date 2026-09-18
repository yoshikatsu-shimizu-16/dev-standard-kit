# Infrastructure AGENTS.md

`infrastructure/`配下ではrootの`AGENTS.md`、`ARCHITECTURE.md`、`.agents/profiles/cloudflare/workers-d1-r2-rules.md`、`docs/specs/cloudflare-runtime/`を先に読みます。

## Boundaries

- `terraform/`: Cloudflare resourceとstate backend。credentialやproduction resource IDを保存しない。
- `d1/migrations/`: schema変更を追加する。適用済みmigrationを書き換えない。
- `scripts/`: Terraform outputや環境変数からruntime設定を再現可能に生成する。
- Worker runtime codeは`backend/`、CI/deploy workflowは`.github/workflows/`に置く。

## Approval boundaries

AIはproductionのTerraform apply、D1 migration、R2 objectの削除・上書き、Worker deployを実行しません。GitHub Actionsのapply/deploy jobは`production` Environmentの人間承認後に実行します。

## Verification

変更後はrootの`npm run harness:verify`を最終gateにします。runtimeやbindingを変更した場合は`npm run test:worker`、migrationを変更した場合は空DBへのlocal migration適用を追加で確認します。

