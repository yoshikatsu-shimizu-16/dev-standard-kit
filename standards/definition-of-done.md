# Definition of Done

すべての実装タスクは、少なくとも次を満たして完了とする。

- 受け入れ条件を満たしている。
- 変更範囲に対応する型チェック・Lintが成功している。
- 変更範囲に対応するUnit / Runtime / Integration / E2Eテストが成功している。
- Production build が成功している。
- secret やcredentialが差分に含まれていない。
- unrelated change が含まれていない。
- skipped test や品質ゲート回避が追加されていない。
- DB migration を変更した場合、空DBから再現可能である。
- 本番破壊操作を自動実行していない。
- 最終報告に変更内容、実行コマンド、PASS/FAIL、未検証項目を記載できる。

## 完了報告テンプレート

```text
変更:
- ...

検証:
- typecheck: PASS / N/A
- lint: PASS / N/A
- unit: PASS / N/A
- runtime: PASS / N/A
- integration: PASS / N/A
- e2e: PASS / N/A
- build: PASS / N/A

注意点:
- ...

未検証・残課題:
- なし / ...
```
