# Quality Gates

## Gate 0: Context
- `AGENTS.md`、関連する`.agents/standards/`、`.agents/profiles/`、Task Contractを確認する。
- 目的、Done条件、本番影響が不明なら実装前に整理する。
- spec駆動の機能追加では `bash .agents/scripts/spec-check.sh` を実行し、
  `docs/specs/<feature>/`のrequirements/design/tasksがレビュー済みで、要求IDの
  traceabilityとtaskごとの`checks`フィールドが揃っていることを機械的に確認した上で、
  `sdd-analyze`スキル(実体: `.agents/skills/sdd-analyze/SKILL.md`)のセマンティックな
  整合性チェックを行う。

## Gate 1: Static
```bash
npm run format:check
npm run typecheck
npm run lint
```

formatterはcode styleと不要diffを機械的に収束させる。lintはcode correctnessや危険なpatternに加え、FrontendではH068 `public-api-jsdoc` として公開APIのJSDoc存在を検証する。JSDoc不足はlint failureとして扱い、Harness VerifyとCIを通過させない。

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

Frontend Design System / Storybookを変更した場合は `npm run build-storybook` も実行する。

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
- exported public APIのJSDocが実装と同期している
- spec駆動の機能追加では、`docs/specs/<feature>/`のドキュメントが実装内容と同期している

## Gate 9: Evidence
最終報告にchanged files、実行コマンド、PASS/FAIL、未検証事項を残す。
