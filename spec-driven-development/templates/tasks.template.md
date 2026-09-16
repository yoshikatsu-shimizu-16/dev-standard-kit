# Tasks: <feature>

> 出力元: `spec-driven-development/skills/tasks/SKILL.md`
> 出力先: `docs/specs/<feature>/tasks.md`
> 入力: `docs/specs/<feature>/requirements.md`, `design.md`(いずれもレビュー済みであること)

各タスクは`harness/task-contract-template.md`に相当する単一セッションで完結する粒度にする。
依存関係のないタスクは並行実装してよい。

## Task list

- [ ] T001: <task> — depends on: none — verifies: <requirement id>
- [ ] T002: <task> — depends on: T001 — verifies: <requirement id>

## Verification per task

各タスクの完了条件は自動テストまたはコマンドで判定可能にする
(`harness/verification-matrix.md`の変更種別に対応する検証を実行する)。

## Review

- [ ] レビュー済み(この状態になってから `analyze` スキル→`implement`へ進む)
