#!/usr/bin/env bash
set -euo pipefail

required=(
  "AGENTS.md"
  "ARCHITECTURE.md"
  "WORKFLOW.md"
  "docs/design-docs/index.md"
  "docs/design-docs/core-beliefs.md"
  "docs/exec-plans/README.md"
  "docs/specs/README.md"
  "harness/reference-implementation-mapping.md"
  "spec-driven-development/README.md"
  "loop-engineering/README.md"
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "ERROR: required knowledge artifact missing: $file"
    exit 1
  fi
done

agents_lines=$(wc -l < AGENTS.md | tr -d ' ')
if (( agents_lines > 160 )); then
  echo "ERROR: AGENTS.md has ${agents_lines} lines. Keep it as a navigation map, not an encyclopedia."
  exit 1
fi

for target in ARCHITECTURE.md WORKFLOW.md standards/ harness/ profiles/ spec-driven-development/ loop-engineering/ docs/; do
  if ! grep -F "$target" AGENTS.md >/dev/null; then
    echo "ERROR: AGENTS.md should point to $target"
    exit 1
  fi
done

if [[ -f templates/long-running-agent/feature-list.json ]]; then
  node -e "JSON.parse(require('fs').readFileSync('templates/long-running-agent/feature-list.json','utf8'))"
fi

echo "Knowledge-base checks PASS"
