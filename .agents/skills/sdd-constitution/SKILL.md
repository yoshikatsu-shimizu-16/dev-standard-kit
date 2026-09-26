---
name: sdd-constitution
description: 全体要件の人間レビュー後、機能別SPECより先にプロジェクト共通の原則をconstitutionへ定め、原則の変更時には影響を確認して改訂する。
---

# Constitution

## Output

`docs/constitution.md`（同ファイルのテンプレートと記入例を使用）。

## Steps

1. `docs/project-requirements.md` の `## Review` が `Status: reviewed` で、PR証跡が記録されていることを確認する。未完了なら止める。
2. 全体要件、`ARCHITECTURE.md`、`WORKFLOW.md`、適用profileを読み、全機能に共通する原則だけを記述する。機能一覧や個別の受入条件を複写しない。
3. 実行境界、AIと人の責任境界、情報保護、変更・検証の原則を候補として検討する。テンプレートの例を事業方針として自動採用しない。
4. 原則変更時は理由、影響を受けるFR/NFRと機能別SPEC、改訂日を記録し、関係する仕様の再レビュー要否を示す。
5. `## Review` を `Status: pending` のまま人間レビュー用PRへ出す。Agent自身の判断で `reviewed` にしない。
6. 人間がPRをMergeすると `.github/workflows/sdd-review-evidence.yml` がMerge証跡をReview metadataへ同期する。

## Stop condition

`## Review` の `Status: reviewed` とPR証跡が記録されるまで `sdd-specify` に進まない。正式な承認操作は人間によるレビュー用PRのMergeである。

このスキルはconstitutionだけを作成・改訂する。
