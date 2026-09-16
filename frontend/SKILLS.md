# Frontend skills / references

Frontend boilerplateおよび今後のAI実装で参照する外部知識を記録します。

外部Skillは便利ですが、repository-owned rulesより優先しません。バージョンや内容が外部で変化するため、このstarterへ無条件にvendor copyせず、用途とsourceを記録します。

## Adopted skills.sh references

### Vite

- skills.sh: https://www.skills.sh/antfu/skills/vite
- source: `antfu/skills`
- use for: Vite config、ESM、build/dev server、Vite固有機能

### React best practices

- skills.sh: https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
- source: `vercel-labs/agent-skills`
- use for: React component設計、render/performance、data flow、bundle hygiene

### React Router

- skills.sh: https://www.skills.sh/remix-run/react-router/react-router
- source: `remix-run/react-router`
- mode-specificな公式skill。変更前にDeclarative / Data / Framework modeを識別するために使う。
- Data Mode: https://www.skills.sh/remix-run/agent-skills/react-router-data-mode
- use for: `createBrowserRouter`、`RouterProvider`、route table、loader/action、navigation、route testing
- project decision: このstarterは既存Vite SPAへ組み込むため **Data Mode** を標準とする。Framework Modeへ暗黙に移行しない。

### Tailwind design system

- skills.sh: https://www.skills.sh/wshobson/agents/tailwind-design-system
- source: `wshobson/agents`
- use for: Tailwind CSS v4、CSS-first theme、design token、component variant、responsive/accessibility pattern

### Web design guidelines

- skills.sh: https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines
- source: `vercel-labs/agent-skills`
- use for: spacing、typography、interaction、accessibilityのUI review

### Frontend design

- skills.sh: https://www.skills.sh/anthropics/skills/frontend-design
- source: `anthropics/skills`
- use for: product contextからvisual directionを決め、genericなAI UIへ収束するのを防ぐ

### Extract design system

- skills.sh: https://www.skills.sh/arvindrk/extract-design-system/extract-design-system
- source: `arvindrk/extract-design-system`
- use for: 既存サイトを参考にする案件でcolor / typography / spacing / radius / shadow tokenを抽出するとき
- note: 新規projectでは常用せず、既存デザイン資産がある場合に使う

### TypeScript

- skills.sh: https://www.skills.sh/pproenca/dot-skills/typescript
- source: `pproenca/dot-skills`
- use for: strict TypeScript、型境界、module設計

### Vitest

- skills.sh: https://www.skills.sh/pproenca/dot-skills/vitest
- source: `pproenca/dot-skills`
- use for: unit/component test、mock、test isolation、flaky test回避

### Playwright

- skills.sh: https://www.skills.sh/currents-dev/playwright-best-practices-skill/playwright-best-practices
- source: `currents-dev/playwright-best-practices-skill`
- use for: stable selector、browser smoke、E2E、trace/debug

## React Router official docs

React Routerはinstalled major versionとmodeでAPIの前提が変わるため、公式docsをsource of truthとして使います。

- installation / Data Mode: https://reactrouter.com/start/data/installation
- custom framework / client rendering: https://reactrouter.com/start/data/custom
- RouterProvider: https://reactrouter.com/api/data-routers/RouterProvider

このstarterでは `createBrowserRouter` をReact tree外で1回だけ生成し、`RouterProvider` をcomposition rootに置きます。route wiringは `src/app/` に閉じ、feature UIは `src/features/` に置きます。

## shadcn/ui

shadcnは公式CLI・公式registryをsource of truthとして使います。

- docs: https://ui.shadcn.com/docs
- Vite installation: https://ui.shadcn.com/docs/installation/vite
- components.json: https://ui.shadcn.com/docs/components-json
- CLI: https://ui.shadcn.com/docs/cli

このstarterでは `base-nova` / Base UIを採用し、`frontend/components.json` に設定を固定します。AIは手書きprimitiveより既存shadcn componentを優先し、CLI追加後のsource diffをreviewします。

## Storybook

Storybookは公式React+Vite / accessibilityドキュメントをsource of truthとして使います。

- React + Vite framework: https://storybook.js.org/docs/get-started/frameworks/react-vite
- accessibility testing: https://storybook.js.org/docs/writing-tests/accessibility-testing

StorybookはDesign System専用ではありません。`components/ui`、`components/common`、必要に応じてfeature componentもapplicationから切り離して確認します。
