#!/usr/bin/env bash
set -euo pipefail

# R2 remote stateに必要な値が揃っていることを確認する。
require_backend_environment() {
  : "${DEPLOY_ENVIRONMENT:?DEPLOY_ENVIRONMENT is required}"
  : "${TF_STATE_BUCKET:?TF_STATE_BUCKET is required}"
  : "${TF_STATE_ENDPOINT:?TF_STATE_ENDPOINT is required}"

  case "$DEPLOY_ENVIRONMENT" in
    preview | production) ;;
    *) echo "DEPLOY_ENVIRONMENT must be preview or production." >&2; return 64 ;;
  esac
}

# 環境ごとに分離したR2 keyとlock fileを使ってTerraformを初期化する。
initialize_terraform_backend() {
  terraform -chdir=infrastructure/terraform init -input=false -reconfigure \
    -backend-config="bucket=${TF_STATE_BUCKET}" \
    -backend-config="key=${DEPLOY_ENVIRONMENT}/terraform.tfstate" \
    -backend-config="region=auto" \
    -backend-config="endpoints.s3=${TF_STATE_ENDPOINT}" \
    -backend-config="skip_credentials_validation=true" \
    -backend-config="skip_region_validation=true" \
    -backend-config="skip_requesting_account_id=true" \
    -backend-config="skip_metadata_api_check=true" \
    -backend-config="skip_s3_checksum=true" \
    -backend-config="use_path_style=true" \
    -backend-config="use_lockfile=true"
}

require_backend_environment
initialize_terraform_backend
