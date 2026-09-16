# Execution Plans

複数ファイル・複数工程にまたがる作業では、実装前にexecution planを作成し、進捗と判断をリポジトリに残す。

## Use when

- 30分以上かかる見込みの変更
- migration / architecture変更
- 複数セッションにまたがる可能性がある
- agent間・人間とのhandoffが必要
- **ただし、ユーザー可視の振る舞いやAPI/データ契約の変更を伴う機能追加は
  `spec-driven-development/`(→`docs/specs/<feature>/`)を使う。** exec-plansは
  リファクタ・依存更新・infra変更など、ユーザー向けの振る舞いを持たない複雑作業に限定する。

## Required sections

- Goal
- Scope / Out of scope
- Acceptance criteria
- Plan
- Progress
- Decisions
- Verification
- Risks
- Handoff

小さな変更では重いplanを強制しない。大きさに応じて使い分ける。

参考: OpenAI Harness Engineering
https://openai.com/index/harness-engineering/
