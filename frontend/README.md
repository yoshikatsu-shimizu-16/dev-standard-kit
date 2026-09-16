# Frontend boilerplate

AI Coding Agentが今後のReact実装を判断するときのreference implementationです。

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

## Structure

```text
frontend/
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
├── vitest.config.ts
└── vite.config.ts
```

## Design intent

- `app` はcomposition root。
- `features` はユーザー価値単位。
- `components` は再利用可能な表示部品。
- `api` はHTTP境界。
- unit/component testは実装の近く、browser E2Eは `e2e/`。

Backendが追加されるまでは実APIへ接続しない。契約確定後に `src/api/` から接続する。
