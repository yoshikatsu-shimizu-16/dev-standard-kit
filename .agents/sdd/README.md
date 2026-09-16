# Spec-Driven Development (SDD)

## Purpose

コードではなく、specを実装のsource of truthにする。
仕様をコードより先に書き、version管理し、実装前にreview・整合性チェックを通してからコードを生成する。

参考:
- AWS Kiro: https://kiro.dev/docs/specs/ , https://kiro.dev/docs/specs/best-practices/
- GitHub Spec Kit: https://github.com/github/spec-kit
- Anthropic Claude Code Best Practices: https://code.claude.com/docs/en/best-practices

## Pipeline

```text
constitution(1回)
   ↓
requirements(EARS) →[review]→ design →[review]→ tasks →[review]→ analyze(整合性ゲート)
   ↓
implement
```

## SDDとV字モデルの対応関係

このkitでは、**プロジェクトに1回だけ作る層**と**機能ごとに繰り返す層**を分ける。

| V字モデルの工程 | このkitでの対応 | 頻度 |
|---|---|---|
| 要件定義・基本設計 | `.agents/sdd/constitution.md` | プロジェクトに1回、以後は改訂のみ |
| 詳細設計〜実装計画 | `docs/specs/<feature>/{requirements,design,tasks}.md` | 機能(feature)ごとに繰り返す |
| 実装 | 通常の実装作業(1タスク単位は`.agents/harness/task-contract-template.md`を併用) | tasks.mdの各項目ごと |
| 単体テスト | `.agents/harness/quality-gates.md` Gate 1-2。requirements.mdのacceptance criteria(EARS)をテストへ変換する | tasksの実装ごと |
| 結合・総合テスト | `.agents/harness/quality-gates.md` Gate 3-7、`.agents/harness/verification-matrix.md` | 機能ごと |
| UAT | 人間によるビジネス受け入れレビュー(`.agents/standards/ai-development-rules.md`の承認境界、`analyze`ゲートの先) | 機能ごと、人間判断 |

**SDDは新しいテスト工程を定義しない。** 単体〜UATは既存の`.agents/harness/quality-gates.md`・`.agents/harness/verification-matrix.md`が担当する。SDDが追加するのは、詳細設計〜実装計画を機能単位で高速に回すための型と、実装前に仕様の整合性を確認するゲートである。

## EARS記法 早見表

requirements.mdの各要求は、曖昧な自然文ではなく EARS (Easy Approach to Requirements Syntax, Mavin et al., IEEE RE'09) で書く。

| パターン | 構文 |
|---|---|
| Ubiquitous(常時) | THE SYSTEM SHALL <response> |
| Event-Driven(イベント駆動) | WHEN <trigger> THE SYSTEM SHALL <response> |
| State-Driven(状態駆動) | WHILE <state> THE SYSTEM SHALL <response> |
| Unwanted Behavior(異常系) | IF <condition> THEN THE SYSTEM SHALL <response> |
| Optional Feature(任意機能) | WHERE <feature is present> THE SYSTEM SHALL <response> |

## ディレクトリ規約

- `.agents/sdd/`: SDDの手法そのもの。constitution・templates・このREADMEを持つ。
- `.agents/skills/sdd-*/`: AgentがSDDを実行するcanonical Skill。
- `docs/specs/<feature>/`: specify/plan/tasksの出力先。1機能につき1ディレクトリ。

SDDの**仕組みは `.agents/`**、人間と共有する**成果物は `docs/`** に分離する。

## 既存の仕組みとの役割分担

| 仕組み | 用途 |
|---|---|
| `.agents/harness/task-contract-template.md` | 単一セッションで完結する小タスク。`tasks.md`の1項目を実装する単位にも使う |
| `docs/exec-plans/` | ユーザー可視の振る舞いを持たない複雑作業(リファクタ・依存更新・infra変更) |
| `.agents/sdd/` → `docs/specs/` | ユーザー可視の振る舞いや契約変更を伴う機能追加 |

## Skills

スキルは[Agent Skills open standard](https://agentskills.io/)のSKILL.md形式に従い、各agentが実際に自動発見する場所に置く。

| Skill | 出力 | 実体 |
|---|---|---|
| `sdd-specify` | `docs/specs/<feature>/requirements.md` | `.agents/skills/sdd-specify/SKILL.md` |
| `sdd-plan` | `docs/specs/<feature>/design.md` | `.agents/skills/sdd-plan/SKILL.md` |
| `sdd-tasks` | `docs/specs/<feature>/tasks.md` | `.agents/skills/sdd-tasks/SKILL.md` |
| `sdd-analyze` | なし(read-only整合性チェック、PASS/FAILレポートのみ) | `.agents/skills/sdd-analyze/SKILL.md` |

- `.agents/skills/sdd-*/SKILL.md`: canonical。
- `.claude/skills/sdd-*/SKILL.md`: Claude Code用の転送ファイル。本文はcanonical Skillを読む指示に留める。

`sdd-analyze`はまず `bash .agents/scripts/spec-check.sh` を実行する。これはレビュー未完了・要求ID(`REQ-001`等)の欠落・要求↔タスクのtraceability漏れ・タスクの`checks`フィールド欠落を機械的に検出し、これらが揃って初めてセマンティックな整合性確認へ進む。

## 参考文献

- AWS Kiro Docs: https://kiro.dev/docs/specs/ , https://kiro.dev/docs/steering/
- GitHub Spec Kit: https://github.com/github/spec-kit
- Anthropic Claude Code Best Practices: https://code.claude.com/docs/en/best-practices
- EARS: https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax
- Agent Skills open standard: https://agentskills.io/

詳細な対応関係は `.agents/harness/reference-implementation-mapping.md` を参照する。
