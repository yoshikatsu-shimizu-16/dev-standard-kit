# Quality Gates

## Gate 0: Context
- `AGENTS.md`、関連standards、profile、Task Contractを確認する。
- 目的、Done条件、本番影響が不明なら実装前に整理する。

## Gate 1: Static
```bash
npm run typecheck
npm run lint
```

## Gate 2: Unit
```bash
npm run test
```

## Gate 3: Target Runtime
対象runtime固有テストを実行する。Cloudflareの場合は Workers Vitest integration を優先する。

## Gate 4: Data / Storage
DBやobject storageを変更した場合、migration・repository・storage integration testを実行する。

## Gate 5: Integration
HTTP等の実際の入口から代表フローを通す。

## Gate 6: Browser E2E
UI変更ではprimary flowと最低限のsmokeを実行する。

## Gate 7: Build
```bash
npm run build
```

## Gate 8: Diff
```bash
git diff --check
git status --short
```

確認項目:
- secretなし
- unrelated changeなし
- debug logなし
- skipped testなし
- migration改変なし

## Gate 9: Evidence
最終報告にchanged files、実行コマンド、PASS/FAIL、未検証事項を残す。
