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

- `standards/`: 技術に依存しない共通開発標準
- `harness/`: AIの作業・検証・完了条件を制御するハーネス
- `profiles/`: React / Hono / Cloudflare など技術別ルール
- `scripts/`: ローカルで実行する品質ゲート
- `templates/`: 新規プロジェクトへ持ち込むテンプレート
- `examples/`: スタック別の適用例

最初のリファレンス構成は React + Hono + Cloudflare Workers + D1 + R2 です。
