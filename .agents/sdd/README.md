# Spec-Driven Development (SDD)

## Purpose

コードではなく、specを実装のsource of truthにする。
仕様をコードより先に書き、version管理し、実装前にreview・整合性チェックを通してから
コードを生成する。

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

「requirements・design・tasksを機能ごとに繰り返す」というSDDの見た目だけを見ると、
従来のシステム開発(要件定義→基本設計→詳細設計→実装→単体テスト→結合テスト→総合テスト→UAT)
と噛み合わないように見える。実際にはAWS Kiro(`steering` vs `specs`)・GitHub Spec Kit
(`constitution` vs `specify/plan/tasks`)ともに、**プロジェクトに1回だけ作る層**と
**機能ごとに繰り返す層**を明示的に分けている。このkitでも同じ2階層を採用する。

| V字モデルの工程 | このkitでの対応 | 頻度 |
|---|---|---|
| 要件定義・基本設計 | `spec-driven-development/constitution.md` | プロジェクトに1回、以後は改訂のみ |
| 詳細設計〜実装計画 | `docs/specs/<feature>/{requirements,design,tasks}.md` | 機能(feature)ごとに繰り返す |
| 実装 | 通常の実装作業(1タスク単位は`harness/task-contract-template.md`を併用) | tasks.mdの各項目ごと |
| 単体テスト | `harness/quality-gates.md` Gate 1-2。requirements.mdのacceptance criteria(EARS)をテストへ変換する | tasksの実装ごと |
| 結合・総合テスト | `harness/quality-gates.md` Gate 3-7、`harness/verification-matrix.md` | 機能ごと |
| UAT | 人間によるビジネス受け入れレビュー(`standards/ai-development-rules.md`の承認境界、`analyze`ゲートの先) | 機能ごと、人間判断 |

**SDDは新しいテスト工程を定義しない。** 単体〜UATは既存の`harness/quality-gates.md`・
`harness/verification-matrix.md`がそのまま担当する。SDDが追加するのは、詳細設計〜実装計画を
機能単位で高速に(ウォーターフォールの数ヶ月ではなく数分〜数時間で)回すための型と、
実装前に仕様の整合性を確認するゲートだけである。

参考(このSDD=ウォーターフォールではないか、という論点):
- https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html
- https://brooker.co.za/blog/2026/04/09/waterfall-vs-spec.html
- https://yuvalyeret.com/blog/spec-driven-development-isnt-waterfall-unless-youre-using-it-that-way/

## EARS記法 早見表

requirements.mdの各要求は、曖昧な自然文ではなく EARS
(Easy Approach to Requirements Syntax, Mavin et al., IEEE RE'09) で書く。
参考: https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax

| パターン | 構文 |
|---|---|
| Ubiquitous(常時) | THE SYSTEM SHALL \<response\> |
| Event-Driven(イベント駆動) | WHEN \<trigger\> THE SYSTEM SHALL \<response\> |
| State-Driven(状態駆動) | WHILE \<state\> THE SYSTEM SHALL \<response\> |
| Unwanted Behavior(異常系) | IF \<condition\> THEN THE SYSTEM SHALL \<response\> |
| Optional Feature(任意機能) | WHERE \<feature is present\> THE SYSTEM SHALL \<response\> |

## ディレクトリ規約

- `spec-driven-development/`: 手法そのもの(このディレクトリ)。constitution・templatesと、
  このREADMEを持つ。スキルの実体は含まない(下記「Skills」参照)。
- `docs/specs/<feature>/`: 実行結果(specify/plan/tasksの出力先)。1機能につき1ディレクトリ。

## 既存の仕組みとの役割分担

| 仕組み | 用途 |
|---|---|
| `harness/task-contract-template.md` | 単一セッションで完結する小タスク。`tasks.md`の1項目を実装する単位にも使う |
| `docs/exec-plans/` | ユーザー可視の振る舞いを持たない複雑作業(リファクタ・依存更新・infra変更) |
| `spec-driven-development/`(→`docs/specs/`) | ユーザー可視の振る舞いや契約変更を伴う機能追加 |

## Skills

スキルは[Agent Skills open standard](https://agentskills.io/)(Anthropicが2025年12月に
公開し、Codex CLI・Cursor・GitHub Copilot等が採用したcross-agentなSKILL.md形式)に従う。
このkit独自の場所には置かず、各agentが実際に自動発見する場所に実体を置く。

| Skill | 出力 | 実体 |
|---|---|---|
| `sdd-specify` | `docs/specs/<feature>/requirements.md` | `.agents/skills/sdd-specify/SKILL.md` |
| `sdd-plan` | `docs/specs/<feature>/design.md` | `.agents/skills/sdd-plan/SKILL.md` |
| `sdd-tasks` | `docs/specs/<feature>/tasks.md` | `.agents/skills/sdd-tasks/SKILL.md` |
| `sdd-analyze` | なし(read-only整合性チェック、PASS/FAILレポートのみ) | `.agents/skills/sdd-analyze/SKILL.md` |

- `.agents/skills/sdd-*/SKILL.md`: 実体(canonical)。Codex CLI等、`.agents/skills/`を
  スキャンするagentはここから自動発見する。
- `.claude/skills/sdd-*/SKILL.md`: Claude Code用の転送ファイル。frontmatterの
  `name`/`description`は実体と同一にしてClaude Codeの発見・起動判定を機能させ、
  本文は「`.agents/skills/sdd-*/SKILL.md`を読んで従え」という指示のみを持つ
  (内容を2箇所で二重管理しないため)。Claude Codeは`.agents/skills/`をまだ
  自動スキャンしないため、この転送ファイルが必要。

新しいagent実行環境固有のskillディレクトリが増えた場合は、同様の転送ファイルを追加する。

`sdd-analyze`はまず `bash scripts/spec-check.sh` を実行する。これはレビュー未完了・
要求ID(`REQ-001`等)の欠落・要求↔タスクのtraceability漏れ・タスクの`checks`フィールド
欠落を機械的に検出し、これらが揃って初めてセマンティックな整合性確認へ進む。

## 参考文献

- AWS Kiro Docs: https://kiro.dev/docs/specs/ , https://kiro.dev/docs/steering/
- GitHub Spec Kit: https://github.com/github/spec-kit , https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- Anthropic Claude Code Best Practices: https://code.claude.com/docs/en/best-practices
- EARS: https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax
- Agent Skills open standard: https://agentskills.io/

詳細な対応関係は `harness/reference-implementation-mapping.md` を参照する。
