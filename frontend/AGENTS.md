# Frontend AGENTS

このディレクトリは、AI Coding AgentがReact実装の責務境界と検証方法を判断するためのreference implementationです。

## Standard stack

- React 19 + Vite + TypeScript
- shadcn/ui (`base-nova`, Base UI)
- Tailwind CSS v4
- Storybook + accessibility addon
- ESLint
- Prettier + Tailwind class sorting
- Vitest + Testing Library
- Playwright

## Responsibility boundaries

- `src/app/`: application shellとcomposition root。業務ロジックを置かない。
- `src/features/`: user-value単位のUI、state、feature logic。
- `src/components/ui/`: shadcn registryから追加したrepo-owned UI primitive。業務ロジック、HTTP、global application stateを持たせない。
- `src/components/common/`: featureをまたいで共有するapplication component。原則として `components/ui` を組み合わせる。
- `src/api/`: HTTP clientとrequest/response boundary。
- `src/lib/`: framework非依存の小さな共通utility。
- `src/styles/`: global styleとshadcn/Tailwind semantic token。
- `src/test/`: common test setup。
- `e2e/`: browser-visible behavior。

## shadcn / UI rules

1. UI primitiveを手書きする前に、shadcn registryに既存componentがないか確認する。
2. 既存componentがある場合は `npx shadcn@latest add <component>` で `src/components/ui/` に追加する。
3. `frontend/components.json` をshadcn配置・style・base設定のsource of truthとする。
4. color、radius、surface、foreground等は `src/styles/global.css` のsemantic tokenを使い、raw値をfeature側へ増殖させない。
5. built-in variantと既存componentのcompositionを優先し、似たprimitiveを再実装しない。
6. `components/ui` は外部packageのblack boxではなくrepo-owned source codeとして扱い、CLI追加・更新後はdiffをreviewする。
7. shadcn componentをproject固有に変更した場合、その重要variant/stateをStorybookで可視化し、振る舞いがある場合はtestを追加・更新する。
8. `components/common` の重要な共有状態もStorybookで確認可能にする。
9. Dialog等のaccessibility要件、semantic HTML、keyboard操作、accessible name、focusを壊さない。
10. community registryを利用する場合はregistryを明示し、出所不明のcomponentを無条件に追加しない。

## Implementation rules

- ComponentからDB、R2、server secret、Cloudflare bindingへ直接依存しない。
- API通信は `src/api/` またはfeature adapterを経由する。
- server response shapeをcomponent内で暗黙に再定義しない。
- stateはまずReact local stateとderived stateを使い、要件がない段階でstate libraryを追加しない。
- `useEffect` を万能な同期機構として使わない。
- 複雑な変換はpure functionまたはhookへ分離し、unit test可能にする。
- 新しいdependencyは既存stackで代替できない場合だけ追加する。
- formatterはstyle/diff収束、ESLintはcorrectness・危険pattern検出を担当する。

## Verification

変更内容に応じてrepository rootから次を実行する。

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
npm run build-storybook
npm run test:e2e
```

- `components/ui`、`components/common`、Storybookを変更したら `build-storybook` を通す。
- user-visible behaviorを変更したらPlaywright smoke/E2Eを更新する。
- unit testとPlaywright testは別runnerとして扱い、Vitestは `src/**` のみを探索する。
