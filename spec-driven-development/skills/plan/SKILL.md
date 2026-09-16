---
name: plan
description: レビュー済みのrequirements.mdから技術設計(design.md)を作る。requirements.mdのレビューが完了してから使う。
---

# Plan

## Output

`docs/specs/<feature-slug>/design.md`
(テンプレート: `spec-driven-development/templates/design.template.md`)

## Inputs

- `docs/specs/<feature-slug>/requirements.md`(`## Review`にチェックが入っていること)
- `ARCHITECTURE.md`、該当する`profiles/<technology>/architecture-rules.md`
- `spec-driven-development/constitution.md`

## Steps

1. `requirements.md`がレビュー済みであることを確認する。未レビューなら止めて`specify`へ差し戻す。
2. `spec-driven-development/templates/design.template.md`を
   `docs/specs/<feature-slug>/design.md`へコピーする。
3. Architecture overview、Components / Modules、Data model、Sequenceを埋める。
4. Requirements traceability表で、requirements.mdの各項目がどの設計要素に対応するかを埋める。
   対応の取れない要求を残さない。
5. Risks / Alternatives consideredを書く。

## Stop condition

- `## Review`にチェックが入るまで、`tasks`スキルへは進まない。

## Boundary

このスキルはdesign.mdの作成のみを行う。requirements.mdの内容を書き換えない
(矛盾を見つけた場合は`specify`へ差し戻す)。
