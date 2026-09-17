#!/usr/bin/env bash
set -euo pipefail

required=(
  "AGENTS.md"
  "ARCHITECTURE.md"
  "WORKFLOW.md"
  ".agents/README.md"
  ".agents/harness-engineering/reference-implementation-mapping.md"
  ".agents/harness-engineering/agent-hook-enforcement.md"
  ".agents/loop-engineering/README.md"
  ".agents/sdd/README.md"
  ".agents/sdd/constitution.md"
  ".agents/standards"
  ".agents/profiles"
  ".agents/templates"
  ".agents/scripts/agent-stop-harness.mjs"
  ".claude/settings.json"
  ".codex/config.toml"
  ".codex/hooks.json"
  "docs/design-docs/index.md"
  "docs/design-docs/core-beliefs.md"
  "docs/exec-plans/README.md"
  "docs/specs/README.md"
  "docs/maintainers/dev-standard-kit-maintenance.md"
)

for file in "${required[@]}"; do
  if [[ ! -e "$file" ]]; then
    echo "ERROR: required knowledge artifact missing: $file"
    exit 1
  fi
done

# Agent-internal engineering assets should stay under .agents/ so the project
# root remains an application workspace rather than a methodology warehouse.
for legacy_dir in harness loop-engineering profiles scripts spec-driven-development standards templates examples; do
  if [[ -e "$legacy_dir" ]]; then
    echo "ERROR: legacy top-level agent directory still exists: $legacy_dir"
    exit 1
  fi
done

# Keep the internal names explicit. "harness" and "loop" alone are too vague
# for a starter that should remain understandable at a glance.
for deprecated_agent_dir in .agents/harness .agents/loop; do
  if [[ -e "$deprecated_agent_dir" ]]; then
    echo "ERROR: deprecated short AI engineering directory exists: $deprecated_agent_dir"
    exit 1
  fi
done

# SDD skills must exist where each agent actually scans for them
# (.agents/skills/ for Codex etc., .claude/skills/ for Claude Code).
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

# Claude Code / Codex must both route their Stop lifecycle event to the same
# repository-owned completion gate. This prevents agent-specific settings from
# silently replacing the real verification orchestrator.
for hook_file in .claude/settings.json .codex/hooks.json; do
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$hook_file"

  if ! grep -F '"Stop"' "$hook_file" >/dev/null; then
    echo "ERROR: Stop hook missing from $hook_file"
    exit 1
  fi

  if ! grep -F '.agents/scripts/agent-stop-harness.mjs' "$hook_file" >/dev/null; then
    echo "ERROR: $hook_file must call the shared agent-stop-harness.mjs"
    exit 1
  fi
done

if ! grep -F 'hooks = true' .codex/config.toml >/dev/null; then
  echo "ERROR: .codex/config.toml must enable lifecycle hooks"
  exit 1
fi

if ! grep -F "harness:verify" .agents/scripts/agent-stop-harness.mjs >/dev/null; then
  echo "ERROR: agent Stop hook must delegate to npm run harness:verify"
  exit 1
fi

agents_lines=$(wc -l < AGENTS.md | tr -d ' ')
if (( agents_lines > 180 )); then
  echo "ERROR: AGENTS.md has ${agents_lines} lines. Keep it as a navigation map, not an encyclopedia."
  exit 1
fi

for target in ARCHITECTURE.md WORKFLOW.md .agents/ docs/; do
  if ! grep -F "$target" AGENTS.md >/dev/null; then
    echo "ERROR: AGENTS.md should point to $target"
    exit 1
  fi
done

for target in .agents/harness-engineering/ .agents/loop-engineering/ .agents/sdd/ .agents/standards/ .agents/profiles/ .agents/scripts/; do
  if ! grep -F "$target" AGENTS.md >/dev/null; then
    echo "ERROR: AGENTS.md should point to AI development system target $target"
    exit 1
  fi
done

# Fork-first starter must keep application workspace boundaries visible even
# before the scaffold directories are introduced by later issues.
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

if [[ -f .agents/templates/long-running-agent/feature-list.json ]]; then
  node -e "JSON.parse(require('fs').readFileSync('.agents/templates/long-running-agent/feature-list.json','utf8'))"
fi

echo "Knowledge-base checks PASS"
