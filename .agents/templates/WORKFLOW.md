---
workflow_version: 1
handoff_state: human-review
max_scope: one-task
---

# Project Agent Workflow

## Start

1. Read `AGENTS.md` and `ARCHITECTURE.md`.
2. Read current task / issue and acceptance criteria.
3. Check `git status` and recent history.
4. Read relevant design docs and execution plan.
5. Verify the baseline before changing code.

## Work

- Work on one coherent task at a time.
- Keep unrelated changes out of the diff.
- Prefer small, independently verifiable changes.
- If a repeated failure reveals a missing guardrail, improve the harness.

## Verify

Run the project verification matrix and capture the results.
For user-visible behavior, use browser/E2E verification where available.

## Handoff

Record:
- changed files
- verification evidence
- decisions
- known issues
- remaining work

A successful agent run may hand off to `Human Review` rather than declaring the whole project Done.
