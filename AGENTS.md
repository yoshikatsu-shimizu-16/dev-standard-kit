# AGENTS.md

## Purpose

このリポジトリは、AI Coding Agent と人間が共通して使う開発標準と Harness Engineering のルールを管理する。

## Operating model

AIはコード生成器ではなく、設計制約・テスト・品質ゲートに従う実装担当として動作する。
最優先は大量変更ではなく、検証可能な小さな変更を完成させること。

## Before changing this repository

1. `README.md` を読む。
2. `standards/` の共通ルールを確認する。
3. `harness/` の品質ゲートと検証マトリクスを確認する。
4. 対象技術が `profiles/` にある場合は該当プロファイルを読む。
5. 変更理由と検証方法を明確にする。

## Rules

- 共通ルールと技術固有ルールを混在させない。
- ある技術だけに必要な制約は `profiles/<technology>/` に置く。
- 同種の失敗が繰り返されたら、注意書きだけで終わらせず lint / test / script / CI / architecture rule のいずれかへ昇格する。
- 既存プロジェクトへ適用可能なルールは `templates/` に再利用可能な形で置く。
- 実行可能な品質ゲートは文章だけでなく `scripts/` に落とす。
- secret、credential、production resource ID を例に埋め込まない。

## Completion

変更後は最低限、Markdown/YAML/Shell の整合性、リンク先、スクリプト構文を確認する。
完了報告には変更ファイルと検証内容を含める。
