# AGENTS.md

## Purpose

このリポジトリは、**個人開発アプリを作るためのフォーク元スターター**として使う。
フォーク後は、要件・仕様を先に固め、その内容に従って `frontend/`・`backend/`・`infrastructure/` の雛形から実アプリを構築していく。

`standards/`、`harness/`、`profiles/`、`spec-driven-development/`、`loop-engineering/` はアプリ本体ではなく、AI Coding Agent と人間が同じ開発標準で作業するための **embedded development system** として扱う。

`AGENTS.md` は詳細ルールの百科事典ではなく、AIが必要な source of truth へ到達するための短いナビゲーションマップとして維持する。

## Default operating mode

通常は **Application Development Mode** で作業する。

- アプリのコードは `frontend/`・`backend/`・`infrastructure/` に置く。
- 仕様・設計・実装計画は `docs/` と `spec-driven-development/` に置く。
- 開発標準そのものを変更する場合だけ **Kit Maintenance Mode** とし、`docs/maintainers/dev-standard-kit-maintenance.md` を読む。
- ユーザーから明示されていない限り、アプリ機能の実装中に `standards/` や `harness/` を都合よく書き換えない。

## Read first

1. `ARCHITECTURE.md` — アプリ領域と embedded development system の構造
2. `WORKFLOW.md` — Fork後の標準開発フロー
3. `spec-driven-development/constitution.md` — プロジェクト全体の不可侵原則
4. `docs/specs/` — 機能ごとの requirements / design / tasks
5. `standards/` — 技術非依存の共通ルール
6. `harness/` — task contract、quality gates、verification、lifecycle
7. `profiles/` — React / Hono / Cloudflare 等の技術固有ルール
8. `spec-driven-development/` — 機能追加のspec作成方法
9. `loop-engineering/` — 長時間・自律実行のloop contract
10. `docs/design-docs/` — 設計判断とcore beliefs
11. `docs/exec-plans/` — 長時間・複雑作業のexecution plan

## Application areas

フォーク先アプリでは、次の3領域を実装の基本境界とする。

- `frontend/`: UI、画面状態、ブラウザ側API client、フロントエンドテスト
- `backend/`: API、business logic、repository、storage access、バックエンドテスト
- `infrastructure/`: Cloudflare設定、D1 migration、R2 binding、deploy/runtime設定など

これらの雛形コードは後続Issueで整備する。存在しない段階でも、この3ディレクトリ名はアプリ実装領域として予約する。

## Operating model

- Humans define intent, priorities, acceptance criteria, and risk boundaries.
- Agents convert intent into versioned specifications before implementation when behavior or contracts change.
- Agents execute within repository-owned rules and verification gates.
- 大きな変更は小さく検証可能な単位へ分解する。
- 完了は自己申告ではなく verification evidence で判断する。
- セッションをまたぐ作業は durable artifacts で引き継ぐ。

## Repository rules

- アプリ実装と開発標準を混在させない。
- 技術固有の制約は `profiles/<technology>/` に置く。
- ユーザー可視の振る舞い、API契約、データ契約を変更する機能は SDD を先に通す。
- 同種の失敗が繰り返されたら lint / test / script / CI / architecture rule のいずれかへ昇格することを検討する。
- 実行可能な品質ゲートは文章だけでなく `scripts/` に落とす。
- secret、credential、production resource ID をコード・spec・exampleへ埋め込まない。
- harnessは増やし続けず、不要になったscaffoldingを定期的に見直す。

## Before work

1. Application Development Mode か Kit Maintenance Mode かを判定する。通常は前者。
2. `git status` と最近の履歴を確認する。
3. `spec-driven-development/constitution.md` と関係する既存specを読む。
4. ユーザー可視の振る舞い、API契約、データ契約を変更する場合は、実装より先に `docs/specs/<feature>/` の requirements → design → tasks → analyze を進める。
5. 実装対象を `frontend/`・`backend/`・`infrastructure/` のどこに置くか決める。
6. acceptance criteria と verification を決める。
7. ユーザー可視の振る舞いを持たない複雑な作業は `docs/exec-plans/template.md` を使う。
8. 長時間・自律実行では `loop-engineering/loop-contract.template.md` と `templates/long-running-agent/` のsession protocolを参考にする。

## Completion

- 変更対象に応じた verification matrix を実行する。
- 標準・knowledge artifact を変更した場合は `scripts/knowledge-base-check.sh` も実行する。
- 完了報告には変更ファイル、実行した検証、PASS/FAIL、未検証事項、残課題を含める。
- spec駆動の変更では、実装後も `docs/specs/<feature>/` とコードが同期していることを確認する。

## Kit maintenance

`dev-standard-kit` 自身の開発標準、テンプレート、Harness、Agent Skillを改善するタスクは通常のアプリ開発とは分離する。
その場合のみ `docs/maintainers/dev-standard-kit-maintenance.md` を読み、kitの設計原則と互換性を保って変更する。
