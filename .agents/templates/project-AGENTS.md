# AGENTS.md

## Development Standard

このプロジェクトは `dev-standard-kit` の共通開発標準に従う。
AI開発基盤のcanonical sourceは `.agents/` 配下に置く。

使用Profile:
- React
- Hono
- Cloudflare Workers
- D1
- R2

## Before work

1. このファイルを読む。
2. `ARCHITECTURE.md` と `WORKFLOW.md` を読む。
3. `.agents/README.md` から必要な内部ルールへ辿る。
4. `.agents/standards/` と `.agents/profiles/` の関連ルールを確認する。
5. 必要なら `.agents/harness-engineering/task-contract-template.md` を使う。
6. `.agents/harness-engineering/verification-matrix.md` から変更範囲に対応する検証を決める。

## Project-specific rules

- ここにプロジェクト固有ルールを記載する。

## Completion

`npm run harness:verify` 相当の品質ゲートを通し、変更・検証・未確認事項を報告する。
