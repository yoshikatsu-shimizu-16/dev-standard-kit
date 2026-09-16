# AI Development Rules

## 1. 基本原則

AI Coding Agent には自由度より検証可能性を優先する。

- 変更は小さく保つ。
- 目的外のリファクタリングをしない。
- 既存テストを消して成功扱いにしない。
- `skip`、`@ts-ignore`、`@ts-nocheck` などで品質ゲートを回避しない。
- 本番環境の破壊的操作は人間承認を必須にする。

## 2. 標準ループ

```text
要求
 ↓
Task Contract
 ↓
Context / Architecture確認
 ↓
実装
 ↓
Static Check
 ↓
Unit / Runtime / Integration / E2E
 ↓
Diff Review
 ↓
失敗なら修正して再実行
 ↓
Evidence付き完了
```

## 3. Harness Feedback Loop

同種の失敗が2回以上発生した場合、単にプロンプトへ注意事項を追加するのではなく、次のいずれかへ昇格する。

- lint rule
- unit/integration/E2E test
- verification script
- architecture rule
- CI gate

これにより「次は気をつける」ではなく「次は失敗を自動検出する」状態へ変える。

## 4. Approval boundary

次は原則として人間承認なしにAIが実行しない。

- production deploy
- production DB migration
- production object deletion / overwrite
- secret変更
- 認証・認可ポリシーの緩和
- destructive migration
