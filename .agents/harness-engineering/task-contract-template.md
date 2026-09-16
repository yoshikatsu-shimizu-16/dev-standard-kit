# AI Task Contract Template

## Goal
何を実現するかを1〜3文で書く。

## User-visible behavior
ユーザーから見て何が変わるか。

## Scope
変更してよい範囲:
- `src/...`
- `tests/...`

## Out of scope
今回変更しないもの:
- ...

## Constraints
- `AGENTS.md` と関連profileに従う。
- production resourceを変更しない。
- existing contractを壊さない。
- migrationは追加のみ。

## Acceptance criteria
- [ ] ...
- [ ] ...

各項目はテストまたはコマンドで判定可能にする。

## Required verification
- [ ] typecheck
- [ ] lint
- [ ] unit
- [ ] runtime
- [ ] integration
- [ ] e2e
- [ ] build

不要なものは理由付きでN/Aにする。

## Approval boundaries
人間承認なしに実行しない操作:
- production migration
- production storage destructive operation
- secret change
- production deploy

## Completion report
```text
Result:
Changed:
Verification:
Unverified:
Risks:
```
