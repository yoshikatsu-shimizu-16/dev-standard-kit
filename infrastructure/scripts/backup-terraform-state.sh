#!/usr/bin/env bash
set -euo pipefail

# apply直前のstateを機密一時ファイルへ取得し、初回作成時は安全にskipする。
pull_current_state() {
  local destination="$1"
  terraform -chdir=infrastructure/terraform state pull >"$destination" 2>/dev/null
}

# 既存stateをR2の追記専用backup keyへ保存する。
backup_state_to_r2() {
  local source="$1"
  local timestamp
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  aws s3 cp "$source" \
    "s3://${TF_STATE_BUCKET}/backups/${DEPLOY_ENVIRONMENT}/${timestamp}.tfstate" \
    --endpoint-url "$TF_STATE_ENDPOINT" \
    --region auto \
    --no-progress
}

umask 077
state_file="$(mktemp)"
trap 'rm -f "$state_file"' EXIT

if pull_current_state "$state_file"; then
  backup_state_to_r2 "$state_file"
else
  echo "No existing state was found; skipping backup for the initial apply."
fi
