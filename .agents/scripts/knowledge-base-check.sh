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
  "docs/maintainers/dev-standard-kit-maintenance.md"
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

# spec-driven-development skills must exist where each agent actually scans for
# them (.agents/skills/ for Codex CLI etc., .claude/skills/ for Claude Code),
# not only in a custom path no agent auto-discovers.
for skill in sdd-specify sdd-plan sdd-tasks sdd-analyze; do
  agents_file=".agents/skills/${skill}/SKILL.md"
  claude_file=".claude/skills/${skill}/SKILL.md"
  for f in "$agents_file" "$claude_file"; do
    if [[ ! -f "$f" ]]; then
      echo "ERROR: required agent skill missing: $f"
      exit 1
    fi
  done
  # .claude/skills/ is a forwarding file: its frontmatter must match the
  # canonical .agents/skills/ copy so the two never silently drift apart.
  fm_agents=$(sed -n '/^---$/,/^---$/p' "$agents_file")
  fm_claude=$(sed -n '/^---$/,/^---$/p' "$claude_file")
  if [[ "$fm_agents" != "$fm_claude" ]]; then
    echo "ERROR: frontmatter mismatch between $agents_file and $claude_file"
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

# Fork-first starter must keep the application workspace boundaries visible to
# agents even before the scaffold directories are introduced by later issues.
for app_area in frontend/ backend/ infrastructure/; do
  if ! grep -F "$app_area" AGENTS.md >/dev/null; then
    echo "ERROR: AGENTS.md should define application area $app_area"
    exit 1
  fi
  if ! grep -F "$app_area" ARCHITECTURE.md >/dev/null; then
    echo "ERROR: ARCHITECTURE.md should define application area $app_area"
    exit 1
  fi
done

if ! grep -F "docs/maintainers/dev-standard-kit-maintenance.md" AGENTS.md >/dev/null; then
  echo "ERROR: AGENTS.md should point Kit Maintenance Mode to the maintainer guide"
  exit 1
fi

if [[ -f templates/long-running-agent/feature-list.json ]]; then
  node -e "JSON.parse(require('fs').readFileSync('templates/long-running-agent/feature-list.json','utf8'))"
fi

echo "Knowledge-base checks PASS"
