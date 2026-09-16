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
harness/
  ↓ verification, task contracts, lifecycle
profiles/
  ↓ technology-specific constraints
templates/
  ↓ reusable project artifacts
scripts/
  ↓ mechanically enforced checks
examples/
  ↓ reference applications
```

## Dependency direction

- `standards/` は特定技術に依存しない。
- `harness/` は `standards/` を具体的な検証・運用に落とす。
- `profiles/` は技術固有のルールだけを持つ。
- `templates/` は standards / harness / profiles を実プロジェクトへ持ち込むための成果物を持つ。
- `scripts/` はドキュメント上の重要な制約を可能な限り機械的に検証する。
- `examples/` は標準そのもののsource of truthにしない。

## Design principle

ドキュメントだけで守らせず、重要な不変条件は lint / structural test / script / CI に昇格する。

参考: OpenAI Harness Engineering
https://openai.com/index/harness-engineering/
