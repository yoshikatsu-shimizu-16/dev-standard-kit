# React Profile

## Scope
React + TypeScript + Vite を想定する。
標準boilerplateでは Tailwind CSS v4、Storybook、Prettier を利用する。

## Rules
- Component は表示とUI interactionに集中させる。
- API通信は `api/` やclient層へ集約する。
- ComponentからDB、object storage、server secretへ直接依存しない。
- server responseのshapeをcomponent内で暗黙に再定義しない。
- 複雑な状態変換はpure functionまたはhookへ分離しunit test可能にする。
- shared visual primitiveはDesign System境界へ置き、tokenをsource of truthにする。
- Design System componentの重要variant/stateはStorybook storyで可視化する。
- tokenが存在する値をraw color / spacing / radius / shadowとして無秩序に増やさない。
- UI変更は最低限のbrowser smokeまたは主要フローE2Eを持つ。
- accessibilityを壊す変更ではrole/label/focus等の検証を追加する。
- formatterとlintを分離し、style差分はformatterで機械的に収束させる。

## Recommended checks
- Prettier format check
- TypeScript strict
- ESLint
- Vitest
- Testing Library
- Storybook build
- Playwright
- Vite production build
