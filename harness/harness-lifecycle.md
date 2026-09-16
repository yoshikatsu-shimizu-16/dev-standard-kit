# Harness Lifecycle

ハーネスは永久不変のルールではなく、モデル能力・ツール・プロジェクトの変化に対する仮定をコード化したものとして扱う。

参考:
- https://www.anthropic.com/engineering/harness-design-long-running-apps
- https://www.anthropic.com/engineering/managed-agents

## Lifecycle

```text
Failure / Risk
  ↓
Observe
  ↓
Add temporary guidance
  ↓
Promote to executable harness
  ↓
Measure effectiveness
  ↓
Keep / simplify / remove
```

## Harness record

重要なハーネスには可能な限り次を記録する。

- problem: 何を防ぐか
- source: どの失敗・一次資料から来たか
- enforcement: docs / lint / test / script / CI / approval
- scope: どの技術・ディレクトリに適用するか
- owner: 誰または何が保守するか
- evidence: 実際に有効だった証拠
- review_date: 再評価日
- removal_condition: 何が変われば削除可能か

## Add

次の場合に追加する。

- 同種の失敗が2回以上起きた
- 高リスク操作をagentが誤実行できる
- architecture driftを機械的に検出できる
- completionの誤判定を防げる
- セッション間handoffの情報欠落を防げる

## Simplify / Remove

次の場合は削除候補とする。

- モデル改善により問題が再現しなくなった
- 別の単純なtest/lintが同じ問題を防げる
- false positiveが多く開発を阻害する
- 実際には読まれず、機械的強制にもつながっていない
- 重複するharnessがある

一度に複数の重要ハーネスを削除せず、1要素ずつ外して影響を観察する。
