# dev-standard-kit

個人開発で毎回使い回すための **Fork-first Application Starter + AI Development System** です。

このrepositoryをフォークし、要件・仕様を固めたあと、`frontend/`・`backend/`・`infrastructure/` の雛形からアプリを育てることを前提にしています。

Harness Engineering / Loop Engineering / SDDの実行方法やAgent用の開発標準は、アプリ本体と混ざらないよう **`.agents/` 配下に集約**します。

## Quick start

Node.js 24 と npm を用意します。Cloudflareアカウントは、ローカルで雛形を確認するだけなら不要です。

1. GitHubでこのリポジトリをForkし、Fork先をcloneします。
2. Fork先のルートで依存関係をインストールします。

   ```bash
   npm ci
   ```

3. フロントエンドを起動し、表示されたローカルURLをブラウザで開きます。

   ```bash
   npm run dev
   ```

4. 別のターミナルでAPIを起動します。ローカルAPIは `http://localhost:8787` で動きます。

   ```bash
   npm run dev:backend
   ```

5. まず`docs/project-requirements.md`で全体要件を整理し、`docs/constitution.md`で共通原則を定めます。次に一つの利用者フローを選び、`docs/specs/<feature>/`で requirements → design → tasks を進めます。各成果物はレビュー用PRを人間がマージしてから次の段階へ進みます。手順は [WORKFLOW.md](WORKFLOW.md) を参照してください。
6. 変更後、Fork先のルートで完全検証を実行します。

   ```bash
   npm run harness:verify
   ```

`harness:verify` はformat、型検査、lint、テスト、build、ブラウザE2Eなどをまとめて実行します。Cloudflareへのデプロイと本番用リソースの準備は [infrastructure/README.md](infrastructure/README.md) を参照してください。

## License

このキットのライセンスは [MIT License](LICENSE) です。Fork先で再利用・改変・配布する場合は、ライセンス本文に記載された著作権表示と許諾表示を保持してください。依存パッケージはそれぞれのライセンスに従います。

## Contributing

不具合報告、改善提案、Pull Requestの提出、メンテナーのレビュー・リリース手順は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

公開利用例と保守の根拠は [docs/maintainers/adoption-evidence.md](docs/maintainers/adoption-evidence.md) に記録します。

## Repository model

```text
dev-standard-kit/
├── README.md
├── AGENTS.md
├── ARCHITECTURE.md
├── WORKFLOW.md
│
├── frontend/                 # React application
├── backend/                  # Hono API / D1・R2 adapters
├── infrastructure/           # Wrangler / Terraform / migrations
│
├── docs/
│   ├── project-requirements.md # 全体要件
│   ├── constitution.md         # プロジェクト共通原則
│   ├── specs/                # requirements / design / tasks
│   ├── design-docs/
│   ├── exec-plans/
│   └── maintainers/
│
├── .agents/                  # AI Development System
│   ├── README.md
│   ├── skills/               # canonical Agent Skills
│   ├── sdd/                  # SDD method / templates
│   ├── standards/
│   ├── profiles/
│   ├── harness-engineering/
│   ├── loop-engineering/
│   ├── scripts/
│   ├── templates/
│   └── examples/
│
├── .claude/skills/           # Claude Code compatibility / forwarding
└── .github/                  # CI / repository automation
```

トップレベルにHarnessやLoopの方法論ファイルを散在させず、通常のアプリ開発ではApplication workspaceと`docs/`を中心に見る設計です。

## Standard development flow

```text
Fork
  ↓
Intent / project principles
  ↓
requirements
  ↓ Human Review
Design
  ↓ Human Review
Tasks
  ↓ Human Review
Analyze
  ↓
frontend / backend / infrastructure に実装
  ↓
Harness verification
  ↓
Evidence-based handoff
  ↓
必要なら Loop Engineering で継続
```

詳細は `WORKFLOW.md` を参照してください。

## SDD

SDDは「実行方法」と「成果物」を分けます。

- 実行方法: `.agents/skills/sdd-*`、`.agents/sdd/`
- プロジェクト原則: `docs/constitution.md`
- 人間と共有する成果物: `docs/project-requirements.md`、`docs/constitution.md`、`docs/specs/<feature>/`

機能ごとに次を作ります。

