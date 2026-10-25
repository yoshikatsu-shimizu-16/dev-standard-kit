# Act をローカルで試す

この例は、Act が GitHub Actions のワークフローをローカルの Docker コンテナで実行する様子を確認するためのものです。GitHub 上の自動実行には登録されません。

## 前提

- Docker が起動していること
- `act` がインストールされていること
- リポジトリのルートディレクトリにいること

## 実行

```bash
act workflow_dispatch -W .agents/examples/act-local/act-demo.yml
```

初回は runner 用の Docker イメージがダウンロードされる場合があります。完了すると、ログに `Act ran this workflow locally.` と表示されます。

この例は文字を表示するだけで、シークレット、GitHub API、デプロイ、インフラ変更を使いません。Act の実行環境は GitHub と完全に同じではないため、この例の成功だけで他のワークフローも同じ結果になるとは限りません。
