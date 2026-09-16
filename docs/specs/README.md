# docs/specs/

このディレクトリは**出力のみ**を置く。手法・EARS記法・skillsの説明は
`spec-driven-development/README.md` を見ること。

## 構造

```text
docs/specs/<feature-slug>/
├── requirements.md   # sdd-specify スキルの出力
├── design.md          # sdd-plan スキルの出力
├── tasks.md            # sdd-tasks スキルの出力
└── progress.md         # 実装中の進捗・決定・handoff
```

スキルの実体は `.agents/skills/sdd-*/SKILL.md`(Codex CLI等が自動発見)と
`.claude/skills/sdd-*/SKILL.md`(Claude Codeが自動発見)にある。
詳細は `spec-driven-development/README.md` の「Skills」節を参照。

`<feature-slug>`は機能を表す短いkebab-case名(例: `docs/specs/user-notifications/`)。

## 関連

- 手法: `spec-driven-development/README.md`
- プロジェクト全体の不可侵原則(1回だけ): `spec-driven-development/constitution.md`
- ユーザー可視の振る舞いを持たない複雑作業は `docs/exec-plans/` を使う
