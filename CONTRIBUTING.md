# Contributing to dev-standard-kit

このキットをForkして使う方からの不具合報告、改善案、Pull Requestを歓迎します。日本語・英語のどちらでも投稿できます。

## Before opening an Issue

既存のIssueとREADME、`WORKFLOW.md`、該当する`frontend/`・`backend/`・`infrastructure/`のREADMEを確認してください。再現できる不具合は、使用したコミットまたはリリース、Node.jsのバージョン、実行コマンド、期待した結果と実際の結果を添えてください。秘密情報や個人情報は投稿しないでください。

- 不具合: [Bug report](.github/ISSUE_TEMPLATE/bug_report.md)
- 改善案: [Feature request](.github/ISSUE_TEMPLATE/feature_request.md)

Fork先で見つけた改善は、アプリ固有の要件や秘密情報を除き、キットでも再利用できる最小の変更として提案してください。Fork先の公開事例を共有する場合も、そのリポジトリの公開設定と内容を確認してください。

## Pull Request workflow

1. IssueまたはPR本文で目的、対象範囲、受入条件を明確にします。小さくレビューできる単位に分けます。
2. `AGENTS.md` と `docs/maintainers/dev-standard-kit-maintenance.md` を読み、アプリ雛形への変更かキット自体の標準変更かを判定します。
3. 利用者に見える動作、API、データ契約を変える場合は、`docs/project-requirements.md`と`docs/constitution.md`を先に整え、選んだ一つの利用者フローについて`docs/specs/<feature>/`の requirements → design → tasks → analyze の順に進めます。各成果物の正式なレビューは人間によるレビュー用PRのマージで記録します。複雑な非機能変更は`docs/exec-plans/`に計画を残します。
4. コードと必要なテスト・文書を更新します。検証を通すためだけのskipや抑制は追加しません。
5. リポジトリのルートで`npm ci`後、`npm run harness:verify`を実行します。結果、未検証事項、残課題をPR本文に記載します。文書だけの変更でも同じコマンドを手動実行します。
6. [PRテンプレート](.github/pull_request_template.md)に沿って提出します。PRタイトルは原則`<type>: <日本語の変更概要>`とし、メンテナーのレビューを受けて指摘を反映します。

GitHub Actionsの品質ワークフローは変更パスで起動が絞られています。CIが起動しなかった場合はPASSと書かず、ローカルの検証結果を明示してください。productionへのデプロイや破壊的なmigrationは、別の承認境界を経ます。

## Maintainer review and release

メンテナーはIssueを再現・分類し、受入条件と優先順位を決めます。PRでは仕様と実装の整合性、テスト、Harness結果、Fork先への影響を確認します。取り込んだ変更はIssue・PRのリンクを残します。

リリースするときは、次を確認してからメンテナーがGitHub Releaseを作成します。

1. 対象コミットで`npm run harness:verify`と該当するCIが成功している。
2. 変更点、修正した不具合、移行が必要な変更をPR・Issueへのリンク付きでリリースノートにまとめる。
3. タグとリリースノートが同じコミットを指すことを確認する。
4. 公開後、READMEや導入手順に影響する変更が反映されていることを確認する。

現在、公開済みのGitHub Releaseはありません。最初のリリース前にバージョン付けと互換性の扱いを決めます。
