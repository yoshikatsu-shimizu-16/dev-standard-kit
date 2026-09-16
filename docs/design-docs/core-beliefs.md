# Core Beliefs

1. Humans define intent and risk boundaries; agents execute within them.
2. Repository-local, versioned knowledge is the primary source of truth for agent work.
3. `AGENTS.md` is a map, not an encyclopedia.
4. Important invariants should be mechanically enforced where practical.
5. Large work should be decomposed into small, independently verifiable steps.
6. A task is not complete until observable behavior is verified.
7. Session handoff must rely on durable artifacts, not assumed conversational memory.
8. Repeated failures are signals to improve the harness.
9. Harnesses encode assumptions and should be periodically simplified or removed.
10. Prefer boring, inspectable, reproducible mechanisms over opaque magic.
11. Specification and plan documents (requirements/design/tasks/progress) are deliverables
    in their own right, verified with the same rigor as code — not disposable scratch notes.

Inspired by:
- OpenAI Harness Engineering: https://openai.com/index/harness-engineering/
- Anthropic Effective Harnesses: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic Managed Agents: https://www.anthropic.com/engineering/managed-agents
- AWS Kiro / GitHub Spec Kit (Spec-Driven Development): https://kiro.dev/docs/specs/ , https://github.com/github/spec-kit
- Loop Engineering: https://addyosmani.com/blog/loop-engineering/
