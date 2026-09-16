# AGENTS.md

## Purpose

このリポジトリは、AI Coding Agent と人間が共通して使う開発標準と Harness Engineering のルールを管理する。

`AGENTS.md` は詳細ルールの百科事典ではなく、AIが必要なsource of truthへ到達するための短いナビゲーションマップとして維持する。

## Read first

1. `README.md` — kit全体の目的と導入方法
2. `ARCHITECTURE.md` — リポジトリ構造と依存方向
3. `WORKFLOW.md` — agentの標準作業フロー
4. `standards/` — 技術非依存の共通ルール
5. `harness/` — task contract、quality gates、verification、lifecycle
6. `profiles/` — React / Hono / Cloudflare等の技術固有ルール
7. `spec-driven-development/` — 機能追加のspec/plan/tasksとconstitution
8. `loop-engineering/` — 自律実行のloop contractと5層モデル
9. `docs/design-docs/` — 設計判断とcore beliefs
10. `docs/exec-plans/` — 長時間・複雑作業のexecution plan
11. `docs/specs/` — spec-driven-developmentの出力(機能ごと)

## Operating model

- Humans define intent, priorities, and risk boundaries.
- Agents execute within repository-owned rules and verification gates.
- 大きな変更は小さく検証可能な単位へ分解する。
- 完了は自己申告ではなく検証evidenceで判断する。
- セッションをまたぐ作業は durable artifacts で引き継ぐ。

## Repository rules

- 共通ルールと技術固有ルールを混在させない。
- ある技術だけに必要な制約は `profiles/<technology>/` に置く。
- 同種の失敗が繰り返されたら lint / test / script / CI / architecture rule のいずれかへ昇格する。
- 既存プロジェクトへ適用可能な仕組みは `templates/` に再利用可能な形で置く。
- 実行可能な品質ゲートは文章だけでなく `scripts/` に落とす。
- secret、credential、production resource ID を例に埋め込まない。
- harnessはモデル能力への仮定でもあるため、不要になったscaffoldingを定期的に見直す。

## Before work

1. `git status` と最近の履歴を確認する。
2. 関係するsource of truthを読む。
3. acceptance criteria と verification を決める。
4. ユーザー可視の振る舞いを持つ機能追加は `spec-driven-development/` のspec/plan/tasksを使う。
   それ以外の複雑な作業は `docs/exec-plans/template.md` を使う。
5. 長時間・自律実行では `loop-engineering/loop-contract.template.md` と
   `templates/long-running-agent/` のsession protocolを参考にする。

## Completion

- `scripts/knowledge-base-check.sh` を実行する。
- 変更対象に応じた検証を実行する。
- 完了報告には変更ファイル、検証結果、未検証事項、残課題を含める。

## Primary references

- OpenAI Harness Engineering: https://openai.com/index/harness-engineering/
- OpenAI Symphony: https://openai.com/index/open-source-codex-orchestration-symphony/
- Anthropic Effective Harnesses: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

詳細な対応関係は `harness/reference-implementation-mapping.md` を参照する。
