# Architecture

このリポジトリは、AIエージェントが短時間で構造を把握できることを最優先にする。

## Layers

```text
AGENTS.md
  ↓ navigation / operating rules
ARCHITECTURE.md
  ↓ repository map
standards/
  ↓ technology-independent rules
harness/ | spec-driven-development/ | loop-engineering/
  ↓ 3つの並列手法: 検証カタログ / 機能仕様の型 / 自律実行の型
profiles/
  ↓ technology-specific constraints
templates/
  ↓ reusable project artifacts
docs/
  ↓ produced knowledge: design decisions, exec-plans, per-feature specs
scripts/
  ↓ mechanically enforced checks
examples/
  ↓ reference applications
```

## Dependency direction

- `standards/` は特定技術に依存しない。
- `harness/` / `spec-driven-development/` / `loop-engineering/` は並列レイヤーであり、
  いずれも `standards/` に依存する。それぞれ独立したディレクトリを持ち、1つの
  ディレクトリへ平置きにしない。
  - `harness/` は `standards/` を具体的な検証・運用に落とす。
  - `spec-driven-development/` は機能追加を仕様(spec)から実装計画まで型化する。
  - `loop-engineering/` は自律的・長時間の実行を型化する。
- `profiles/` は技術固有のルールだけを持つ。
- `templates/` は standards / harness / profiles を実プロジェクトへ持ち込むための成果物を持つ。
- `docs/` は設計判断(design-docs)・複雑作業の計画(exec-plans)・機能仕様の出力(specs)を
  system of recordとして集約する。
- `scripts/` はドキュメント上の重要な制約を可能な限り機械的に検証する。
- `examples/` は標準そのもののsource of truthにしない。

## Design principle

ドキュメントだけで守らせず、重要な不変条件は lint / structural test / script / CI に昇格する。

参考: OpenAI Harness Engineering
https://openai.com/index/harness-engineering/
