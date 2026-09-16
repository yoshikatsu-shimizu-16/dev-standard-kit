#!/usr/bin/env bash
set -euo pipefail

run_if_script_exists() {
  local script="$1"
  if node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['$script'] ? 0 : 1)"; then
    echo
    echo "==> npm run $script"
    npm run "$script"
  else
    echo
    echo "==> SKIP npm run $script (script not defined)"
  fi
}

echo "=== Harness verification start ==="

run_if_script_exists "typecheck"
run_if_script_exists "lint"
run_if_script_exists "test"
run_if_script_exists "test:worker"
run_if_script_exists "test:integration"
run_if_script_exists "test:e2e"
run_if_script_exists "build"

echo
echo "==> git diff --check"
git diff --check

echo
echo "==> verification bypass scan"
if git diff -U0 | grep -E '^\+.*(test\.skip|it\.skip|describe\.skip|@ts-ignore|@ts-nocheck)' >/dev/null; then
  echo "ERROR: verification bypass pattern found in added lines"
  git diff -U0 | grep -E '^\+.*(test\.skip|it\.skip|describe\.skip|@ts-ignore|@ts-nocheck)' || true
  exit 1
fi

echo
echo "=== Harness verification PASS ==="
