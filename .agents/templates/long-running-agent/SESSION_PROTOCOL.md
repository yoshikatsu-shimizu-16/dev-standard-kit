# Long-Running Coding Session Protocol

Inspired by Anthropic's public long-running agent harness:
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

## Session start

1. Run `pwd`.
2. Read `AGENTS.md` and `WORKFLOW.md` if present.
3. Read the active loop contract. If none exists, start from `.agents/loop-engineering/loop-contract.template.md`.
4. Read the active progress artifact.
5. Read the active feature-state artifact.
6. Run `git log --oneline -20` and `git status`.
7. Run the project initialization command defined by the loop contract. The starter template is `.agents/templates/long-running-agent/init.sh`.
8. Run the baseline smoke test before changing code.
9. If the baseline is broken, repair it before starting a new feature.

## Select work

- Choose the highest-priority incomplete feature.
- Work on one feature at a time.
- Do not remove or weaken acceptance steps just to make the feature pass.
- Do not change the feature specification unless the task explicitly changes requirements.

## Implement

- Make the smallest coherent change.
- Add or update automated tests.
- Keep the repository in a mergeable state.

## Verify

- Run the checker (`npm run harness:verify`, or the command named in the active loop contract).
- This loop does not continue while the checker fails.
- For user-facing behavior, verify through browser automation or equivalent end-to-end tooling.
- Mark a feature complete only after the described user-visible behavior is verified.

## Session end

1. Update the active progress artifact with completed work, decisions, evidence, known issues, and next work.
2. Confirm the repo is not knowingly left broken.
3. Create a descriptive commit when the environment allows it.
4. Leave enough durable context that a fresh agent session does not need to infer what happened.

## Boundary

This protocol is an Agent control artifact. Application code, tests, runtime configuration, and CI stay outside `.agents/`.
