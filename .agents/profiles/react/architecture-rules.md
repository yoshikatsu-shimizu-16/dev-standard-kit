# React Profile

## Scope

React + TypeScript + Vite を想定する。
標準boilerplateでは React Router Data Mode、shadcn/ui (Base UI)、Tailwind CSS v4、Storybook、Prettier を利用する。

## Rules

- Componentは表示とUI interactionに集中させる。
- application routingはReact Router Data Modeを標準とし、browser routerはReact tree外で1回だけ生成する。
- route tableはapplication shell側へ集約し、feature側で独立したBrowserRouterを作らない。
- routeから表示するfeature UIは `features/` に置き、`app/` はrouting/compositionに集中する。
- internal navigationはReact Router APIを使い、通常のSPA遷移で `window.location` を使わない。
- URLで表現すべき状態はpath/search parameterを優先し、同じ状態をglobal stateへ重複保持しない。
- BrowserRouter系のproduction hostingではdeep linkをSPA entrypointへfallbackできることを確認する。
- API通信は `api/` やclient層へ集約する。
- ComponentからDB、object storage、server secretへ直接依存しない。
- server responseのshapeをcomponent内で暗黙に再定義しない。
- 複雑な状態変換はpure functionまたはhookへ分離しunit test可能にする。
- exported function / component / hook / class / type / interface / enumにはJSDocを付け、契約・制約・副作用・例外・役割を記述する。
- TypeScript型をJSDocへ重複記述しない。空JSDoc blockは禁止する。
- JSDoc必須ルールはESLintでerrorとして強制し、test/story/E2Eと未変更のshadcn生成sourceは対象外とする。
- UI primitiveはまずshadcn registryを確認し、既存componentがあれば `components/ui/` へsourceとして追加する。
- `components/ui/` はrepo-owned primitive、`components/common/` はapp shared composite、`features/` はfeature固有UIとして責務を分ける。
- `components.json` とglobal CSSのsemantic tokenをUIのsource of truthにする。
- tokenが存在する値をraw color / spacing / radius / shadowとして無秩序に増やさない。
- shadcn componentをproject固有に変更した場合は重要variant/stateをStorybookで可視化し、必要なtestを更新する。
- 重要なshared/feature componentもStorybookでisolated確認できるようにする。
- UI変更は最低限のbrowser smokeまたは主要フローE2Eを持つ。
- routing変更はroute resolution testを持ち、主要導線ならPlaywrightでも確認する。
- accessibilityを壊す変更ではrole/label/focus/keyboard操作等の検証を追加する。
- formatterとlintを分離し、style差分はformatterで機械的に収束させる。

## Recommended checks

- Prettier format check
- TypeScript strict
- ESLint + public API JSDoc gate
- Vitest
- Testing Library
- Storybook build
- Playwright
- Vite production build
