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

## AWS Kiro

Source: https://kiro.dev/docs/specs/ , https://kiro.dev/docs/specs/best-practices/ , https://kiro.dev/docs/steering/

取り込み:

- `requirements.md`(EARS記法) → `design.md` → `tasks.md` という3段階、各段階でレビュー・承認してから次へ進む
- `steering`(プロジェクト全体で永続する技術スタック・規約)と`specs`(機能ごと)の2階層分離

対応:

- `spec-driven-development/README.md`
- `spec-driven-development/constitution.md`
- `spec-driven-development/templates/{requirements,design,tasks}.template.md`

## GitHub Spec Kit

Source: https://github.com/github/spec-kit , https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/

取り込み:

- `constitution`(プロジェクトに1回だけ、不可侵の原則) → `specify` → `plan` → `tasks` → `analyze`(整合性ゲート、read-only) → `implement`
- `/specs/<feature>/`というper-feature ディレクトリ規約
- specをスキル(実行手順+出力先の明示)として構造化する考え方
- `analyze`ゲートのうち機械的に判定できる部分(レビュー完了・要求ID・traceability・
  検証フィールドの有無)はスクリプトで強制する

対応:

- `spec-driven-development/constitution.md`
- `.agents/skills/sdd-{specify,plan,tasks,analyze}/SKILL.md`(実体)
- `.claude/skills/sdd-{specify,plan,tasks,analyze}/SKILL.md`(Claude Code用転送)
- `docs/specs/README.md`
- `scripts/spec-check.sh`(`analyze`の機械的な事前チェック)

## Agent Skills open standard

Source: https://agentskills.io/ (Anthropicが2025年12月に公開したopen standard。
Codex CLI・Cursor・GitHub Copilot・Gemini CLI等が採用)

取り込み:

- SKILL.md(YAML frontmatterの`name`/`description` + 本文)というcross-agentな形式
- 各agentが実際にスキャンするディレクトリ規約(Claude Codeは`.claude/skills/`、
  Codex CLIは`.agents/skills/`)へ実体を置き、独自パスに置かない
- 複数ディレクトリへ実体を重複させないための「転送ファイル」パターン
  (frontmatterのみ同一にし、本文で実体ファイルを読むよう指示する)

対応:

- `.agents/skills/sdd-{specify,plan,tasks,analyze}/SKILL.md`(実体)
- `.claude/skills/sdd-{specify,plan,tasks,analyze}/SKILL.md`(転送)
- `spec-driven-development/README.md`「Skills」節

## Anthropic Claude Code (Spec-Driven Development)

Source: https://code.claude.com/docs/en/best-practices

取り込み:

- Explore → Plan → Implement → Commit という標準ループ
- 「specはコードではなく、コードより先に書かれ、コードより優先されるsource of truth」という位置づけ

対応:

- `spec-driven-development/README.md`
- `AGENTS.md`(H045 「AGENTS.mdを目次として維持する」との一貫性)

## Loop Engineering

Source: https://addyosmani.com/blog/loop-engineering/ , https://arxiv.org/html/2607.00038v1

> 要確認: 単一の「公式記事」が定まっていない急速に広まった概念。実装・引用時は
> 最新の一次資料URLを確認すること(`loop-engineering/README.md`参照)。

取り込み:

- harness(環境) → loop contract(完了/停止条件) → state layer(状態) → checker(自動検証) →
  human checkpoint(人間承認)という5層モデル
- automations/worktrees/skills/connectors/sub-agents/external stateというloopの解剖図
- プロンプトエンジニアリング→コンテキストエンジニアリング→ハーネスエンジニアリング→
  ループエンジニアリングという、置き換えではなく入れ子の発展構造

対応:

- `loop-engineering/README.md`
- `loop-engineering/loop-contract.template.md`
- `templates/long-running-agent/SESSION_PROTOCOL.md`

## 方針

一次資料の仕組みを無条件にコピーしない。各要素には「どの失敗を防ぐためのものか」を持たせ、実プロジェクトで有効性を確認する。不要になったハーネスは削除・簡素化する。
