# Verification Matrix

| 変更内容 | Format | Typecheck | Lint | Unit | Runtime | Data/Storage | Integration | E2E | Build |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| React component | ✓ | ✓ | ✓ | ✓ |  |  |  | ✓ | ✓ |
| API client | ✓ | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |
| Backend route | ✓ | ✓ | ✓ | ✓ | ✓ |  | ✓ | optional | ✓ |
| Service logic | ✓ | ✓ | ✓ | ✓ | optional |  | ✓ |  | ✓ |
| DB repository | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| DB migration | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ |  | ✓ |
| Object storage | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| API contract | ✓ | ✓ | ✓ | ✓ | ✓ | optional | ✓ | ✓ | ✓ |
| Runtime config | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ | smoke | ✓ |
| Auth/Authz | ✓ | ✓ | ✓ | ✓ | ✓ | optional | ✓ | ✓ | ✓ |
| Dependency update | ✓ | ✓ | ✓ | ✓ | ✓ | optional | ✓ | smoke | ✓ |

## Rules

- `optional` は変更内容に関係するときだけ必須。
- Formatは対象projectにformatter scriptがある場合に必須とする。Issue #7でprofileごとの必須scriptをfail-closed化する。
- DB / object storage に副作用がある機能では Integration test を省略しない。
- 主要フローは最低1本のE2Eを維持する。
- Frontend Design System / Storybook変更ではStorybook buildも実行する。
- バグ修正は再現テストを先に追加してから直す。
