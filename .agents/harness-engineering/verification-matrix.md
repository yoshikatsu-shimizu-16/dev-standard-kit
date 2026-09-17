# Verification Matrix

| 変更内容 | Format | Typecheck | Lint | JSDoc | Unit | Runtime | Data/Storage | Integration | E2E | Build |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| React component | ✓ | ✓ | ✓ | public + top-level helper | ✓ |  |  |  | ✓ | ✓ |
| API client | ✓ | ✓ | ✓ | public + top-level helper | ✓ |  |  | ✓ | ✓ | ✓ |
| Backend route | ✓ | ✓ | ✓ | public + top-level helper | ✓ | ✓ |  | ✓ | optional | ✓ |
| Service logic | ✓ | ✓ | ✓ | public + top-level helper | ✓ | optional |  | ✓ |  | ✓ |
| DB repository | ✓ | ✓ | ✓ | public + top-level helper | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| DB migration | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| Object storage | ✓ | ✓ | ✓ | public + top-level helper | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| API contract | ✓ | ✓ | ✓ | public export | ✓ | ✓ | optional | ✓ | ✓ | ✓ |
| Runtime config | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ | smoke | ✓ |
| Auth/Authz | ✓ | ✓ | ✓ | public + top-level helper | ✓ | ✓ | optional | ✓ | ✓ | ✓ |
| Dependency update | ✓ | ✓ | ✓ |  | ✓ | ✓ | optional | ✓ | smoke | ✓ |

## Rules

- `optional` は変更内容に関係するときだけ必須。
- Formatは対象projectにformatter scriptがある場合に必須とする。Issue #7でprofileごとの必須scriptをfail-closed化する。
- exported public APIのJSDocは各workspaceの `npm run lint` がH068として機械的に検証する。
- トップレベルprivate helperの日本語JSDocとpublic-first配置はH069 `source-layout-check.mjs` が検証する。
- test/story/E2Eおよび `frontend/src/components/ui/` のshadcn生成sourceはH068/H069の必須対象外とする。
- DB / object storage に副作用がある機能では Integration test を省略しない。
- 主要フローは最低1本のE2Eを維持する。
- Frontend Design System / Storybook変更ではStorybook buildも実行する。
- バグ修正は再現テストを先に追加してから直す。
