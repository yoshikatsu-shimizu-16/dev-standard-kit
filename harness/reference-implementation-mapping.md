# Public Harness Reference Mapping

公開一次資料から、dev-standard-kitへ具体的に取り込んだ要素を対応付ける。

## OpenAI Harness Engineering

Source: https://openai.com/index/harness-engineering/

取り込み:

- 短い `AGENTS.md` を目次として使う
- `ARCHITECTURE.md` をトップレベルの構造地図として置く
- 構造化された repository-local docs を system of record とする
- execution plan をversion管理する
- architecture boundary を custom lint / structural test で機械的に守る
- 人間のレビュー指摘や失敗を docs / lint / tests に昇格する
- UI、logs、metrics、tracesなどをagentから検証可能にする

対応:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `docs/design-docs/`
- `docs/exec-plans/`
- `harness/harness-lifecycle.md`
- `scripts/knowledge-base-check.sh`

## OpenAI Symphony

Source: https://openai.com/index/open-source-codex-orchestration-symphony/

取り込み:

- repository-owned `WORKFLOW.md`
- workflow policy / config / coordination / execution / observability の分離
- 1タスクごとの独立workspaceという考え方
- retry/recoveryとhandoff stateをworkflowの一部として扱う
- agentの成功を必ずしもDoneにせずHuman Reviewへ渡せる

対応:

- `WORKFLOW.md`
- `templates/WORKFLOW.md`

## Anthropic Effective Harnesses for Long-Running Agents

Source: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

取り込み:

- initializer phase と coding phase を分ける
- `init.sh` で起動方法を固定する
- structured feature list をJSONで管理する
- feature listの完了状態以外をcoding agentが勝手に書き換えない
- 一度に1機能ずつ進める
- progress artifact + git historyでセッション間を引き継ぐ
- セッション開始時にbaseline smoke testを行う
- browser automationによるE2E確認後に完了扱いにする

対応:

- `templates/long-running-agent/init.sh`
- `templates/long-running-agent/feature-list.json`
- `templates/long-running-agent/progress.md`
- `templates/long-running-agent/SESSION_PROTOCOL.md`

## Anthropic Harness Design for Long-Running Application Development

Source: https://www.anthropic.com/engineering/harness-design-long-running-apps

取り込み:

- planner / generator / evaluator の責務分離
- 大きなbuildを小さく検証可能なchunkに分解する
- structured artifactでhandoffする
- harness componentはモデル能力への仮定なので、定期的に必要性を再評価する

対応:

- `harness/harness-lifecycle.md`
- `docs/exec-plans/`

## Anthropic Managed Agents

Source: https://www.anthropic.com/engineering/managed-agents

取り込み:

- harness、session、sandboxを分離して考える
- モデル改善により不要になったscaffoldingを削除する
- harnessを永続的な真理ではなくversioned assumptionとして管理する

対応:

- `harness/harness-lifecycle.md`

## Cloudflare

Workers testing:
https://developers.cloudflare.com/workers/testing/vitest-integration/

D1 local development:
https://developers.cloudflare.com/d1/best-practices/local-development/

取り込み:

- Workers runtimeに近いテスト
- D1/R2 binding込みintegration test
- local migration verification
- production resourceに触らず検証する境界

対応:

- `profiles/cloudflare/`
- `harness/verification-matrix.md`
- `scripts/harness-verify.sh`

## 方針

一次資料の仕組みを無条件にコピーしない。各要素には「どの失敗を防ぐためのものか」を持たせ、実プロジェクトで有効性を確認する。不要になったハーネスは削除・簡素化する。
