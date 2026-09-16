#!/usr/bin/env bash
set -euo pipefail

has_script() {
  local script="$1"
  node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['$script'] ? 0 : 1)"
}

run_if_script_exists() {
  local script="$1"
  if has_script "$script"; then
    echo
    echo "==> npm run $script"
    npm run "$script"
  else
    echo
    echo "==> SKIP npm run $script (script not defined)"
  fi
}

echo "=== Harness verification start ==="

if [[ -f .agents/scripts/knowledge-base-check.sh ]]; then
  echo
  echo "==> knowledge-base check"
  bash .agents/scripts/knowledge-base-check.sh
fi

if [[ -f .agents/scripts/spec-check.sh ]]; then
  echo
  echo "==> spec-check (docs/specs/ review, requirement traceability, task verification fields)"
  bash .agents/scripts/spec-check.sh
fi

if [[ -f package.json ]]; then
  run_if_script_exists "format:check"
  run_if_script_exists "typecheck"
  run_if_script_exists "lint"
  run_if_script_exists "test"
  run_if_script_exists "test:worker"
  run_if_script_exists "test:integration"
  run_if_script_exists "build"
  run_if_script_exists "build-storybook"

  if has_script "test:e2e:run"; then
    run_if_script_exists "test:e2e:run"
  else
    run_if_script_exists "test:e2e"
  fi
else
  echo
  echo "==> SKIP npm quality gates (package.json not found)"
fi

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
