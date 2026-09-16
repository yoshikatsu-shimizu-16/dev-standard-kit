# React + Hono + Cloudflare Example

このexampleは、`dev-standard-kit` を React + Hono + Cloudflare Workers + D1 + R2 構成へ適用するための参照例です。

## Apply these standards

共通:
- `AGENTS.md`
- `standards/ai-development-rules.md`
- `standards/definition-of-done.md`
- `harness/quality-gates.md`
- `harness/verification-matrix.md`
- `harness/task-contract-template.md`

技術別:
- `profiles/react/architecture-rules.md`
- `profiles/hono/architecture-rules.md`
- `profiles/cloudflare/workers-d1-r2-rules.md`

実行物:
- `scripts/harness-bootstrap.sh`
- `scripts/harness-verify.sh`
- `templates/github/harness-quality-gate.yml`

## Recommended project architecture

```text
src/
├─ client/
│  ├─ components/
│  ├─ features/
│  └─ api/
├─ server/
│  ├─ routes/
│  ├─ services/
│  ├─ repositories/
│  ├─ storage/
│  ├─ schemas/
│  └─ bindings.ts
└─ shared/
   ├─ types/
   └─ contracts/
```

## Recommended package scripts

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "test:worker": "vitest run --project worker",
    "test:integration": "vitest run --project integration",
    "test:e2e": "playwright test",
    "build": "vite build",
    "harness:verify": "bash scripts/harness-verify.sh"
  }
}
```

## Standard AI loop

1. `AGENTS.md` を読む。
2. Task Contract のDone条件を確認する。
3. 変更予定ファイルを特定する。
4. 最小変更で実装する。
5. 対応テストを追加する。
6. `npm run harness:verify` を実行する。
7. 失敗したら原因を直して再実行する。
8. 変更、検証結果、未検証事項を報告する。
