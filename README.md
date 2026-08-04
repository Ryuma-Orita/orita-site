# サイト移行手順

この ZIP には、新しいサイト一式が入っています。
テーマ本体（Blowfish）だけは容量の都合で入っていないので、
手順2でダウンロードしていただきます。それ以外は全部揃っています。

**アドレスは `https://ryuma-orita.netlify.app/` のまま変わりません。**
論文・講演・授業の個別ページのURLも、245ページ中204ページがそのまま維持されます。
残り41ページはテーマが自動生成していた索引ページで、
アクセスがあっても404にならないよう転送設定を入れてあります。

作業時間はおよそ1〜2時間です。途中で止まっても問題ありません。
**今のサイトは最後の最後まで動き続けます。**

---

## 手順1　新しいリポジトリを作って、手元に持ってくる

### 1-1. GitHub で新しいリポジトリを作る（ブラウザ）

1. https://github.com/new を開く
2. **Repository name** に `orita-site` と入力
3. **Public** を選ぶ
4. 下の「Add a README file」などのチェックは**すべて外したまま**にする
5. 緑の **Create repository** ボタンを押す

次の画面に出るアドレス（`https://github.com/Ryuma-Orita/orita-site.git`）をコピーしておきます。

### 1-2. TortoiseGit でクローンする

1. エクスプローラーで、作業したい場所（今の `academic-kickstart` フォルダと同じ階層が分かりやすいです）を開く
2. 何もないところで**右クリック** → **Git クローン(Clone)...**
3. **URL** に 1-1 でコピーしたアドレスを貼り付ける
4. **OK** を押す

`orita-site` という空のフォルダができます。

---

## 手順2　テーマ（Blowfish）をダウンロードして入れる

1. ブラウザで https://github.com/nunocoracao/blowfish/releases を開く
2. 一番上（最新版）の **Assets** を開き、**Source code (zip)** をクリックしてダウンロード
3. ダウンロードした zip を右クリック →「すべて展開」
4. 展開してできたフォルダ（`blowfish-3.xx.x` のような名前）を、**`blowfish` という名前に変更する**
5. その `blowfish` フォルダを、`orita-site\themes\` の中に移動する

正しく置けていれば、こういう形になります。

```
orita-site\
  themes\
    blowfish\
      layouts\
      assets\
      i18n\
      ...
```

`themes` フォルダに入っている `ここにblowfishを入れます.txt` は削除して構いません。

---

## 手順3　ZIPの中身をコピーする

この ZIP を展開し、**中身をすべて** `orita-site` フォルダにコピーします
（`themes` の中の blowfish は消さないでください）。

コピー後、`orita-site` の中はこうなります。

```
orita-site\
  assets\        ← 顔写真・背景・アイコン・追加CSS
  config\        ← 設定ファイル
  content\       ← 論文・講演・授業の原稿
  static\        ← 転送設定・背景模様
  themes\        ← 手順2で入れたテーマ
  netlify.toml   ← Netlify のビルド設定
  .gitignore
  README.md      ← このファイル（手順書）
  CHANGELOG.md   ← 組み立て時の変更履歴
```

見た目の調整はテーマ標準の設定（`config\_default\params.toml`）と
追加CSS（`assets\css\custom.css`）だけで行っています。
**`themes\` の中は編集していないので、テーマは安全に更新できます。**

---

## 手順4　手元で見た目を確認する（任意ですが、おすすめ）

これをやると、直しては見て、を数秒で繰り返せます。やらなくても先に進めます。

### 4-1. Hugo を入れる（初回だけ）

1. スタートメニューで **PowerShell** を検索して開く
2. 次の1行を貼り付けて Enter

```
winget install Hugo.Hugo.Extended
```

3. 終わったら PowerShell を一度閉じて、開き直す
4. `hugo version` と打って Enter。バージョンが表示されればOK
   （表示された文字の中に `+extended` が入っていることを確認してください）

### 4-2. 動かす

1. エクスプローラーで `orita-site` フォルダを開く
2. アドレスバー（上の「PC > ... > orita-site」と出ている欄）をクリックし、
   `powershell` と打ち替えて Enter
3. 開いた黒い画面に次を貼り付けて Enter

```
hugo server
```

4. `http://localhost:1313/` をブラウザで開く

止めるときは黒い画面で **Ctrl + C**。

**注意：** ここで赤い文字のエラーが出たら、そのメッセージをコピーして送ってください。
テーマの読み込み方によっては最初の1回だけ調整が必要な場合があります。

---

## 手順5　GitHub にアップロードする

いつも通りの操作です。

1. `orita-site` フォルダで**右クリック** → **Git コミット(Commit) -> "main"...**
2. メッセージ欄に `新サイト` などと入力
3. 左下の **すべて(All)** にチェックを入れて、未追跡ファイルも含める
4. **コミット(Commit)** → 続けて **プッシュ(Push)**

---

## 手順6　Netlify で「お試しサイト」を作る

**ここでは既存のサイトには一切触りません。** 別の新しいサイトを作ります。

1. https://app.netlify.com/ にログイン
2. **Add new site** → **Import an existing project**
3. **GitHub** を選び、`orita-site` を選ぶ
4. 設定画面はそのままで **Deploy** を押す
   （`netlify.toml` に必要な設定が書いてあるので、手入力は不要です）
