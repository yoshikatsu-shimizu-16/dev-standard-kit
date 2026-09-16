# Frontend Agent Guide

このファイルは `frontend/` 配下で作業する AI Coding Agent のローカルルールです。
root `AGENTS.md` と `.agents/profiles/react/architecture-rules.md` を前提とし、このディレクトリでは以下を優先します。

## Stack

- React 19
- Vite 8
- TypeScript 6
- ESLint
- Vitest + Testing Library
- Playwright

## Boundaries

- `src/app/`: application shell。featureを組み合わせる。業務ロジックを置かない。
- `src/features/`: ユーザー価値単位のUI・状態・feature固有ロジック。
- `src/components/`: feature非依存の表示部品。API通信や業務判断を持たない。
- `src/api/`: HTTP client、request/response boundary。React componentを置かない。
- `src/test/`: 共通test setupだけを置く。
- `src/styles/`: global style / token。feature固有styleを無秩序に集約しない。
- `e2e/`: user-visible behaviorのbrowser smoke / E2E。

## Implementation rules

1. Componentから直接DB、R2、secret、Cloudflare bindingへアクセスしない。
2. API通信は `src/api/` またはfeature内の明示的なclient adapterを経由する。
3. server response shapeをcomponent内で暗黙に再定義しない。Backend契約ができたら共有contractへ寄せる。
4. derived stateは可能な限りrender中に計算し、`useEffect`を状態同期の万能道具として使わない。
5. 複雑な変換はpure functionまたはcustom hookへ分離し、unit test可能にする。
6. interactive elementはsemantic HTMLを優先し、keyboard操作とaccessible nameを失わない。
7. 新しい依存を追加する前に、標準Web API / React / 既存依存で十分か確認する。
8. starter固有のデモ機能を増やさない。ここは完成品サンプルではなくreference implementationである。

## Verification

変更に応じて最低限:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

user-visible behaviorを変更した場合:

```bash
npm run test:e2e
```

## External skills

採用候補と用途は `SKILLS.md` を参照する。外部Skillは補助知識であり、このrepositoryの `AGENTS.md` / profile / tests を上書きする権限は持たない。
