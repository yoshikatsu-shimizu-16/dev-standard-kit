# dev-standard-kit Maintenance Guide

## Purpose

この文書は、**スターターとしてのアプリ開発ではなく、dev-standard-kit 自身のAI開発基盤・Harness・SDD・Loop Engineering・テンプレートを改善する場合だけ**読む。

フォーク先で通常のアプリ機能を作るときは `AGENTS.md` と `WORKFLOW.md` の Application Development Mode に従う。

## What belongs to Kit Maintenance

次のような変更は Kit Maintenance Mode とする。

- `.agents/standards/` の共通開発ルールを変更する
- `.agents/harness-engineering/` のquality gate、verification matrix、catalogを変更する
- `.agents/profiles/` の技術固有ルールを変更する
- `.agents/sdd/` の方式・テンプレートを変更する
- `.agents/skills/` や `.claude/skills/` のAgent Skillを変更する
- `.agents/loop-engineering/` や `.agents/templates/long-running-agent/` の仕組みを変更する
- `.agents/scripts/` の共通checker/bootstrapを変更する
- `.agents/templates/` の再利用artifactを変更する
- fork-firstの標準ディレクトリ構造そのものを変更する

アプリ固有のUI・API・DB設計を変更するだけならKit Maintenanceではない。

## Maintenance principles

1. **Fork-firstを壊さない**
   - このrepositoryの主用途は、フォークして個人アプリを作ること。
   - upstream kitを使うために大量のコピー作業を要求する設計へ戻さない。

2. **Application workspace と AI development system を分離する**
   - アプリ本体は `frontend/`・`backend/`・`infrastructure/`。
   - 人間と共有する仕様・設計判断は `docs/`。
   - 標準・Harness・SDD実行方法・Loop・Agent template/checkerは `.agents/`。
   - runtime codeから `.agents/` への依存を作らない。

3. **Rootを散らかさない**
   - Agent専用の方法論・制御ファイルをトップレベルへ増やさない。
   - 新しいAgent向け資産は、まず `.agents/` の既存分類へ置けないか検討する。
   - `.github/` はCI、`.claude/` はClaude互換層として例外的にrootに置く。

4. **Source of truthを重複させない**
   - 同じルールを複数ファイルへコピーしない。
   - `AGENTS.md` はナビゲーションに留め、詳細は適切な文書へ置く。
   - `.agents/skills/` をcanonicalとし、agent固有の転送ファイルは意味がずれないようにする。
   - Harnessの公開実行入口は `npm run harness:verify` だけにする。
   - `.agents/scripts/harness/` 直下は `harness-verify.sh` のみとし、checker/setupはsubdirectoryへ分ける。

5. **重要なルールは機械的に検証する**
   - 注意書きだけで再発防止しない。
   - lint / test / checker / CI / structural checkへ昇格できるか検討する。

6. **Harnessを無限に増やさない**
   - モデル・tooling・runtimeの改善で不要になったscaffoldingは削除候補とする。
   - 追加時は目的・適用範囲・検証方法を明確にする。

7. **高リスク操作はHuman Reviewへ戻す**
   - production deploy、破壊的migration、credential変更等をAIの暗黙承認にしない。

## Maintenance workflow

### Start

1. Issueまたは変更目的を確認する。
2. `AGENTS.md`、`ARCHITECTURE.md`、`WORKFLOW.md`、`.agents/README.md` を読む。
3. 変更対象のsource of truthを特定する。
4. 既存の `.agents/harness-engineering/reference-implementation-mapping.md` と矛盾しないか確認する。
5. 変更がフォーク先Application Development Modeへ与える影響を整理する。

### Work

- 1つの目的に対する最小変更にする。
- application-specificな都合を共通標準へ昇格させる前に、再利用性があるか確認する。
- 新しい規約を追加する場合は、どのchecker/CIが守るかを検討する。
- `frontend/`・`backend/`・`infrastructure/` のアプリ雛形を変更する場合は、profile/architectureとの整合も確認する。
- Agent制御資産を追加する場合は `.agents/` の外へ新しいトップレベルディレクトリを作らないことを原則とする。

### Verify

通常の検証入口は1つだけにする。

```bash
npm run harness:verify
```

`.agents/scripts/harness/checks/` や `setup/` はHarness内部実装であり、保守・デバッグ以外では直接呼ばない。

### Handoff

- 変更した標準/仕組み
- なぜ共通化すべきか
- フォーク先への影響
- 実行した検証
- backward compatibility上の注意
- 残課題

を残す。

## Relationship to the forked application

upstreamの `dev-standard-kit` はstarterと `.agents/` のAI開発基盤を改善する場所であり、fork先は実アプリを開発する場所である。

ただしfork先でも、繰り返す失敗から再利用可能なHarness改善が見つかることはある。その場合はアプリ変更と標準変更を同じdiffへ無造作に混ぜず、可能なら別Issue・別PRとして扱う。
