# H070 Agent Stop Hook Enforcement

## Purpose

AI Coding AgentがMarkdown上の完了手順を読み飛ばしても、作業終了時に必ずrepository-owned Harnessを通す。

品質ルールそのものはCodex / Claude Code固有Hookへ複製せず、共通の `npm run harness:verify` をsource of truthとする。

## Flow

```text
Claude Code Stop ─┐
                  ├─> .agents/scripts/agent-stop-harness.mjs
Codex Stop ───────┘                 │
                                    ▼
                           npm run harness:verify
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
                       PASS                  FAIL
                         │                     │
                    stopを許可          exit code 2
                                               │
                                               ▼
                                  agentへ失敗を返して継続
```

## Repository configuration

Claude Code:

- `.claude/settings.json`
- `Stop` command hookから共通scriptを呼ぶ

Codex:

- `.codex/config.toml` でlifecycle hooksを有効化する
- `.codex/hooks.json`
- `Stop` command hookから共通scriptを呼ぶ

共通実装:

- `.agents/scripts/agent-stop-harness.mjs`
- repository rootで `npm run harness:verify` を実行する
- PASS時はexit code 0
- FAIL / timeout / command error時はexit code 2
- failure outputの末尾をagentへ返し、修正と再検証を促す

## Why Hook + CI

Hookはagentが「完了」と判断する直前のlocal feedback loopを閉じる。
GitHub ActionsはHookの有効化・trust・client差異に依存しない最終gateとして残す。

```text
Agent Stop Hook = 早期強制 / 自己修正loop
GitHub Actions   = 最終強制 / merge前の独立検証
```

Hookだけを唯一の品質境界にはしない。

## Trust and bypass boundaries

### Codex

repo-local hookはprojectの `.codex/` layerがtrustedな場合だけ読み込まれる。
また、新規または変更されたcommand hookはCodex側でdefinitionをreview / trustする必要がある。
初回は `/hooks` で `.codex/hooks.json` を確認してtrustする。

### Claude Code

project hookは `.claude/settings.json` から読み込まれる。
`/hooks` でStop hookが認識されていることを確認できる。

ユーザー設定・managed policy・client起動条件によってHook自体を無効化できる可能性はあるため、GitHub Actionsの `npm run harness:verify` を削除してはならない。

## Operational rule

- AIへの自然言語指示だけで `harness:verify` 実行を保証しない。
- Claude Code / CodexではStop Hookをcompletion gateとして利用する。
- Hookから個別のlint/testを直接並べず、必ずrepository-owned orchestratorを呼ぶ。
- `harness:verify` が失敗した状態で完了報告しない。
- Hookの設定変更もHarness対象とし、設定ファイルや共通scriptの欠落をknowledge-base checkで検出する。

## References

- Claude Code Hooks: https://code.claude.com/docs/en/hooks
- Claude Code Hooks guide: https://code.claude.com/docs/en/hooks-guide
- Codex Hooks: https://learn.chatgpt.com/codex/hooks
