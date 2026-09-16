---
name: analyze
description: requirements.md・design.md・tasks.mdの整合性をconstitution.mdと突き合わせてチェックする、read-onlyの整合性ゲート。実装(implement)の直前に使う。
---

# Analyze

## Output

なし(ファイルを書き込まない)。標準出力に `PASS` または `FAIL` とその理由を返す。

## Inputs

- `docs/specs/<feature-slug>/{requirements,design,tasks}.md`
- `spec-driven-development/constitution.md`

## Steps

このスキルは`harness/quality-gates.md`のGate 0(Context)に相当する整合性ゲートである。
以下を1つずつ確認する。

1. **要求→設計の対応漏れ**: requirements.mdの各EARS要求がdesign.mdのRequirements
   traceability表に現れているか。
2. **設計→タスクの対応漏れ**: design.mdの各コンポーネント/データモデル変更が、
   tasks.mdの`verifies`フィールドで少なくとも1つのタスクに紐づいているか。
3. **constitution違反**: requirements.md・design.mdの内容が
   `spec-driven-development/constitution.md`のPrinciplesに反していないか。
4. **用語の一貫性**: 3ファイル間で同じ概念に異なる呼び方をしていないか。
5. **matrix対応**: tasks.mdの各項目が`harness/verification-matrix.md`の
   変更種別に対応する検証(typecheck/lint/unit/runtime/integration/e2e/build)を
   明記しているか。

## Verdict format

```text
Verdict: PASS | FAIL

Findings:
- ...(問題があれば、どのファイルのどの項目か)

Unresolved:
- ...
```

## Boundary

このスキルはコードを実装せず、3ファイルの内容も書き換えない。FAILの場合は
該当するスキル(`specify`/`plan`/`tasks`)へ差し戻す。
