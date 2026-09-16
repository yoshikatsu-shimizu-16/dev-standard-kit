# dev-standard-kit

AI駆動開発で毎回再利用するための個人用開発標準・Harness Engineering Kitです。

このリポジトリでは、開発ルールを単なるドキュメントとして置くだけでなく、`AGENTS.md`、`ARCHITECTURE.md`、`WORKFLOW.md`、構造化されたdocs、品質ゲート、テスト、CI、技術スタック別profileを組み合わせて、AI Coding Agentが検証可能な形で開発できる状態を作ります。

## 基本思想

```text
Specification
   ↓
Repository Knowledge
   ↓
Development Standards
   ↓
Harness / Workflow
   ↓
Implementation
   ↓
Verification Loop
   ↓
Durable Handoff
   ↓
Evidence-based Completion
```

## 構成

```text
dev-standard-kit/
├── README.md
├── AGENTS.md                 # 短いナビゲーションマップ
├── ARCHITECTURE.md           # リポジトリ/依存方向の地図
├── WORKFLOW.md               # agentのrepository-owned workflow
├── standards/
├── harness/
│   ├── harness-catalog.yaml
│   ├── quality-gates.md
│   ├── verification-matrix.md
│   ├── task-contract-template.md
│   ├── harness-lifecycle.md
│   └── reference-implementation-mapping.md
├── docs/
│   ├── design-docs/
│   └── exec-plans/
├── profiles/
│   ├── react/
│   ├── hono/
│   └── cloudflare/
├── scripts/
│   ├── harness-bootstrap.sh
│   ├── harness-verify.sh
│   └── knowledge-base-check.sh
├── templates/
│   ├── project-AGENTS.md
│   ├── WORKFLOW.md
│   ├── long-running-agent/
│   │   ├── init.sh
│   │   ├── feature-list.json
│   │   ├── progress.md
│   │   └── SESSION_PROTOCOL.md
│   └── github/
└── examples/
    └── react-hono-cloudflare/
```

## Harness Catalog

`harness/harness-catalog.yaml` に57個のハーネスを定義しています。

- P0: 最初から導入する基本ガードレール
- P1: 本格開発までに導入する
- P2: 規模・リスク・長時間自律実行に応じて追加する

最初の44項目は汎用の開発・品質ハーネスです。H045以降は、OpenAI / Anthropic が公開している具体的なharness実例を一次資料から取り込んだ項目です。

### 公開実例から追加した主なHarness

| ID | Harness | Source |
|---|---|---|
| H045 | `AGENTS.md` を巨大マニュアルではなくナビゲーションマップにする | OpenAI Harness Engineering |
| H046 | repository-local docsをsystem of recordにする | OpenAI Harness Engineering |
| H047 | versioned execution plan | OpenAI Harness Engineering |
| H048 | repository-owned `WORKFLOW.md` | OpenAI Symphony |
| H049 | 1タスクごとの独立workspace | OpenAI Symphony |
| H050 | deterministic `init.sh` | Anthropic Effective Harnesses |
| H051 | structured feature list JSON | Anthropic Effective Harnesses |
| H052 | 1回に1機能ずつ進めるincremental loop | Anthropic Effective Harnesses |
| H053 | progress artifact + git historyによるhandoff | Anthropic Effective Harnesses |
| H054 | 作業開始前baseline smoke test | Anthropic Effective Harnesses |
| H055 | planner / generator / evaluator | Anthropic Harness Design |
| H056 | harness assumptionsの定期見直し | Anthropic Harness Design / Managed Agents |
| H057 | knowledge baseの機械的検査 | OpenAI Harness Engineering |

詳細な「一次資料 → 取り込んだ仕組み → 配置ファイル」の対応は `harness/reference-implementation-mapping.md` を参照してください。

## OpenAIから具体的に取り込んだもの

OpenAIのHarness Engineeringでは、巨大な`AGENTS.md`ではなく短い入口から構造化されたrepository knowledgeへ誘導し、設計・仕様・execution planをversion管理し、architecture boundaryをcustom lintやstructural testで機械的に守る構成が公開されています。

このkitでは次へ反映しています。

- `AGENTS.md`: 詳細規約ではなく目次
- `ARCHITECTURE.md`: top-level architecture map
- `docs/design-docs/`: 設計判断のsystem of record
- `docs/exec-plans/`: 長時間作業のplan / progress / decision log
- `scripts/knowledge-base-check.sh`: docs構造と導線の機械的検査
- `harness/harness-lifecycle.md`: 失敗をdocsだけでなくlint/test/CIへ昇格

OpenAI Symphonyからは、agent workflowそのものをrepository-owned `WORKFLOW.md` としてversion管理する考え方と、タスクごとのworkspace、retry/recovery、Human Reviewへのhandoffという設計を取り込んでいます。

## Anthropicから具体的に取り込んだもの

Anthropicのlong-running agent harnessでは、複数context/sessionにまたがる作業を成立させるためのかなり具体的なartifactが公開されています。

このkitでは `templates/long-running-agent/` に次を用意しています。

- `init.sh`: fresh sessionでも同じ手順で環境を起動する
- `feature-list.json`: 全機能を構造化し、`passes=false/true` で進捗を明確化する
- `progress.md`: session間のdurable handoff
- `SESSION_PROTOCOL.md`: session開始時にprogress、feature list、git logを読み、baseline smoke test後に1機能だけ進める手順

