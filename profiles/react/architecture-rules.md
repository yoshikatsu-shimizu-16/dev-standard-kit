# React Profile

## Scope
React + TypeScript + Vite を想定する。

## Rules
- Component は表示とUI interactionに集中させる。
- API通信は `api/` やclient層へ集約する。
- ComponentからDB、object storage、server secretへ直接依存しない。
- server responseのshapeをcomponent内で暗黙に再定義しない。
- 複雑な状態変換はpure functionまたはhookへ分離しunit test可能にする。
- UI変更は最低限のbrowser smokeまたは主要フローE2Eを持つ。
- accessibilityを壊す変更ではrole/label等の検証を追加する。

## Recommended checks
- TypeScript strict
- ESLint
- Vitest
- Testing Library
- Playwright
- Vite production build
