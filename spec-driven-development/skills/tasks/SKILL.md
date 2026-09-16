---
name: tasks
description: レビュー済みのrequirements.mdとdesign.mdから実装タスクの一覧(tasks.md)を作る。設計のレビューが完了してから使う。
---

# Tasks

## Output

`docs/specs/<feature-slug>/tasks.md`
(テンプレート: `spec-driven-development/templates/tasks.template.md`)

## Inputs

- `docs/specs/<feature-slug>/requirements.md`
- `docs/specs/<feature-slug>/design.md`(`## Review`にチェックが入っていること)
- `harness/task-contract-template.md`(各タスクの粒度の基準)

## Steps

1. `design.md`がレビュー済みであることを確認する。未レビューなら止めて`plan`へ差し戻す。
2. `spec-driven-development/templates/tasks.template.md`を
   `docs/specs/<feature-slug>/tasks.md`へコピーする。
3. design.mdのRequirements traceability表を基に、実装タスクへ分解する。
   各タスクは`harness/task-contract-template.md`相当の、単一セッションで完結する粒度にする。
4. 各タスクに `depends on` と `verifies`(対応するrequirement id)を明記する。
   依存のないタスクは並行実装できることを示す。
5. 各タスクの完了条件を自動テストまたはコマンドで判定可能にする。

## Stop condition

- `## Review`にチェックが入るまで、`analyze`スキル・実装へは進まない。

## Boundary

タスクの実装(コードを書くこと)自体はこのスキルの責務ではない。
実装は`harness/task-contract-template.md`に従って1タスクずつ行う。
