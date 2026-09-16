# React + Hono + Cloudflare Reference

このreferenceは、`dev-standard-kit` を React + Hono + Cloudflare Workers + D1 + R2 構成へ適用する際のAI向け参考資料です。

実際のapplication scaffoldは `frontend/`・`backend/`・`infrastructure/` に置きます。このディレクトリはruntime codeのsource of truthではありません。

## Apply these standards

共通:
- `AGENTS.md`
- `.agents/standards/ai-development-rules.md`
- `.agents/standards/definition-of-done.md`
- `.agents/harness-engineering/quality-gates.md`
- `.agents/harness-engineering/verification-matrix.md`
- `.agents/harness-engineering/task-contract-template.md`
- `.agents/sdd/`（ユーザー可視の機能追加）
- `.agents/loop-engineering/`（長時間・自律実行）

技術別:
- `.agents/profiles/react/architecture-rules.md`
- `.agents/profiles/hono/architecture-rules.md`
- `.agents/profiles/cloudflare/workers-d1-r2-rules.md`

実行物:
- `.agents/scripts/harness-bootstrap.sh`
- `.agents/scripts/harness-verify.sh`
- `.agents/templates/github/harness-quality-gate.yml`

## Recommended project architecture

```text
frontend/
├── src/
│   ├── components/
│   ├── features/
│   └── api/
└── tests/

backend/
├── src/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── storage/
│   └── schemas/
└── tests/

infrastructure/
├── migrations/
├── wrangler configuration
└── environment / binding definitions
```

frontend/backend間で共有するcontractの配置方法は、実際のscaffoldを追加するIssueで決定する。

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
    "harness:verify": "bash .agents/scripts/harness-verify.sh"
  }
}
```

## Standard AI loop

1. `AGENTS.md` を読む。
2. ユーザー可視の機能追加は `.agents/skills/sdd-specify/SKILL.md` から始め、`docs/specs/<feature>/requirements.md` → `design.md` → `tasks.md` を作る。
3. 変更予定領域（frontend / backend / infrastructure）を特定する。
4. 最小変更で実装する。
5. 対応テストを追加する。
6. `npm run harness:verify` または `bash .agents/scripts/harness-verify.sh` を実行する。
7. 失敗したら原因を直して再実行する。
8. 変更、検証結果、未検証事項を報告する。
