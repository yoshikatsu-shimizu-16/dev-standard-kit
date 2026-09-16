# dev-standard-kit

AI駆動開発で毎回再利用するための個人用開発標準・Harness Engineering Kitです。

このリポジトリでは、開発ルールを単なるドキュメントとして置くだけでなく、`AGENTS.md`、品質ゲート、テスト、CI、技術スタック別プロファイルを組み合わせて、AI Coding Agent が検証可能な形で開発できる状態を作ります。

## 基本思想

```text
Specification
   ↓
Development Standards
   ↓
Harness
   ↓
Implementation
   ↓
Verification Loop
   ↓
Evidence-based Completion
```

## 構成

```text
dev-standard-kit/
├── README.md
├── AGENTS.md
├── standards/
│   ├── ai-development-rules.md
│   └── definition-of-done.md
├── harness/
│   ├── harness-catalog.yaml
│   ├── quality-gates.md
│   ├── verification-matrix.md
│   └── task-contract-template.md
├── profiles/
│   ├── react/
│   ├── hono/
│   └── cloudflare/
├── scripts/
│   ├── harness-bootstrap.sh
│   └── harness-verify.sh
├── templates/
│   ├── project-AGENTS.md
│   └── github/
│       └── harness-quality-gate.yml
└── examples/
    └── react-hono-cloudflare/
```

## レイヤー

- `standards/`: 技術に依存しない共通開発標準
- `harness/`: AIの作業・検証・完了条件を制御するハーネス
- `profiles/`: React / Hono / Cloudflare など技術別ルール
- `scripts/`: ローカルで実行する品質ゲート
- `templates/`: 新規プロジェクトへ持ち込むテンプレート
- `examples/`: スタック別の適用例

## Harness Catalog

`harness/harness-catalog.yaml` に44個のハーネスを定義しています。

P0は最初から導入する基本ガードレール、P1は本格開発までに追加するハーネスです。

特に重要なもの:

- Repository Operating Manual (`AGENTS.md`)
- Task Contract
- Architecture Rules
- Typecheck / Lint
- Runtime Test
- DB Migration Test
- Storage Integration Test
- Browser E2E
- Diff Scope Check
- Evidence-based Completion
- Harness Feedback Loop

## 最初の対応スタック

- React + Vite + TypeScript
- Hono
- Cloudflare Workers
- Cloudflare Workers Assets
- Cloudflare D1
- Cloudflare R2
- Vitest
- Playwright

Cloudflare Pages は既存構成やfrontend/API分離時の選択肢として扱います。

## 新規プロジェクトへの適用

1. `templates/project-AGENTS.md` をプロジェクトの `AGENTS.md` として配置する。
2. 使用技術に対応する `profiles/` を参照する。
3. `scripts/harness-verify.sh` をプロジェクトへ配置する。
4. `package.json` に必要な検証scriptを定義する。
5. `templates/github/harness-quality-gate.yml` を `.github/workflows/` へ配置する。
6. タスクごとに `harness/task-contract-template.md` を使って受け入れ条件を明文化する。

React + Hono + Cloudflare の具体例は `examples/react-hono-cloudflare/README.md` を参照してください。

## Standard verification loop

```text
Task Contract
   ↓
Implement
   ↓
Typecheck / Lint
   ↓
Unit Test
   ↓
Runtime Test
   ↓
Integration Test
   ↓
E2E
   ↓
Production Build
   ↓
Diff Review
   ↓
Evidence付きで完了
```

失敗が繰り返された場合は注意書きを増やすだけで終わらせず、lint・test・script・CI・architecture rule のいずれかへ昇格させます。

## 参考文献と反映箇所

このリポジトリは、特定企業のテンプレートをそのままコピーしたものではありません。主に OpenAI の Harness Engineering の考え方を中核に置き、Cloudflare Workers の公式テスト・ローカル開発機構と、一般的なCI/CD・品質ゲートの考え方を組み合わせて再構成しています。

