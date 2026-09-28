# 公開利用・保守の根拠

Codex for Open Sourceなどの申請や、OSSとしての改善判断に使う公開情報を記録します。数値は取得時点のスナップショットであり、現在値や成果の保証ではありません。

## 2026-09-28のスナップショット

| 項目 | 確認した値 | 根拠・数え方 |
| --- | ---: | --- |
| キットのGitHub Star | 1 | [dev-standard-kit](https://github.com/yoshikatsu-shimizu-16/dev-standard-kit) の公開メタデータ |
| GitHub Fork | 0 | 同上。GitHubがForkとして紐づけたリポジトリ数 |
| 公開GitHub Release | 0 | [Releases](https://github.com/yoshikatsu-shimizu-16/dev-standard-kit/releases) |
| 外部利用者・外部採用事例 | 未確認 | 同じ所有者の利用例は含めない |
| 月間ダウンロード | 該当する配布指標なし | 現時点でパッケージとして公開していない |

## 確認できる利用例

- [open-inovation-matching-platform](https://github.com/yoshikatsu-shimizu-16/open-inovation-matching-platform): 同じ所有者がキットの構成・開発文書を使用している公開アプリ開発例。公開された[README](https://github.com/yoshikatsu-shimizu-16/open-inovation-matching-platform/blob/main/README.md)と[AGENTS.md](https://github.com/yoshikatsu-shimizu-16/open-inovation-matching-platform/blob/main/AGENTS.md)で、キット由来の構成とアプリ固有の拡張を確認できる。GitHubの`fork`メタデータは`false`のため、上表のGitHub Forkには含めない。外部採用事例にも含めない。

## 継続的な保守の根拠

- [コミット履歴](https://github.com/yoshikatsu-shimizu-16/dev-standard-kit/commits/main): 標準キットとアプリ雛形の変更履歴。
- [Issues](https://github.com/yoshikatsu-shimizu-16/dev-standard-kit/issues)・[Pull requests](https://github.com/yoshikatsu-shimizu-16/dev-standard-kit/pulls): 課題の検討、レビュー、取り込みの公開記録。
- [品質ワークフロー](https://github.com/yoshikatsu-shimizu-16/dev-standard-kit/actions): 実行結果を個別に確認する。ワークフローが起動しなかった変更を成功扱いしない。

## 更新ルール

1. 申請・発表の直前とリリース時に、取得日を明記して新しいスナップショットを追加する。過去の値は上書きしない。
2. Star、Fork、Releaseなどの数値は公開ページまたはGitHub APIで再確認する。取得できなければ「未確認」と書き、0と推定しない。
3. 利用事例は公開URLと確認できる採用箇所を示す。所有者自身の利用、外部組織の採用、GitHub上のForkを分けて記録する。非公開の利用は許可なく掲載しない。
4. キットへの改善還元を記録するときは、元の課題とキット側のIssueまたはPRのURLを両方示す。まだ還元していない改善を完了扱いしない。
5. 申請文では直近スナップショットの取得日を併記し、計画や目標を実績と混同しない。
