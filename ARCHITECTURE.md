# Architecture

このリポジトリは、**フォークした後に個人アプリを構築するためのスターター**として設計する。
AI Coding Agent が短時間で「どこにアプリを書き、どこに仕様を書き、どこに開発標準があるか」を把握できることを最優先にする。

## Two zones

リポジトリを大きく2つの領域に分ける。

### 1. Application workspace

実際のアプリを構築する領域。

```text
frontend/        # UI / browser-side application
backend/         # API / business logic / data access
infrastructure/  # runtime / database / storage / deployment configuration
```

フォーク後は、まず要件・仕様を固め、そのspecに従って各ディレクトリの雛形からアプリを育てる。
これらの雛形コード自体は後続Issueで追加する。Issue #3時点ではトップレベルの責務と境界を先に固定する。

### 2. Embedded development system

アプリをAIと安全・再現可能に開発するための仕組み。

```text
AGENTS.md
  ↓ navigation / operating mode
WORKFLOW.md
  ↓ Fork後の標準開発フロー
spec-driven-development/
  ↓ project constitution / spec method / templates
.agent skills (.agents/skills/, .claude/skills/)
  ↓ requirements / design / tasks / analyze
standards/
  ↓ technology-independent rules
harness/
  ↓ quality gates / verification / task contract / lifecycle
profiles/
  ↓ technology-specific constraints
docs/
  ↓ specs / design decisions / execution plans
loop-engineering/
  ↓ long-running execution contract
scripts/
  ↓ mechanically enforced checks
templates/
  ↓ reusable artifacts and long-running scaffolding
examples/
  ↓ reference material; not source of truth
```

Embedded development system はアプリのruntimeコードではない。
アプリ機能の都合だけで標準側を書き換えず、繰り返す失敗や新しい共通ルールが見つかった場合にのみ改善対象とする。

## Target repository shape

フォーク先で目指すトップレベル構成は次の通り。

```text
<forked-project>/
├── frontend/                 # frontend scaffold → application code
├── backend/                  # backend scaffold → application code
├── infrastructure/           # infrastructure scaffold → application config
├── docs/
│   ├── specs/                # feature requirements / design / tasks
│   ├── design-docs/          # durable design decisions
│   └── exec-plans/           # complex non-feature work
├── spec-driven-development/  # project constitution + SDD method/templates
├── standards/                # common development standards
├── harness/                  # quality/verification rules
├── profiles/                 # technology-specific rules
├── loop-engineering/         # long-running loop contract
├── scripts/                  # bootstrap / verify / knowledge checks
├── .agents/skills/           # canonical agent skills
├── .claude/skills/           # Claude Code forwarding skills
├── templates/                # reusable support artifacts
├── AGENTS.md
├── ARCHITECTURE.md
└── WORKFLOW.md
```

## Application boundaries

### frontend/

- React等のUI実装
- routing / state / component / browser-side API client
- frontend unit test / browser E2E
- backend内部実装やCloudflare resource設定を直接持ち込まない

### backend/

- Hono等のHTTP/API entrypoint
- business logic
- repositories / storage adapters
- validation / authorization
- frontend UIロジックを持ち込まない

### infrastructure/

- Cloudflare Workers / D1 / R2等のruntime設定
- migration / binding / deployment configuration
- local / preview / production environment差分
- credentialそのものは保持しない

frontendとbackend間の契約、backendとinfrastructure間のruntime契約は、実装より先にspec/designで明示する。

## Development flow

```text
Fork
  ↓
Project intent / constitution
  ↓
Feature requirements
  ↓
Design
  ↓
Implementation tasks
  ↓
frontend / backend / infrastructure
  ↓
Harness verification
  ↓
Evidence-based handoff
  ↓
必要なら Loop Engineering で継続
```

仕様が実装領域より先に存在することを基本とする。
「まずコードを生成して後から仕様を合わせる」を標準フローにはしない。

## Dependency direction

- `standards/` は特定技術に依存しない。
- `profiles/` は技術固有の制約だけを持つ。
- `harness/` は standards / profiles を検証可能なquality gateへ落とす。
- `spec-driven-development/` は機能要求から実装計画までを型化する。
- `docs/specs/` はフォーク先アプリの機能仕様のsource of truthとなる。
- `frontend/`・`backend/`・`infrastructure/` はspec/designに従って変更する。
- `scripts/` は重要な不変条件を可能な限り機械的に検証する。
- `examples/` は参考資料であり、アプリ仕様や標準のsource of truthにはしない。

## Kit maintenance boundary

通常のフォーク先開発では、主に Application workspace と `docs/` を変更する。

`standards/`、`harness/`、`profiles/`、`templates/`、Agent Skills 等の仕組みそのものを変更する場合は **Kit Maintenance Mode** とする。
保守方針は `docs/maintainers/dev-standard-kit-maintenance.md` をsource of truthとする。

## Design principle

ドキュメントだけで守らせず、重要な不変条件は lint / structural test / script / CI に昇格する。
一方で、アプリ固有ルールと再利用可能な標準を混同しない。
