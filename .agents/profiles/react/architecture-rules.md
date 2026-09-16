# React Profile

## Scope

React + TypeScript + Vite を想定する。
標準boilerplateでは shadcn/ui (Base UI)、Tailwind CSS v4、Storybook、Prettier を利用する。

## Rules

- Componentは表示とUI interactionに集中させる。
- API通信は `api/` やclient層へ集約する。
- ComponentからDB、object storage、server secretへ直接依存しない。
- server responseのshapeをcomponent内で暗黙に再定義しない。
- 複雑な状態変換はpure functionまたはhookへ分離しunit test可能にする。
- UI primitiveはまずshadcn registryを確認し、既存componentがあれば `components/ui/` へsourceとして追加する。
- `components/ui/` はrepo-owned primitive、`components/common/` はapp shared composite、`features/` はfeature固有UIとして責務を分ける。
- `components.json` とglobal CSSのsemantic tokenをUIのsource of truthにする。
- tokenが存在する値をraw color / spacing / radius / shadowとして無秩序に増やさない。
- shadcn componentをproject固有に変更した場合は重要variant/stateをStorybookで可視化し、必要なtestを更新する。
- 重要なshared/feature componentもStorybookでisolated確認できるようにする。
- UI変更は最低限のbrowser smokeまたは主要フローE2Eを持つ。
- accessibilityを壊す変更ではrole/label/focus/keyboard操作等の検証を追加する。
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
