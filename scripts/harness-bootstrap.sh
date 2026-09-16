#!/usr/bin/env bash
set -euo pipefail

echo "[harness] checking environment"

command -v node >/dev/null || { echo "node is required"; exit 1; }
command -v npm >/dev/null || { echo "npm is required"; exit 1; }

echo "node: $(node --version)"
echo "npm : $(npm --version)"

if [[ ! -f package.json ]]; then
  echo "package.json not found"
  exit 1
fi

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

if [[ -f wrangler.jsonc || -f wrangler.toml ]]; then
  echo "[harness] wrangler config found"
fi

echo "[harness] bootstrap complete"
