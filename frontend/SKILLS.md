# Frontend skills.sh references

Frontend boilerplateおよび今後のAI実装で参照する外部Skill候補。

外部Skillは便利だが、repository-owned rulesより優先しない。バージョンや内容が外部で変化するため、このstarterへ無条件にvendor copyせず、用途とsourceを記録する。

## Adopted references

### Vite

- skills.sh: https://www.skills.sh/antfu/skills/vite
- source: `antfu/skills`
- use for: Vite config、ESM、build/dev server、Vite固有機能

### React best practices

- skills.sh: https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
- source: `vercel-labs/agent-skills`
- use for: React component設計、render/performance、data flow、bundle hygiene

### Tailwind design system

- skills.sh: https://www.skills.sh/wshobson/agents/tailwind-design-system
- source: `wshobson/agents`
- use for: Tailwind CSS v4、CSS-first `@theme`、design token、component variant、responsive/accessibility pattern

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

## Storybook

Storybookは現時点では外部Skillより公式React+Viteドキュメントをsource of truthとして使う。

- React + Vite framework: https://storybook.js.org/docs/get-started/frameworks/react-vite
- accessibility testing: https://storybook.js.org/docs/writing-tests/accessibility-testing

Design System componentはStorybook storyを持ち、variantと重要状態をisolated UIで確認できるようにする。