5. 数分待つと `random-name-12345.netlify.app` のようなアドレスができます

そのアドレスを開いて、実際の見た目を確認してください。

**確認するところ**

- トップページに顔写真・肩書き・自己紹介が出ているか
- メニューから「論文」「講演」「授業」「ゼミ」に飛べるか
- 論文一覧に14本、年ごとにまとまって並んでいるか
- 論文の個別ページで、要約の数式（$の記号で囲まれた部分）がきちんと表示されているか
- 右上の言語切り替えで日本語↔英語が行き来できるか

気になるところがあれば、**この段階で遠慮なく言ってください。** 直します。

---

## 手順7　本番を切り替える

見た目に納得できたら、最後の作業です。

**⚠ 古い Netlify サイトは絶対に削除しないでください。**
削除すると `ryuma-orita.netlify.app` という名前が解放されて、
二度と取り戻せない可能性があります。

1. Netlify で**古いほうのサイト**（`ryuma-orita`）を開く
2. **Project configuration** を開く
3. **Build & deploy** → **Continuous deployment** を開く
4. **Repository** の欄にある **Manage repository** を押す
5. **Link to a different repository** を選ぶ
6. `orita-site` を選んで保存

これで `https://ryuma-orita.netlify.app/` が新しいサイトを表示します。

確認できたら、手順6で作ったお試しサイトのほうを削除してください
（そちらは削除して構いません）。

古いリポジトリ `academic-kickstart` は、念のため1年ほど残しておくことをおすすめします。

---

## これから記事を追加するとき

今までとほとんど同じです。ファイルの中身が短くなった分、むしろ楽になります。

### 講演を追加する

`content\ja\talk\` の中の既存ファイルをコピーして名前を変え、中身を書き換えます。
英語版も `content\en\talk\` に同じファイル名で作ります。

```yaml
---
title: 講演のタイトル
event: 研究集会の名前
event_url: https://...
location: 新潟大学
summary: 研究集会の名前 · 新潟大学    # 一覧に出る行
date: '2026-10-15T14:30:00+09:00'
publishDate: '2026-08-01T00:00:00+09:00'
---

[研究集会の名前](https://...)

新潟大学
```

`publishDate` は「この日から一覧に載せる」という意味です。
先の予定を今のうちに書いておいて、後から公開したいときに使います。
不要なら行ごと消して構いません。

### 論文を追加する

`content\ja\publication\` と `content\en\publication\` の既存ファイルを真似してください。

```yaml
---
title: 論文のタイトル
date: '2026-05-01'
authors:
  - Ryuma Orita
pubtype: preprint    # journal / preprint / conference / book / thesis
citation: '*Journal Name*, vol. **10** (2026), 1-20'
summary: Ryuma Orita — Journal Name, vol. 10 (2026), 1-20   # 一覧に出る行
links:
  - name: arXiv
    url: https://arxiv.org/abs/....
---

{{< katex >}}
Ryuma Orita  
*Journal Name*, vol. **10** (2026), 1-20  
[arXiv](https://arxiv.org/abs/....)

## Abstract

要約。$\mathbb{R}^n$ のように数式も書けます。
```

ポイント:

- `summary:` が一覧ページに表示される行です
- 本文（`---` の下）が個別ページに表示されます
- 数式を使うページは本文の最初に `{{< katex >}}` の1行を入れてください
  （この行自体は画面に表示されません）

**ファイル名は変えないでください。** URLがファイル名から作られているので、
名前を変えると既存のリンクが切れます（新規追加は問題ありません）。

書き終えたら、いつも通り右クリック → コミット → プッシュ。
数分で自動的に公開されます。

---

## 困ったときは

| 症状 | 対処 |
|---|---|
| `hugo server` で赤いエラーが出る | メッセージをコピーして送ってください |
| Netlify のビルドが失敗する | Netlify の画面で **Deploys** → 失敗した行をクリック → ログをコピーして送ってください |
| 見た目が真っ白／崩れている | 手順2の `themes\blowfish` の中身が正しく入っているか確認してください |
| 数式が `$...$` のまま表示される | そのページの本文の最初に `{{< katex >}}` の1行があるか確認してください |
| 色や配色を変えたい | `config\_default\params.toml` の `colorScheme` を書き換えてください。候補: `blowfish` `ocean` `forest` `noir` `one-light` `slate` |

エラーメッセージは、意味が分からなくてもそのままコピーして貼っていただければ大丈夫です。

---

## よく触る設定の場所

| 変えたいもの | 場所 |
|---|---|
| 配色 | `config\_default\params.toml` の `colorScheme` |
| ライト/ダークの既定 | 同ファイルの `defaultAppearance` |
| トップの背景画像 | `assets\img\background.svg`（`params.toml` の `homepageImage`） |
| 背景の流れる速さ | `background.svg` 内と `assets\css\custom.css` 内の `90s`（両方揃える） |
| 内側ページの背景の濃さ | `assets\css\custom.css` の `opacity: 0.5` |
| 顔写真 | `assets\img\author.jpg` を同名で上書き（正方形推奨） |
| プロフィール文・リンク | `config\_default\languages.ja.toml` / `languages.en.toml` |
| トップページの本文 | `content\ja\_index.md` / `content\en\_index.md` |
| メニュー | `config\_default\menus.ja.toml` / `menus.en.toml` |
