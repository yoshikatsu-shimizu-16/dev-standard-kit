---
workflow_version: 1
handoff_state: human-review
max_scope: one-task
---

# Agent Workflow

このファイルは、このリポジトリでAIエージェントが従う作業フローを定義する。
OpenAI Symphony の repository-owned `WORKFLOW.md` の考え方を取り入れている。

参考:
https://openai.com/index/open-source-codex-orchestration-symphony/

## Start

1. `AGENTS.md` を読む。
2. `ARCHITECTURE.md` を読む。
3. `git status` と最近の履歴を確認する。
4. 関係する standards / harness / profiles を読む。
5. タスクの acceptance criteria を確認する。
6. 大きなタスクは execution plan を作る。

## Work

- 一度に1つの明確なタスクへ集中する。
- unrelated refactor を混ぜない。
- 重要な新ルールは文章だけでなく自動検証へ落とせないか検討する。
- 同じ失敗が繰り返されたら harness を改善する。

## Verify

- 変更対象に対応する verification matrix を実行する。
- `scripts/knowledge-base-check.sh` を実行する。
- 実プロジェクトでは `scripts/harness-verify.sh` を実行する。
- 検証を回避するために test.skip / ts-ignore 等を追加しない。

## Handoff

完了時に次を残す。

- 変更内容
- 実行した検証
- 未検証事項
- 判断・トレードオフ
- 次に必要な作業

自動実行の成功状態は必ずしも `Done` ではなく、必要に応じて `Human Review` をhandoff stateとする。
