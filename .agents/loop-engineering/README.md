# Loop Engineering

## Purpose

AIエージェントを人間が1手ずつプロンプトするのではなく、「何度も自走させ、いつ・何を根拠に止めるか」を設計する。

参考:
- Addy Osmani "Loop Engineering": https://addyosmani.com/blog/loop-engineering/
- Anthropic Effective Harnesses for Long-Running Agents: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic Harness Design for Long-Running Application Development: https://www.anthropic.com/engineering/harness-design-long-running-apps

## Positioning

Harness Engineeringは「Agentが1回の作業を安全に完了できる環境と検証」を扱い、Loop Engineeringは「その作業を複数セッションでどう継続し、何を根拠に止めるか」を扱う。

このstarterでは、Loop Engineeringの制御層を `.agents/` 内に閉じ込める。

## 5層モデル

| 層 | 役割 | このkitでの実装 |
|---|---|---|
| harness(環境) | Agentが動く環境を用意する | `.agents/templates/long-running-agent/init.sh` |
| loop contract | 完了・停止条件を明文化する | `.agents/loop/loop-contract.template.md` |
| state layer | セッションを跨いで状態を残す | `.agents/templates/long-running-agent/feature-list.json` + `progress.md` |
| checker | 継続可能かを機械的に判定する | `.agents/scripts/harness-verify.sh` |
| human checkpoint | 不可逆・高リスク操作の前に人間が確認する | `.agents/standards/ai-development-rules.md` のApproval boundary |

## Long-running agent assets

- `.agents/templates/long-running-agent/init.sh`: fresh sessionでも同じ初期化を行う
- `.agents/templates/long-running-agent/feature-list.json`: feature state
- `.agents/templates/long-running-agent/progress.md`: durable handoff
- `.agents/templates/long-running-agent/SESSION_PROTOCOL.md`: session再開手順
- `.agents/loop/loop-contract.template.md`: Done / stop / checkpoint / checker contract

これらはアプリのruntime資産ではなく、Agent実行制御のための内部資産である。

## Osmaniのloop要素とのマッピング

| 要素 | このkitでの対応 |
|---|---|
| sub-agents | `.agents/templates/agent-roles/` (planner/generator/evaluator) |
| external state | `feature-list.json` / `progress.md` |
| skills | `.agents/skills/`、Claude互換は `.claude/skills/` |
| checker | `.agents/scripts/harness-verify.sh` |
| worktrees / automations / connectors | Agent実行環境・CI側の責務 |

## 使い方

1. 長時間・複数セッションにまたがる自律実行を始める前に `.agents/loop/loop-contract.template.md` を基にcontractを用意する。
2. `.agents/templates/long-running-agent/SESSION_PROTOCOL.md` の開始手順に従う。
3. checkerとして `.agents/scripts/harness-verify.sh` またはプロジェクト固有の同等物を使う。
4. checkerがFAILしている状態を完了扱いにしない。
5. `.agents/standards/ai-development-rules.md` のhuman checkpointに該当する操作ではLoopを停止する。
6. app code / tests / CIは `.agents/` に移さず、通常のApplication workspace資産として維持する。

## Boundary

Loopの**制御ロジック**は `.agents/` に隠す。
Loopが編集する実アプリのコード、テスト、deploy設定、CIは通常のrepo資産として見える状態にする。

詳細な一次資料との対応は `.agents/harness/reference-implementation-mapping.md` を参照する。
