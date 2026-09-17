# H070 Agent Stop Hook Enforcement

## Purpose

AI Coding AgentがMarkdown上の完了手順を読み飛ばしても、作業終了時に必ずrepository-owned Harnessを通す。

品質ルールそのものはCodex / Claude Code固有Hookへ複製せず、**`npm run harness:verify` を唯一の公開入口**とする。

## Flow

```text
Claude Code Stop ─┐
                  ├─> npm run harness:verify -- --hook
Codex Stop ───────┘                  │
                                     ▼
                .agents/scripts/harness/harness-verify-orchestrator.sh
                                     │
                         ┌───────────┴───────────┐
                         ▼                       ▼
                       PASS                    FAIL
                         │                       │
                    stopを許可             exit code 2
                                                 │
                                                 ▼
                                    agentへ失敗を返して継続
```

## Why `--hook` exists

通常のshell / CIでは検証失敗を一般的なnon-zero statusとして扱えばよい。
一方、Claude Code / CodexのStop Hookは **exit code 2** を「停止をブロックしてAgentへフィードバックする失敗」として扱う。

Stop専用のstatus変換アダプターは公開入口が2つあるように見えて責務が分かりにくいため、配置しない。
現在は `harness-verify-orchestrator.sh --hook` が同じ検証を実行し、失敗statusだけをHook向けに2へ変換する。

つまり `--hook` は別Harnessではなく、**同じオーケストレーターの実行モード**である。

## Repository configuration

Claude Code:

- `.claude/settings.json`
- `Stop` command hookから `npm run harness:verify -- --hook` を呼ぶ

Codex:

- `.codex/config.toml` でlifecycle hooksを有効化する
- `.codex/hooks.json`
- `Stop` command hookから `npm run harness:verify -- --hook` を呼ぶ

Harness scripts:

```text
.agents/scripts/
└── harness/
    ├── harness-verify-orchestrator.sh # 唯一の公開入口 / orchestrator
    ├── checks/                 # 内部checker
    │   ├── knowledge-base-check.sh
    │   ├── spec-check.sh
    │   └── source-layout-check.mjs
    └── setup/                  # 内部setup helper
        └── bootstrap.sh
```

`.agents/scripts/` 直下へscriptを置かない。
`harness/` 直下のfileも `harness-verify-orchestrator.sh` だけとし、内部実装はsubdirectoryへ分ける。

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
- Harnessの公開入口は `npm run harness:verify` だけにする。
- Claude Code / Codexでは `--hook` modeをcompletion gateとして利用する。
- Hookから個別lint/test/internal checkerを直接呼ばない。
- internal checkerは `harness-verify-orchestrator.sh` からのみorchestrationする。
- `harness:verify` が失敗した状態で完了報告しない。
- Hook設定・script hierarchyもHarness対象として機械検証する。

## References

- Claude Code Hooks: https://code.claude.com/docs/en/hooks
- Claude Code Hooks guide: https://code.claude.com/docs/en/hooks-guide
- Codex Hooks: https://learn.chatgpt.com/codex/hooks
