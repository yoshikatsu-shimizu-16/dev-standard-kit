# Project Constitution

> **singleton**: このファイルはプロジェクトに1つだけ存在する。V字モデルの
> 要件定義・基本設計に相当する持続的文書であり、`docs/specs/<feature>/`のように
> 機能ごとに繰り返し作られるものではない。フォーク先プロジェクトが最初に埋め、
> 以後は改訂のみ行う。

参考: GitHub Spec Kit "constitution" — https://github.com/github/spec-kit

## Purpose

プロジェクト全体で守る不可侵の原則を1箇所に集約する。`docs/specs/<feature>/requirements.md`の
各EARS要求は、この原則に反しないことが前提となる(違反があれば`skills/analyze/`が検出する)。

## Principles

- 技術選定: (例: 使用するprofile、フレームワーク、runtime)
- アーキテクチャ制約: `ARCHITECTURE.md` / `profiles/<technology>/architecture-rules.md` に従う
- 破壊的変更の扱い: `standards/ai-development-rules.md` §4 Approval boundary に従う
- テスト方針: `harness/verification-matrix.md` に従う
- ここにプロジェクト固有の不可侵原則を追記する

## Non-goals

- ここに書かない: 個別機能の詳細な要求(→ `docs/specs/<feature>/requirements.md`)
- ここに書かない: 実装手順・タスク分解(→ `docs/specs/<feature>/tasks.md`)

## Change history

- YYYY-MM-DD: 初版作成
