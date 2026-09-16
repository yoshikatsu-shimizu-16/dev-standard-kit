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
