# Verification Matrix

| 変更内容 | Format | Typecheck | Lint | JSDoc | Unit | Runtime | Data/Storage | Integration | E2E | Build |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| React component | ✓ | ✓ | ✓ | public export | ✓ |  |  |  | ✓ | ✓ |
| API client | ✓ | ✓ | ✓ | public export | ✓ |  |  | ✓ | ✓ | ✓ |
| Backend route | ✓ | ✓ | ✓ |  | ✓ | ✓ |  | ✓ | optional | ✓ |
| Service logic | ✓ | ✓ | ✓ |  | ✓ | optional |  | ✓ |  | ✓ |
| DB repository | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| DB migration | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| Object storage | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| API contract | ✓ | ✓ | ✓ | public export | ✓ | ✓ | optional | ✓ | ✓ | ✓ |
| Runtime config | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ | smoke | ✓ |
| Auth/Authz | ✓ | ✓ | ✓ | public export | ✓ | ✓ | optional | ✓ | ✓ | ✓ |
| Dependency update | ✓ | ✓ | ✓ |  | ✓ | ✓ | optional | ✓ | smoke | ✓ |

## Rules

- `optional` は変更内容に関係するときだけ必須。
- Formatは対象projectにformatter scriptがある場合に必須とする。Issue #7でprofileごとの必須scriptをfail-closed化する。
- JSDocはFrontendのexported public APIで必須。`npm run lint` がH068として機械的に検証する。
- test/story/E2Eおよび未変更のshadcn生成sourceはH068の必須対象外とする。
- DB / object storage に副作用がある機能では Integration test を省略しない。
- 主要フローは最低1本のE2Eを維持する。
- Frontend Design System / Storybook変更ではStorybook buildも実行する。
- バグ修正は再現テストを先に追加してから直す。
