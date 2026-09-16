# Frontend skills.sh references

Frontend boilerplateおよび今後のAI実装で参照する外部Skill候補。

外部Skillは便利だが、repository-owned rulesより優先しない。バージョンや内容が外部で変化するため、このstarterへ無条件にvendor copyせず、用途とsourceを記録する。

## Adopted references

### Vite

- skills.sh: https://www.skills.sh/antfu/skills/vite
- source: `antfu/skills`
- install:
  ```bash
  npx skills add https://github.com/antfu/skills --skill vite
  ```
- use for: Vite config、ESM、build/dev server、Vite固有機能

### React best practices

- skills.sh: https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
- source: `vercel-labs/agent-skills`
- install:
  ```bash
  npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
  ```
- use for: React component設計、render/performance、data flow、bundle hygiene

### TypeScript

- skills.sh: https://www.skills.sh/pproenca/dot-skills/typescript
- source: `pproenca/dot-skills`
- install:
  ```bash
  npx skills add https://github.com/pproenca/dot-skills --skill typescript
  ```
- use for: strict TypeScript、型境界、module設計

### Vitest

- skills.sh: https://www.skills.sh/pproenca/dot-skills/vitest
- source: `pproenca/dot-skills`
- install:
  ```bash
  npx skills add https://github.com/pproenca/dot-skills --skill vitest
  ```
- use for: unit/component test、mock、test isolation、flaky test回避

### Playwright

- skills.sh: https://www.skills.sh/currents-dev/playwright-best-practices-skill/playwright-best-practices
- source: `currents-dev/playwright-best-practices-skill`
- install:
  ```bash
  npx skills add https://github.com/currents-dev/playwright-best-practices-skill --skill playwright-best-practices
  ```
- use for: stable selector、browser smoke、E2E、trace/debug

## Not adopted by default

UIデザインSkillや状態管理ライブラリ固有Skillはstarterへ固定しない。プロジェクトごとにUI要件・状態の複雑さが違うため、必要になった時点で追加する。
