# Loop Contract: <project or long-running task>

> このファイルは`loop-engineering/README.md`の「loop contract」層の実体である。
> 長時間・複数セッションにまたがる自律実行を始める前に埋める。
> コピー先: プロジェクト直下、または`templates/long-running-agent/loop-contract.md`。

## Done definition

このループが「完了」とみなされる、観測可能な条件を書く。
(例: `feature-list.json`の全項目が`passes=true`になっている)

## Stop conditions

- Max iterations: <N>
- Max wall-clock time: <duration>
- Consecutive failures: <N>回連続で失敗したら停止する
- No-progress detector: <何をもって「進捗なし」と判定するか>

## Checker

- Command: `bash scripts/harness-verify.sh`(プロジェクト固有の検証がある場合は差し替える)
- checkerがFAILする間、このループは継続実行しない。

## Human checkpoint

`standards/ai-development-rules.md` §4 Approval boundaryを参照する
(production deploy / production DB migration / production object削除・上書き /
secret変更 / 認証・認可ポリシーの緩和 / destructive migration)。
ここに重複して書かず、参照のみとする。

## State layer

- `templates/long-running-agent/feature-list.json`
- `templates/long-running-agent/progress.md`

## Change history

- YYYY-MM-DD: 初版作成
