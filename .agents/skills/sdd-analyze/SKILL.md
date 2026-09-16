---
name: sdd-analyze
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

まず機械的な事前チェックを実行する:

```bash
bash scripts/spec-check.sh
```

これはレビュー未完了・要求IDの欠落・要求↔タスクの対応漏れ・`checks`フィールドの
欠落を機械的に検出する(`scripts/spec-check.sh`参照)。これがFAILする場合、
以下のセマンティックな確認へ進まずFAILとして差し戻す。

`spec-check.sh`がPASSしたら、機械的には検出できない以下を1つずつ確認する。

1. **要求→設計の対応漏れ**: requirements.mdの各要求ID(REQ-NNN)がdesign.mdのRequirements
   traceability表に現れているか(IDの一致だけでなく、内容として妥当な対応か)。
2. **設計→タスクの対応漏れ**: design.mdの各コンポーネント/データモデル変更が、
   tasks.mdの`verifies`フィールドで少なくとも1つのタスクに紐づいているか。
3. **constitution違反**: requirements.md・design.mdの内容が
   `spec-driven-development/constitution.md`のPrinciplesに反していないか。
4. **用語の一貫性**: 3ファイル間で同じ概念に異なる呼び方をしていないか。
5. **matrix対応の妥当性**: tasks.mdの各`checks`フィールドの値が
   `harness/verification-matrix.md`の該当する変更種別と実際に整合しているか
   (存在チェックは`spec-check.sh`が行うため、ここでは内容の妥当性のみ確認する)。

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
該当するスキル(`sdd-specify`/`sdd-plan`/`sdd-tasks`)へ差し戻す。
