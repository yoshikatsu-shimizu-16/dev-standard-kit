# Frontend AGENTS

このディレクトリは、AI Coding AgentがReact実装の責務境界と検証方法を判断するためのreference implementationです。

## Standard stack

- React 19 + Vite + TypeScript
- React Router 8 Data Mode
- shadcn/ui (`base-nova`, Base UI)
- Tailwind CSS v4
- Storybook + accessibility addon
- ESLint + eslint-plugin-jsdoc
- Prettier + Tailwind class sorting
- Vitest + Testing Library
- Playwright

## Responsibility boundaries

- `src/app/`: application shell、router、route table、composition root。業務ロジックを置かない。
- `src/features/`: user-value単位のUI、state、feature logic。routeから表示する画面も原則feature側へ置く。
- `src/components/ui/`: shadcn registryから追加したrepo-owned UI primitive。業務ロジック、HTTP、global application stateを持たせない。
- `src/components/common/`: featureをまたいで共有するapplication component。原則として `components/ui` を組み合わせる。
- `src/api/`: HTTP clientとrequest/response boundary。
- `src/lib/`: framework非依存の小さな共通utility。
- `src/styles/`: global styleとshadcn/Tailwind semantic token。
- `src/test/`: common test setup。
- `e2e/`: browser-visible behavior。

## Routing rules

1. 標準routingは React Router Data Mode とする。
2. browser routerは `src/app/router.ts` でReact treeの外に1回だけ生成し、React stateやcomponent render中に作成しない。
3. route tableは `src/app/routes.tsx` に集約する。feature component側で独立したBrowserRouterを作らない。
4. routeから表示する画面・feature UIは原則 `src/features/` に置き、`src/app/` はroute wiringとshellに集中する。
5. application内部のnavigationは `Link` / `NavLink` / `useNavigate` 等のReact Router APIを使い、通常の内部遷移で `window.location` を使わない。
6. URLで表現すべき状態はpath parameter / search parameterを優先し、同じ状態をglobal stateへ重複保持しない。
7. loader / actionはroute単位でdata loadingやmutationを扱う価値がある場合に導入する。HTTP実装そのものは `src/api/` 等の境界を再利用する。
8. 新しいrouteを追加したら、少なくともroute resolutionのunit testか主要導線のPlaywright testを更新する。
9. `createBrowserRouter` を使うため、production hostingではdeep linkをSPA entrypointへfallbackできる構成を必須とする。Cloudflare側の具体設定はInfrastructure phaseで管理する。

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

## Documentation rules

1. exported function / React component / hook / class、およびexportされたtype / interface / enumにはJSDocを付ける。
2. JSDocは型の言い換えではなく、契約、制約、副作用、例外、設計上の役割など「コードだけでは分かりにくい意味」を書く。
3. TypeScriptが表現している型を `{string}` や `{Promise<Foo>}` のようにJSDocへ重複記述しない。
4. 空のJSDoc blockは禁止する。形式だけ満たすコメントを作らない。
5. private helper、inline callback、test、story、E2Eは必須対象にしない。
6. `src/components/ui/` のshadcn生成sourceは必須対象から除外する。project固有にcustomizeした意味や制約がある場合は必要に応じて説明を追加する。
7. このルールは `eslint-plugin-jsdoc` の `jsdoc/require-jsdoc` をerrorとして実行し、`npm run lint` / Harness Verify / CIで機械的に強制する。

## Implementation rules

- ComponentからDB、R2、server secret、Cloudflare bindingへ直接依存しない。
- API通信は `src/api/` またはfeature adapterを経由する。
- server response shapeをcomponent内で暗黙に再定義しない。
- stateはまずReact local stateとderived stateを使い、要件がない段階でstate libraryを追加しない。
- `useEffect` を万能な同期機構として使わない。
- 複雑な変換はpure functionまたはhookへ分離し、unit test可能にする。
- 新しいdependencyは既存stackで代替できない場合だけ追加する。
- formatterはstyle/diff収束、ESLintはcorrectness・危険pattern・公開APIのJSDoc gateを担当する。

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

- exported public APIを変更したらJSDocを同期し、`npm run lint` を通す。
- routingを変更したらroute resolution testを更新し、user-visibleな導線ならPlaywrightも更新する。
- `components/ui`、`components/common`、Storybookを変更したら `build-storybook` を通す。
- user-visible behaviorを変更したらPlaywright smoke/E2Eを更新する。
- unit testとPlaywright testは別runnerとして扱い、Vitestは `src/**` のみを探索する。
