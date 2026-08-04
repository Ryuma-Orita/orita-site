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
  assets\        ← 顔写真
  config\        ← 設定ファイル
  content\       ← 論文・講演・授業の原稿（201ファイル）
  layouts\       ← 一覧の見た目
  static\        ← 転送設定
  themes\        ← 手順2で入れたテーマ
  netlify.toml
  .gitignore
  README.md      ← このファイル
```

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
date: '2026-10-15T14:30:00+09:00'
publishDate: '2026-08-01T00:00:00+09:00'
abstract: 講演の概要
---
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
kind: preprint          # journal / preprint / conference / book / thesis から選ぶ
citation: '*Journal Name*, vol. **10** (2026), 1-20'
abstract: 要約。$\mathbb{R}^n$ のように数式も書けます。
links:
  - name: arXiv
    url: https://arxiv.org/abs/....
---
```

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
| 数式が `$...$` のまま表示される | `config\_default\markup.toml` が入っているか確認してください |
| 色や配色を変えたい | `config\_default\params.toml` の `colorScheme` を書き換えてください。候補: `blowfish` `ocean` `forest` `noir` `one-light` `slate` |

エラーメッセージは、意味が分からなくてもそのままコピーして貼っていただければ大丈夫です。

---

## 修正履歴

### 2026-08-04 — 初回の `hugo server` で出た3つのエラーを修正

| 問題 | 内容 | 対処 |
|---|---|---|
| `kind in front matter was deprecated` | 論文の front matter で使っていた `kind:` が、Hugo 0.144 で予約語になり削除されていた | 全28ファイルで `kind:` を `pubtype:` に改名。一覧の表示部分も合わせて修正 |
| `failed to render shortcode "icon"` | 授業ページ本文に Academic 独自の `{{< icon ... >}}` が266箇所残っていた | すべて `[動画](URL)` という素のリンクに置換 |
| （同種）`{{% alert %}}` | 注意書き用の Academic 独自記法が28箇所残っていた | 引用ブロック（`> **注意**`）に置換 |
| `languageName was deprecated` | 設定キーの名前が Hugo 0.158 で変更された | `languageName` を `label` に変更 |

あわせて、授業一覧に開講時限（`summary`）を表示するようにし、
テンプレートを Hugo 0.146 以降の新形式（`page.html` / `section.html`）でも
拾えるように複製しました。

### 2026-08-04 (2回目) — レイアウトがテーマに負けていた問題を修正

**症状**：論文一覧に著者名と掲載誌が出ない／トップページの本文（研究興味・学歴）が出ない／
ヘッダーのメニューを押しても遷移しない。

**原因**：私が置いたレイアウトファイルが `layouts/publication/` などの場所にあり、
Hugo がテーマ側の標準レイアウトを優先していました。3つの症状はすべてこれが原因です。

**対処**：

- レイアウトを `layouts/_default/list.html` と `layouts/_default/single.html` に移動。
  ここはテーマとまったく同じパスなので、**プロジェクト側が必ず優先されます。**
  中で「論文」「講演」「授業」を判定して、それぞれの見せ方に分けています。
- トップページはテーマ任せをやめ、`layouts/partials/home/custom.html` で自前で描くように変更
  （`params.toml` の `homepage.layout` を `custom` に）。
- メニューを `pageRef` から確実な `url` 指定に変更。
- プロフィールのリンク（arXiv など）を `profileLinks` として自前で持つように変更。
  テーマのアイコン集に arXiv が無く、リンクが1つ消えていたためです。

**顔写真について**：`assets/img/author.jpg` は現行サイトから引き継いだ既定のシルエット画像です。
実際の写真に差し替えたい場合は、同じファイル名で上書きしてください（正方形推奨）。

### 2026-08-04 (3回目) — 言語設定の書き忘れを修正【根本原因】

**症状**：トップページの本文が出ない／`/publication/` が Page Not Found ／
日本語ページなのにメニューが英語になる／一覧に西暦もラベルも著者も出ない。

**原因**：`languages.en.toml` と `languages.ja.toml` に **`contentDir` の指定が抜けていました。**
そのため Hugo は `content/en` と `content/ja` を「言語別のフォルダ」ではなく、
英語サイト内の `en` `ja` という単なるセクションとして扱っていました。

`hugo server` の出力に出ていた

```
        EN    JA
Pages   221    7
```

がその証拠です。全ファイルが英語サイトに寄っていました。上の症状はすべてこれ1つで説明がつきます。

**対処**：両ファイルの2行目に `contentDir` を追加。

```toml
locale = "ja"
contentDir = "content/ja"   # ← これが抜けていた
```

**確認方法**：`hugo server` の出力の Pages 欄が **EN 60前後 / JA 140前後** になっていれば成功です。
221 / 7 のままなら `config` フォルダが差し替わっていません。

### 2026-08-04 (4回目) — 本文の体裁を整えた

**症状**：ゼミのページで見出しが本文と同じ大きさ、箇条書きに点が付かない、
全体に詰まって読みづらい。トップページの箇条書きも同様。

**原因**：Blowfish は Tailwind CSS ベースで、見出し・リスト・表などの
既定スタイルを**すべてリセット**します。テーマ側はそれを `prose` という
仕組みで復元していますが、私がテンプレートを差し替えたためその復元が効いていませんでした。

**対処**：本文用のスタイルを自前で用意し（`layouts/partials/orita-styles.html`）、
`.Content` を `.orita-prose` で包むようにしました。見出し、箇条書き、表、
引用、リンク、区切り線、コードすべてに体裁が付きます。

色は一切ハードコードしていないので、テーマの配色（`params.toml` の `colorScheme`）を
変えても、ダークモードに切り替えても追従します。

あわせて `content/ja/zemi.md` の `***`（区切り線）を2箇所削除しました。
見出しに罫線が入るようになり、線が二重になっていたためです。
