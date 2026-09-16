# Frontend boilerplate

AI Coding Agentが今後のReact実装を判断するときのreference implementationです。

## Standard stack

- React + Vite + TypeScript
- React Router 8 Data Mode
- shadcn/ui (`base-nova`, Base UI)
- Tailwind CSS v4
- Storybook
- ESLint
- Prettier + Tailwind class sorting
- Vitest + Testing Library
- Playwright

## Run

repository rootから:

```bash
npm ci
npm run dev
```

Frontend単体では:

```bash
npm run dev --workspace @dev-standard/frontend
```

Storybook:

```bash
npm run storybook
```

VS Codeでは `.vscode/launch.json` から次をF5起動できます。

- `Frontend: Debug App in Chrome`
- `Frontend: Debug Storybook in Chrome`

## Structure

```text
frontend/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── components.json
├── AGENTS.md
├── SKILLS.md
├── e2e/
│   └── smoke.spec.ts
├── src/
│   ├── api/
│   │   ├── httpClient.ts
│   │   └── httpClient.test.ts
│   ├── app/
│   │   ├── App.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── router.ts
│   │   ├── router.test.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── ui/                 # shadcnが生成するrepo-owned primitive
│   │   │   ├── button.tsx
│   │   │   ├── button.test.tsx
│   │   │   ├── button.stories.tsx
│   │   │   └── ...
│   │   └── common/             # application shared component
│   │       └── StatusCard.tsx
│   ├── features/
│   ├── lib/
│   │   └── utils.ts
│   ├── styles/
│   │   └── global.css
│   └── test/
│       └── setup.ts
├── eslint.config.js
├── playwright.config.ts
├── prettier.config.mjs
├── vitest.config.ts
└── vite.config.ts
```

## Routing architecture

既存ViteアプリへReact Routerの **Data Mode** を組み込んでいます。

- `src/app/routes.tsx`: route tableのsource of truth
- `src/app/router.ts`: `createBrowserRouter()` をReact tree外で1回だけ生成
- `src/app/App.tsx`: routed application shell。`Outlet`を描画
- `src/main.tsx`: `RouterProvider`をcomposition rootへ接続
- feature固有のroute UI: 原則 `src/features/` に置く

starterでは `/` とnot-found routeだけを持ちます。ダミー画面を増やすのではなく、実際のfeature追加時にrouteを増やします。

production hostingでは `/feature/123` のようなdeep linkを直接開いてもSPA entrypointへ到達できるfallback設定が必要です。Cloudflare側の具体設定はInfrastructure phaseで定義します。

## UI architecture

Design Systemは特定の `design-system/` directoryではなく、次の組み合わせとして扱います。

- `components.json`: shadcnのstyle/base/alias設定
- `src/styles/global.css`: semantic design token
- `src/components/ui/`: shadcnから追加したUI primitiveのsource code
- `src/components/common/`: primitiveを組み合わせたapplication shared UI
- Storybook: componentをapplicationから切り離して表示・確認するworkshop
- accessibility / test / formatter / lint rules

shadcn componentは外部packageとして隠蔽せず、source codeをrepository内で所有します。

## Add a UI component

まずshadcnに既存componentがあるか確認し、必要なものだけ追加します。

```bash
cd frontend
npx shadcn@latest add select
```

全部を先回りして追加しません。利用しないcomponentをstarterへ積み上げると、AIも人間も「存在するから使うべき」と誤解しやすくなるためです。

このstarterには基本例として `button`, `input`, `label`, `card`, `badge`, `alert`, `dialog`, `separator`, `skeleton`, `tooltip` を配置しています。

## Storybook boundary

- `*.stories.tsx` がStorybookで表示するcomponent/stateを定義します。
- shadcnから追加した未変更componentすべてにStoryを強制しません。
- project固有にcustomizeしたUIや重要な共有componentは、重要variant/stateのStoryを追加・更新します。
- `button.stories.tsx` と `StatusCard.stories.tsx` がreferenceです。

## Quality commands

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
npm run build-storybook
npm run test:e2e
```

Backendが追加されるまでは実APIへ接続しません。契約確定後に `src/api/` から接続します。
