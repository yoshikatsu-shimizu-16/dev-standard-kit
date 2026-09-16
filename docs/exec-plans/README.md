# Execution Plans

複数ファイル・複数工程にまたがる作業では、実装前にexecution planを作成し、進捗と判断をリポジトリに残す。

## Use when

- 30分以上かかる見込みの変更
- migration / API contract / architecture変更
- 複数セッションにまたがる可能性がある
- agent間・人間とのhandoffが必要

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