また、Anthropicの後続記事から、planner / generator / evaluatorの責務分離と、「harnessはモデル能力への仮定を含むため、モデル改善に合わせて不要なscaffoldingを削る」というlifecycleを取り込んでいます。

## 最初の対応スタック

- React + Vite + TypeScript
- Hono
- Cloudflare Workers / Workers Assets
- Cloudflare D1
- Cloudflare R2
- Vitest
- Playwright

Cloudflare Pages は既存構成やfrontend/API分離時の選択肢として扱います。

## 新規プロジェクトへの適用

1. `templates/project-AGENTS.md` をプロジェクトの `AGENTS.md` として配置する。
2. `templates/WORKFLOW.md` を必要に応じて配置する。
3. 使用技術に対応する `profiles/` を参照する。
4. `scripts/harness-verify.sh` を配置する。
5. `package.json` に必要な検証scriptを定義する。
6. `templates/github/harness-quality-gate.yml` を `.github/workflows/` へ配置する。
7. 長時間タスクでは `templates/long-running-agent/` を導入する。
8. 複雑な作業は `docs/exec-plans/template.md` 形式でexecution planを残す。

React + Hono + Cloudflare の具体例は `examples/react-hono-cloudflare/README.md` を参照してください。

## Standard verification loop

```text
Task Contract / Feature List
   ↓
Baseline Smoke
   ↓
Implement one coherent change
   ↓
Typecheck / Lint
   ↓
Unit Test
   ↓
Runtime / Integration Test
   ↓
Browser E2E
   ↓
Production Build
   ↓
Diff Review
   ↓
Progress / Decision Log
   ↓
Evidence付きでhandoff
```

失敗が繰り返された場合は注意書きを増やすだけで終わらせず、lint・test・script・CI・architecture rule のいずれかへ昇格させます。

一方で、harnessは増やし続けるだけではありません。モデル・ツールが改善し、あるscaffoldingが不要になった場合は、1要素ずつ外して性能と安全性への影響を確認し、不要なものを削ります。

## 参考文献と反映箇所

### OpenAI

#### Harness engineering: leveraging Codex in an agent-first world
https://openai.com/index/harness-engineering/

反映:
- `AGENTS.md` をナビゲーションマップとして維持
- `ARCHITECTURE.md`
- structured repository knowledge
- design docs / execution plans
- mechanical architecture enforcement
- feedbackをdocs/lint/testへ昇格
- agentからUI/logs/metrics等を観測可能にする考え方

#### 日本語版 Harness Engineering
https://openai.com/ja-JP/index/harness-engineering/

反映:
- READMEおよび共通開発標準の概念整理

#### An open-source spec for Codex orchestration: Symphony
https://openai.com/index/open-source-codex-orchestration-symphony/

反映:
- repository-owned `WORKFLOW.md`
- workflow policyとruntime/coordinationの分離
- per-task workspace
- retry / recovery / reconciliation
- Human Review handoff

#### Unlocking the Codex harness: how we built the App Server
https://openai.com/index/unlocking-the-codex-harness/

反映:
- agent loopとclient/UIを分離する考え方
- harnessを複数surfaceから再利用する設計原則

#### Introducing the Agents API
https://openai.com/index/introducing-the-agents-api/

反映:
- context / tools / subagents / sandbox / intermediate artifacts をharnessの主要責務として捉える考え方

### Anthropic

#### Effective harnesses for long-running agents
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

反映:
- initializer phase / coding phase
- `init.sh`
- structured feature list JSON
- one-feature-at-a-time development
- progress file + git history handoff
- session開始時baseline smoke
- browser automationによるE2E verification

#### Harness design for long-running application development
https://www.anthropic.com/engineering/harness-design-long-running-apps

反映:
- planner / generator / evaluator
- tractable chunksへの分解
- structured handoff artifacts
- harness componentを1つずつablationして必要性を確認する考え方

#### Scaling Managed Agents: Decoupling the brain from the hands
https://www.anthropic.com/engineering/managed-agents

反映:
- session / harness / sandbox の分離
- harness assumptionsがモデル改善で陳腐化することを前提としたlifecycle

#### Building a C compiler with a team of parallel Claudes
https://www.anthropic.com/engineering/building-c-compiler

反映:
- parallel agentsではテストと明確な作業分割が自律性の土台になるという考え方

### Cloudflare

#### Workers Vitest integration
https://developers.cloudflare.com/workers/testing/vitest-integration/

反映:
- Workers runtime上のテスト
- D1/R2 binding込みintegration test

#### D1 Local development
https://developers.cloudflare.com/d1/best-practices/local-development/

反映:
- local migration verification
- production resourceに触れないDB検証

#### Workers Local development
https://developers.cloudflare.com/workers/local-development/

反映:
- local runtime / bindingsを利用したproduction-safeな検証

## このリポジトリ独自の再構成

一次資料をそのままコピーしたものではありません。以下は `dev-standard-kit` として統合・再構成しています。

- 57項目のHarness CatalogとP0/P1/P2優先度
- Task Contract
- Verification Matrix
- Definition of Done
- approval boundary
- React / Hono / Cloudflare Technology Profiles
- Harness Lifecycle
- Knowledge Base Check
- OpenAI型repository knowledgeとAnthropic型long-running handoffの統合

目的は「特定モデル専用の巨大プロンプト」を作ることではなく、Codex、Claude Code、その他のcoding agentでも利用できる、repository-ownedで検証可能な開発環境を育てることです。