| 参考文献 | 取り入れた考え方 | dev-standard-kit での反映箇所 |
|---|---|---|
| [OpenAI: Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) | リポジトリをエージェントにとって読める状態にすること、repository knowledge を system of record にすること、architecture をルールとして強制すること、AIの失敗を環境改善へ還元する考え方 | `AGENTS.md`, `standards/ai-development-rules.md`, `harness/harness-catalog.yaml`, `harness/quality-gates.md`, Harness Feedback Loop |
| [OpenAI 日本語版: ハーネスエンジニアリング](https://openai.com/ja-JP/index/harness-engineering/) | 上記Harness Engineeringの日本語での概念整理 | README の基本思想、AI Coding Agent向けの共通開発標準 |
| [Cloudflare Workers: Testing](https://developers.cloudflare.com/workers/testing/) | Unit test と integration test を分け、Workers runtime上でテストし、`createTestHarness()` でWorker全体を検証する考え方 | `harness/quality-gates.md`, `harness/verification-matrix.md`, Worker Integration Harness |
| [Cloudflare Workers: Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) | `@cloudflare/vitest-plugin` を使って Workers runtime・binding を含むテストをローカルで実行する設計 | Workers Runtime Test, D1/R2 Binding Test, `profiles/cloudflare/` |
| [Cloudflare Workers: createTestHarness() Get started](https://developers.cloudflare.com/workers/testing/test-harness/get-started/) | Wrangler設定から実際のWorker buildを起動し、HTTP経由でintegration testする仕組み | `harness/harness-catalog.yaml` の Worker Test Harness / Representative API Roundtrip |
| [Cloudflare D1: Local development](https://developers.cloudflare.com/d1/best-practices/local-development/) | productionに近いD1をローカルで使い、Wrangler経由でmigrationとDB動作を検証する考え方 | D1 Migration Files, D1 Clean Migration Test, D1 Repository Integration, `profiles/cloudflare/workers-d1-r2-rules.md` |
| [Cloudflare Workers: Local development](https://developers.cloudflare.com/workers/local-development/) | Miniflare / workerd とローカルbindingを利用し、本番へ触らずにWorkers・D1・R2などを検証する方針 | Local Binding Simulation, Production Destructive Operation Boundary, `scripts/harness-verify.sh` |
| [Cloudflare Workers: Vitest recipes](https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/) | D1 migration、R2、複数Workerなどを実runtimeに近い条件でテストする具体例 | D1/R2 integration harness, runtime/integration testの検証マトリクス |

### OpenAI由来の設計思想

特に次の部分は OpenAI の Harness Engineering から強く影響を受けています。

- AIへの指示を毎回のプロンプトだけに閉じず、リポジトリ内の `AGENTS.md` と開発標準に固定する。
- 設計ルールを文章で説明するだけでなく、lint・test・CI・architecture rule によって機械的に強制する。
- AIが同じ失敗を繰り返した場合、注意書きを増やすのではなく、次回から失敗を検出できるハーネスへ昇格させる。
- 「実装した」という自己申告ではなく、実行した検証と結果を evidence として残して完了判定する。

### Cloudflare由来の実装ハーネス

Cloudflare向けProfileでは、公式ドキュメントに沿って次を具体的なHarnessとして落としています。

- Workers Vitest integration による Workers runtime 内テスト
- D1 / R2 binding を使ったローカルintegration test
- `createTestHarness()` によるWorker全体のHTTP integration test
- WranglerによるD1 migrationのローカル適用
- Miniflare / workerd を利用したproduction resourceに触れないローカル検証

### このリポジトリ独自の再構成

以下は上記資料をそのまま転記したものではなく、この `dev-standard-kit` の運用向けに再構成したものです。

- 44項目の Harness Catalog と P0 / P1 優先度
- Task Contract テンプレート
- Verification Matrix
- Definition of Done
- Production destructive operation の approval boundary
- `scripts/harness-verify.sh` による統一検証ループ
- React / Hono / Cloudflare を分離した Technology Profile 構造

参考文献は設計思想と公式機能の根拠として利用し、各プロジェクト固有のルールや品質基準はこのリポジトリ側で継続的に改善していきます。
