# Loop Engineering

## Purpose

AIエージェントを人間が1手ずつプロンプトするのではなく、「何度も自走させ、いつ・何を
根拠に止めるか」を設計する。2026年6月、Claude Code作者 Boris Cherny の発言に端を発し、
Addy Osmaniがloopの構造("5層モデル")として整理した。

参考:
- Addy Osmani "Loop Engineering": https://addyosmani.com/blog/loop-engineering/
- "Stop Hand-Holding Your Coding Agent": https://arxiv.org/html/2607.00038v1

> **要確認**: Loop Engineeringは急速に広まったばかりの概念で、単一の「公式記事」が
> 定まっていない。上記URLは執筆時点で確認できた最も体系立った一次資料であり、
> 実装・引用時は最新のURLを確認すること。

## 発展の位置づけ

プロンプトエンジニアリング(2022-24) → コンテキストエンジニアリング(2025) →
ハーネスエンジニアリング(2026年初頭〜) → ループエンジニアリング

これらは置き換えではなく入れ子である。ハーネスエンジニアリングは「1回のエージェント
実行をどう整備するか」を扱い、ループエンジニアリングは「実行をいつ繰り返し、何を
根拠に止めるか」を扱う。

## 5層モデル

新しいモデルを発明せず、既存の仕組みへのマッピングとして位置づける。

| 層 | 役割 | このkitでの実装 |
|---|---|---|
| harness(環境) | エージェントが動く環境を用意する | `templates/long-running-agent/init.sh` |
| loop contract(完了/停止条件) | 「完了」の定義と停止条件を明文化する | `loop-engineering/loop-contract.template.md` |
| state layer(状態) | プロセス再起動を跨いで生き残る状態 | `templates/long-running-agent/feature-list.json` + `progress.md` |
| checker(自動検証) | ループを継続してよいかを機械的に判定する | `scripts/harness-verify.sh` |
| human checkpoint(人間承認) | 不可逆・高リスクな操作の前に人間が確認する | `standards/ai-development-rules.md` §4 Approval boundary |

## Osmaniのloop解剖図とのマッピング

Osmaniはloopの構成要素を automations / worktrees / skills / connectors / sub-agents /
external state として整理している。このkitでの対応:

| Osmaniの要素 | このkitでの対応 |
|---|---|
| sub-agents | `templates/agent-roles/`(planner/generator/evaluator) |
| external state | `feature-list.json` / `progress.md` |
| skills | `spec-driven-development/skills/` |
| worktrees / automations / connectors | このkitの管轄外(agent実行環境・CI側の責務) |

`worktrees`/`automations`/`connectors`をこのkitでスキャフォールドしないのは、
`ARCHITECTURE.md`の「examples/は標準そのもののsource of truthにしない」という
既存の抑制方針(このkitの責務を機械的に検証可能な範囲に留める)に沿ったもの。

## 使い方

1. 長時間・複数セッションにまたがる自律実行を始める前に、
   `loop-engineering/loop-contract.template.md`をプロジェクトへコピーし、
   Done定義・stop conditions・checker commandを埋める。
2. `templates/long-running-agent/SESSION_PROTOCOL.md`のセッション開始手順に従い、
   loop-contractを読んでから作業を始める。
3. checker(`scripts/harness-verify.sh`またはプロジェクト固有の同等物)がFAILする間は
   継続実行しない。
4. human checkpointに該当する操作(`standards/ai-development-rules.md` §4)は、
   ループを止めて人間の承認を待つ。

## 参考文献

- Addy Osmani "Loop Engineering": https://addyosmani.com/blog/loop-engineering/
- "Stop Hand-Holding Your Coding Agent: Engineering the Loops that Replace
  Step-by-Step Prompting": https://arxiv.org/html/2607.00038v1
- Anthropic Effective Harnesses for Long-Running Agents:
  https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic Harness Design for Long-Running Application Development:
  https://www.anthropic.com/engineering/harness-design-long-running-apps

詳細な対応関係は `harness/reference-implementation-mapping.md` を参照する。
