# Design: <feature>

> 出力元: `spec-driven-development/skills/plan/SKILL.md`
> 出力先: `docs/specs/<feature>/design.md`
> 入力: `docs/specs/<feature>/requirements.md`(レビュー済みであること)

## Architecture overview

この機能がどのレイヤー・コンポーネントに影響するか。`ARCHITECTURE.md`・
`profiles/<technology>/architecture-rules.md` との整合を確認する。

## Components / Modules

## Data model

変更するスキーマ・型・契約。

## Sequence

主要フローをステップで書く(必要ならASCII図)。

```text
Client -> Route -> Service -> Repository/Storage
```

## Requirements traceability

`requirements.md`の各項目がどう設計に反映されたかを対応付ける。

| Requirement | Design element |
|---|---|
| ... | ... |

## Risks / Alternatives considered

## Review

- [ ] レビュー済み(この状態になってから `tasks` スキルへ進む)
