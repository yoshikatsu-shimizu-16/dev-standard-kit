#!/usr/bin/env bash
set -euo pipefail

# Mechanical pre-check for the sdd-analyze skill
# (.agents/skills/sdd-analyze/SKILL.md, mirrored at .claude/skills/sdd-analyze/SKILL.md).
# Catches structural gaps (unreviewed docs, missing requirement IDs, missing
# requirement<->task traceability, missing per-task verification fields) that
# would otherwise let a malformed or unreviewed spec pass Gate 0 silently.
# It does not judge semantic correctness (constitution violations, terminology
# drift) — that remains the analyze skill's job.

specs_dir="docs/specs"

if [[ ! -d "$specs_dir" ]]; then
  echo "[spec-check] $specs_dir not found, skipping"
  exit 0
fi

status=0
found_feature=0

for feature_dir in "$specs_dir"/*/; do
  [[ -d "$feature_dir" ]] || continue
  found_feature=1
  feature="$(basename "$feature_dir")"

  req="${feature_dir}requirements.md"
  design="${feature_dir}design.md"
  tasks="${feature_dir}tasks.md"

  missing=0
  for f in "$req" "$design" "$tasks"; do
    if [[ ! -f "$f" ]]; then
      echo "ERROR: [$feature] missing $f"
      status=1
      missing=1
    fi
  done
  [[ $missing -eq 0 ]] || continue

  for f in "$req" "$design" "$tasks"; do
    if ! grep -qE '^\s*-\s*\[x\]\s*レビュー済み' "$f"; then
      echo "ERROR: [$feature] $(basename "$f") is not marked reviewed (## Review checkbox unchecked)"
      status=1
    fi
  done

  req_ids=$(grep -oE 'REQ-[0-9]+' "$req" | sort -u || true)
  if [[ -z "$req_ids" ]]; then
    echo "ERROR: [$feature] requirements.md has no stable requirement IDs (REQ-NNN)"
    status=1
  fi

  while IFS= read -r id; do
    [[ -z "$id" ]] && continue
    if ! grep -q "verifies:.*${id}\\b" "$tasks"; then
      echo "ERROR: [$feature] $id has no task in tasks.md verifying it"
      status=1
    fi
  done <<< "$req_ids"

  task_lines=$(grep -E '^\s*-\s*\[.\]\s*T[0-9]+' "$tasks" || true)
  if [[ -z "$task_lines" ]]; then
    echo "ERROR: [$feature] tasks.md has no task entries"
    status=1
  else
    while IFS= read -r line; do
      if ! echo "$line" | grep -qE 'checks:\s*\S'; then
        echo "ERROR: [$feature] task line missing 'checks:' field: ${line#*- }"
        status=1
      fi
    done <<< "$task_lines"
  fi
done

if [[ $found_feature -eq 0 ]]; then
  echo "[spec-check] no feature directories under $specs_dir, skipping"
  exit 0
fi

if [[ $status -eq 0 ]]; then
  echo "Spec-check PASS"
fi

exit $status
