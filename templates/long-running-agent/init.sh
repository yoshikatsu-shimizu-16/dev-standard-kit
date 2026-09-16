#!/usr/bin/env bash
set -euo pipefail

# Anthropic long-running harness pattern:
# provide a deterministic way for a fresh agent session to start the app.
# Customize these commands per project.

if [[ -f package-lock.json ]]; then
  npm ci
elif [[ -f package.json ]]; then
  npm install
fi

# Start or verify the development environment here.
# Example:
# npm run dev > .agent/dev-server.log 2>&1 &

# Run a minimal baseline check before feature work.
if node -e "const p=require('./package.json'); process.exit(p.scripts?.['test:smoke'] ? 0 : 1)" 2>/dev/null; then
  npm run test:smoke
fi

echo "Initializer complete. Read feature-list.json, progress.md, and git log before coding."
