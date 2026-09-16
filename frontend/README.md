# Frontend boilerplate

AI Coding Agentが今後のReact実装を判断するときのreference implementationです。

## Standard stack

- React + Vite + TypeScript
- Tailwind CSS v4
- Design System tokens / primitives
- Storybook
- ESLint
- Prettier + Tailwind class sorting
- Vitest + Testing Library
- Playwright

## Run

repository rootから:

```bash
npm install
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

VS Codeでは `.vscode/launch.json` から次をF5起動できる。

- `Frontend: Debug App in Chrome`
- `Frontend: Debug Storybook in Chrome`

## Structure

```text
frontend/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── AGENTS.md
├── SKILLS.md
├── e2e/
│   └── smoke.spec.ts
├── src/
│   ├── api/
│   │   └── httpClient.ts
│   ├── app/
│   │   ├── App.test.tsx
│   │   └── App.tsx
│   ├── components/
│   │   └── StatusCard.tsx
│   ├── design-system/
│   │   ├── README.md
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   ├── features/
│   │   └── starter/
│   │       └── StarterOverview.tsx
│   ├── styles/
│   │   └── global.css
│   ├── test/
│   │   └── setup.ts
│   └── main.tsx
├── eslint.config.js
├── playwright.config.ts
├── prettier.config.mjs
├── vitest.config.ts
└── vite.config.ts
```

## Design System boundary

- Tailwind v4 `@theme` in `src/styles/global.css` is the token source of truth.
- `src/design-system/` contains reusable visual primitives only.
- shared primitiveのvariantや状態を追加したらStorybook storyも更新する。
- feature固有UIは `features/`、一般的だがDesign System primitiveではない部品は `components/` に置く。
- tokenが存在する値をfeature側でraw colorや独自spacingとして増殖させない。

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

Backendが追加されるまでは実APIへ接続しない。契約確定後に `src/api/` から接続する。