```text
docs/specs/<feature>/
├── requirements.md
├── design.md
└── tasks.md
```

機械チェックは `npm run harness:verify` から実行します。

## Harness Engineering

Harness Engineeringの定義・quality gate・verification matrixは `.agents/harness-engineering/` にまとめています。

主な入口:

- `.agents/harness-engineering/harness-catalog.yaml`
- `.agents/harness-engineering/quality-gates.md`
- `.agents/harness-engineering/verification-matrix.md`
- `.agents/harness-engineering/task-contract-template.md`
- `.agents/harness-engineering/reference-implementation-mapping.md`
- `.agents/scripts/harness/harness-verify-orchestrator.sh`

Harness Engineeringの制御資産はAgent側に置きますが、実アプリのtest、build、CIなど**実際に品質を強制する資産まで隠すわけではありません**。

## Loop Engineering

長時間・複数セッションのAgent実行を支える制御層は `.agents/loop-engineering/` と `.agents/templates/long-running-agent/` にまとめています。

- `.agents/loop-engineering/loop-contract.template.md`
- `.agents/templates/long-running-agent/SESSION_PROTOCOL.md`
- `.agents/templates/long-running-agent/init.sh`
- `.agents/templates/long-running-agent/feature-list.json`
- `.agents/templates/long-running-agent/progress.md`

checkerは `.agents/scripts/harness/harness-verify-orchestrator.sh` へ接続します。

## Default stack

最初のstarter profileは次を想定しています。

- React + Vite + TypeScript
- Hono
- Cloudflare Workers
- Cloudflare D1
- Cloudflare R2
- Vitest
- Playwright

技術固有ルールは `.agents/profiles/` に置きます。

## Agent compatibility

`.agents/skills/` をcanonical Skill置き場とします。

Claude Code向けには `.claude/skills/` にforwarding Skillを置き、Skill本文を二重管理しない方針です。

## Kit maintenance

通常のアプリ開発では `.agents/` の内部を頻繁に触りません。
Harness、standards、profiles、Agent Skill、Loop等のstarter基盤そのものを改善するときだけ **Kit Maintenance Mode** とし、`docs/maintainers/dev-standard-kit-maintenance.md` に従います。

## Verification

AI development systemの構造チェック:

```bash
npm run harness:verify
```

Harness全体のchecker:

```bash
npm run harness:verify
```

実行可能なapplication scaffold、Workers runtime、D1/R2 bindings、Terraform、CI workflowを含みます。

Infrastructureのlocal setupとproduction approval boundaryは[`infrastructure/README.md`](infrastructure/README.md)を参照してください。

## Primary references

### OpenAI

- Harness engineering: leveraging Codex in an agent-first world  
  https://openai.com/index/harness-engineering/
- Symphony / repository-owned agent workflow  
  https://openai.com/index/open-source-codex-orchestration-symphony/

取り込んでいる主な考え方:

- `AGENTS.md` を巨大マニュアルではなくnavigation mapにする
- repository-local docsをsystem of recordにする
- architecture ruleをlint / structural checkへ昇格する
- workflowをrepository側でversion管理する
- 完了を自己申告ではなくverification evidenceで判断する

### Anthropic

- Effective harnesses for long-running agents  
  https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Harness design for long-running application development  
  https://www.anthropic.com/engineering/harness-design-long-running-apps

取り込んでいる主な考え方:

- deterministic initializer
- structured feature state
- durable progress handoff
- baseline smoke before new work
- planner / generator / evaluatorの責務分離
- model/toolingの改善に合わせたHarnessの簡素化

### Spec-Driven Development

- GitHub Spec Kit: https://github.com/github/spec-kit
- AWS Kiro Specs: https://kiro.dev/docs/specs/
- Agent Skills: https://agentskills.io/

一次資料と実装ファイルの詳細対応は `.agents/harness-engineering/reference-implementation-mapping.md` を参照してください。

## Current roadmap

現在はまずrepositoryの責務をFork-firstへ整理しています。
後続Issueで以下を順番に進めます。

1. `frontend/` / `backend/` / `infrastructure/` の実行可能なscaffold
2. Fork後のproject initialization
3. Harnessの必須gate強制
4. SDD implement / converge orchestration
5. Long-running Loopの実運用化
6. Harness状態のdoctor表示
7. Quick Startの仕上げ
