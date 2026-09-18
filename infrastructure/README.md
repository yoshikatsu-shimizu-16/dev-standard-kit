# Infrastructure

`infrastructure/` はCloudflare Workersのruntime、D1 migration、R2 binding、Terraformによるresource定義を管理します。

## Source of truth

- `d1/migrations/`: D1 schemaの追加専用migration
- `terraform/`: Cloudflare D1/R2 resourceとR2 S3互換Terraform state backend
- `scripts/generate-wrangler-config.mjs`: Terraform outputから非追跡のremote Wrangler設定を生成

Wranglerのbinding名（`DB` / `OBJECTS`）とTypeScriptの`backend/src/env.ts`は一致させます。bucket名やdatabase IDはコードへ直書きせず、環境変数またはTerraform outputから生成します。

## Local validation

```bash
npm run infrastructure:generate-wrangler -- --output backend/wrangler.remote.jsonc
npx wrangler d1 migrations apply dev-standard-kit-tasks --local --config backend/wrangler.jsonc
npm run test:worker
```

`test:worker`はCloudflare Workers Vitest integrationを使い、production resourceへ接続せずD1/R2 bindingを検証します。

## Terraform state

Terraform stateはR2のS3互換endpointへ保存します。`terraform/backend.tf`は空のS3 backendを宣言し、実際のbucket・endpoint・credentialsは`backend.hcl`またはCIの`-backend-config`から注入します。`backend.hcl`はsecretを含むためcommitしません。

R2 state bucketはTerraform管理対象のresource bucketとは分離し、最初に人間がbootstrapしてください。state keyは`preview/`と`production/`へ分離し、lock fileを有効にします。productionの`terraform apply`、migration、storageの破壊的操作はGitHub Environmentの承認境界に置きます。

### One-time bootstrap

1. Cloudflare DashboardまたはWranglerでstate専用R2 bucketを作成する。
2. bucket限定のObject Read & Write R2 API tokenを作成する。
3. GitHubの`preview`・`production` Environmentを作成し、productionにはrequired reviewerを設定する。
4. Environment Variablesへ`CLOUDFLARE_ACCOUNT_ID`、`CLOUDFLARE_PROJECT_NAME`、`TF_STATE_R2_BUCKET`を登録する。
5. Environment Secretsへ`CLOUDFLARE_API_TOKEN`、`TF_STATE_R2_ACCESS_KEY_ID`、`TF_STATE_R2_SECRET_ACCESS_KEY`を登録する。
6. `Infrastructure Plan`を手動実行してplanを確認し、別の`Infrastructure Apply`実行で環境名を再入力する。

Cloudflare provider tokenとstate bucket tokenは分離し、前者にはWorkers/D1/R2 resource操作、後者にはstate bucket内object操作だけを許可します。

### Failure recovery

Terraform applyが途中で失敗しても自動rollbackはしません。成功済みresourceはremote stateへ記録されるため、原因を修正して新しいplanを作り直し、再度applyします。apply前のstateは`backups/<environment>/<timestamp>.tfstate`へ退避されます。

lockが残った場合は、実行中のworkflowがないこととremote stateを確認してから人間が`terraform force-unlock`を実行します。workflowからの自動unlock、state push、destroyは行いません。R2 backendのlock競合テストが成功するまではproduction applyを許可しません。

## Deployment flow

- Pull Request: credentialなしでTerraform format/validate/mock testと通常Harnessを実行する。
- Infrastructure Plan/Apply: `workflow_dispatch`でpreviewまたはproductionを選択する。
- Preview application: `Cloudflare Application Deploy`を手動実行する。
- Production application: mainへのmerge後、production Environment承認を経てfrontend build、D1 migration、Worker/assets deployを順に実行する。

Terraform applyが失敗した場合やstateが未作成の場合、migrationとapplication deployは実行されません。D1 migrationが失敗した場合もWorker deployは開始されません。
