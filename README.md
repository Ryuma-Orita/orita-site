# Ryuma Orita — 公開Webサイト

- 公開サイト: <https://ryuma-orita.netlify.app/>
- ソースの正本: <https://github.com/Ryuma-Orita/orita-site>
- 管理方針: [AGENTS.md](AGENTS.md)

## 構成

HugoとBlowfishで生成する多言語の静的サイトです。テーマは `themes/blowfish/` に同梱されています。テーマの `package.json` に記載された版は2.106.0です。通常のページ更新でテーマの更新やnpmによる再構築は行いません。

| 場所 | 用途 |
| --- | --- |
| `content/en/` | 英語ページ。URLは `/` を起点とする |
| `content/ja/` | 日本語ページ。URLは `/ja/` を起点とする |
| その他の `content/<言語>/` | 12言語のトップページ。メニューは英語の各セクションへ誘導 |
| `config/_default/` | Hugo・言語・メニュー・数式・テーマ設定 |
| `layouts/partials/` | 配色・書体・数式・メールリンク・論文リンクの独自処理 |
| `layouts/shortcodes/lecture-schedule.html` | 講義日程表 |
| `assets/css/custom.css` | 独自表示、明暗表示、狭い画面への対応 |
| `assets/`、`static/`、`i18n/` | 画像・アイコン、配信ファイル、翻訳文言 |
| `netlify.toml` | ビルドコマンド・Hugoバージョン・公開ディレクトリ |

通常の表は横スクロールに対応しています。講義日程表は専用shortcodeを使い、PCでは3列、幅640px以下では各回を2段に配置します。通常表の見出しは独自CSSで非表示になるため、新しい表を追加するときは見出しの必要性も確認してください。

## ビルドと公開経路

`netlify.toml` のHugo指定は **0.164.0**、タイムゾーンは **Asia/Tokyo**、公開ディレクトリは **public** です。バージョンを変更する場合は、別途提案してから進めます。

| Netlifyのコンテキスト | コマンド |
| --- | --- |
| 既定（本番） | `hugo --gc --minify -b $URL` |
| Deploy Preview | `hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL` |
| Branch deploy | `hugo --gc --minify -b $DEPLOY_PRIME_URL` |

これはファイルに記載されたビルド設定です。GitHubとの接続先、公開ブランチ、各種デプロイの有効・無効、公開中のコミットはNetlify側の状態を別途確認してください。

以下は作業環境での確認例です。リポジトリのルートで、指定バージョンのHugoを使います。サイトの配信出力は一時ディレクトリに置き、生成物はコミットしません。

```sh
hugo version
site_check_dir=$(mktemp -d)
TZ=Asia/Tokyo hugo --gc --minify \
  -b https://ryuma-orita.netlify.app/ \
  --destination "$site_check_dir/production"
TZ=Asia/Tokyo hugo --gc --minify --buildFuture \
  -b https://ryuma-orita.netlify.app/ \
  --destination "$site_check_dir/with-future"
diff -qr "$site_check_dir/production" "$site_check_dir/with-future"
```

最後の比較は、同じbaseURLで未来日付の扱いによる差を調べるものです。差がある場合、`diff` は終了コード1を返します。実際のDeploy Previewでは別のbaseURLになるため、プレビュー上のリンク等も確認します。ローカルビルドの成功はNetlifyデプロイの成功を意味しません。

## 更新の流れ

1. 最新main、未完了PR、既存の作業差分を確認し、作業ブランチを用意する。
2. 依頼された内容を編集し、関連ページ・多言語版・公開可能な情報の範囲を確認する。
3. 変更に応じたビルドとリンク・表示検査を行い、未実施事項と理由を残す。文書だけの変更なら、サイト生成物に影響がないことを確認する。
4. [PRテンプレート](.github/PULL_REQUEST_TEMPLATE.md)に沿ってDraft PRを作成し、利用可能ならその版のDeploy Previewを確認する。
5. 利用者の明示的な承認後にマージ等を行い、Netlifyのデプロイ結果と公開ページを別途確認する。

公開資料の追加を依頼されていない限り、他リポジトリの原稿や講義資料は転載しません。変更履歴と個別の検査結果はGitのコミットとPRに記録します。
