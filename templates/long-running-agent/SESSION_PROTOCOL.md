# Long-Running Coding Session Protocol

Inspired by Anthropic's public long-running agent harness:
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

## Session start

1. Run `pwd`.
2. Read `AGENTS.md` and `WORKFLOW.md` if present.
3. Read `progress.md`.
4. Read `feature-list.json`.
5. Run `git log --oneline -20` and `git status`.
6. Run `init.sh`.
7. Run the baseline smoke test before changing code.
8. If the baseline is broken, repair it before starting a new feature.

## Select work

- Choose the highest-priority feature with `passes=false`.
- Work on one feature at a time.
- Do not remove or weaken acceptance steps just to make the feature pass.
- Do not change the feature specification unless the task explicitly changes requirements.

## Implement

- Make the smallest coherent change.
- Add or update automated tests.
- Keep the repository in a mergeable state.

## Verify

- Run static checks and relevant tests.
- For user-facing behavior, verify through browser automation or equivalent end-to-end tooling.
- Set `passes=true` only after the described user-visible behavior is verified.

## Session end

1. Update `progress.md` with completed work, decisions, evidence, known issues, and next work.
2. Confirm the repo is not knowingly left broken.
3. Create a descriptive commit when the environment allows it.
4. Leave enough durable context that a fresh agent session does not need to infer what happened.
