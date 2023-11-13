## ネタバレ歓迎SNS
一般的なSNSでは忌避されがちな作品のネタバレを含む感想や考察などの投稿を主としたSNSです。  
何の作品に関連する投稿かをカテゴライズした上で、文章や画像を投稿できます。  
ユーザーが意図せずネタバレを見ないための工夫やネガティブな投稿を非表示にできる機能が特徴です。

## 使用技術
- PHP 8.2.1
- Laravel 9.52.15
- React 18.2.0
- Material UI
- Inertia
- Docker
- Cloudinary
- Amazon Comprehend
- Heroku

## 機能一覧
- ユーザー登録、ログイン機能 (breeze)
    - アイコン、ステータスメッセージ
- 投稿機能
    - 画像投稿
- いいね機能
- コメント機能
- カテゴリー機能
    - カテゴリー作成
    - 表示非表示の切り替え
- ネガティブな内容の投稿の非表示

## Problem
- [x] コメント数やいいねをどこで数える？  
jsxで数えるとコメントやいいねを全部ロードする必要があってよくない
modelで数えてpost.commentCount的な感じで取りだしたい   
フロントでやる
- [x] seederでtruncateしようとすると外部キー制約に引っ掛かる  
`cascadeOnDelete`してもダメっぽかった  
migrate:fresh --seedでいい
- [x] プロフィールの編集のときだけアイコン画像が送れない  
作成時と何も変わらないと思うのにどうしても$request->file(icon_file)がnullになる。何が違うのかわからん。。。。  
patchだと送れないけどpostだと送れるっぽい。意味わからん。時間返せ  
putでも送れなかった。通信容量の問題？
- [x] reactのrouteでid送るのどうすんの  
`route('mypage', {user: user.id})`的な感じでいける
- [x] アイコンの横に名前出したい
Gridだと幅を指定しなきゃだから微妙。アイコンに詰めてほしい。  
Boxをflexboxにすればよし
- [x] muiでスタイルカスタムするのどうすんの  
やり方いろいろ書いてあるけどどれもよくわからん。  
MUI Systemを使うのがわかりやすかった。  
https://mui.com/system/getting-started/
- [ ] 投稿画像のプレビューができてない。
ネットで拾った方法だとできるが、自分で作ったimageに同じurlを渡しても表示できない。  
そもそもurlに飛んでも画像表示できないしこのurlなんなんだ
- [ ] 縦長画像の表示  
下の画像貫通する。MUIのドキュメントとか探すか。
- [x] IconButton要素を使うと、中の画像がクリックされたことになってbutton要素のvalueが取得できない。  
中身に`pointer-events: none`をスタイリングするとその要素のクリックイベントを無効にできる。  
z-indexとかposition: relativeは効果なかった。  
- [x] ボタンワンクリックでバックエンドに情報を送りたい。フォローとかいいねとか
useState使うとレンダリングされるまで値が反映されないから使えない。  
fetchAPIてやつ使ったら419言われた。csrf自分でやんのか？
https://github.com/JakeChampion/fetch
下の二つの記事でいけるかも
https://yanamura.hatenablog.com/entry/2017/05/12/094103
https://www.engilaboo.com/laravel-react-csrf/  
エラーが500になったが余計原因がわからず詰み  
SQLのリレーションミスってただけだった()
- [x] ログインボタンを二回押さないとdashboardに遷移しない  
原因不明だが発生しなくなった
- [x] git操作で作成されたファイルに書き込めない！！！  
mergeしたりbranch移動したりで作成され直したファイルの所有者がrootユーザーになっていてpermission deniedされる  
普通にvscodeから作成したファイルは所有者が1000になってるので、rootユーザーが作成したファイルには書き込む権限がないのだろう。  
ユーザーまわりわかんなすぎる...  
ファイルをコピーして所有者を1000にすることで一時的な対処とします  
下記サイトを参考にDockerfileをいじってコンテナのデフォルトユーザーを変えてみたけど変わらずrootユーザーが作成してた  
https://zenn.dev/forrep/articles/8c0304ad420c8e  
デフォルトユーザーの変更には成功したが、nodeのインストールをrootで行っているせいでnpm系のコマンドが実行できなくなった  
根が深そうなのでファイルのコピペで対応
- [x] ユーザー作成時に登録したアイコンが適用されない  
icon_urlがfillable
- [x] カテゴリーフォローで419。リロードでなおる  
fetchではなくaxiosにしたらでなくなった
- [x] 投稿時の作品カテゴリーがフォローしてないのもでる
- [ ] 投稿時にリロードしたい  
投稿をaxiosにしてthenでリロードすれば良さそう  
inertiaだとonSuccessでリロードする
- [ ] もろもろバリデーション
- [ ] `Deprecated: PHP Startup: Use of mbstring.internal_encoding is deprecated in Unknown on line 0`  
    - https://support.ntt.com/mw-premiumr3/faq/detail/pid2300001r2d/
- [x] user登録時にステータスメッセージを設定
- [x] 投稿の改行が反映されない


## 日記
### 9/16
- modelのリレーション書いた  
テーブル名勝手につけたときはこんな感じで指定できるんだね～  
`return $this->belongsToMany(User::class, 'post_likes', 'post_id', 'user_id');`
- マイページに自分の投稿とそのカテゴリー表示できるようにした
Auth::user()でログインしてるuserのインスタンスとれるっぽい。便利～
- ユーザー登録時にアイコン設定できるようにした  
reactのformがよくわかってなかったね。  
`Cloudinary::upload($request->file('icon_file')->getRealPath())->getSecurePath()`
これを配列定義の中とかでやるとアップロードできても返り値がurlになってなかった。地の文でやるのが安牌そう。
- mypageへのリンクをヘッダーのとこに追加  
navigationファイルじゃなくてAuthentificatedLayout.jsxを編集しよう
- プロフィール編集でアイコンとステータスメッセージ変えれるようにした  
patchメソッドだとファイル送れなかったからpostメソッドにしてしまったが良いのだろうか

### 9/17
- タイムラインのスタイルつけ始めた  
materialUI使ってみたけど難しすぎるかもしれん。アイコンの横に名前出すだけで3時間ぐらいかかった。それすら満足にはできてないが。

### 9/19
- 投稿に画像を並べて表示してみた  
materialUIのImageList使って一瞬だった。すごい

### 9/20
- 自作スタイルをtailwind混ぜてたのからMUIに統一した。  
materialUIのカスタム方法わかってきたぞ。公式ドキュメントが充実してて良い。  
- 投稿機能をつけた
useFormをreact-hook-formのやつで調べてて全然違うこと書いてあって困惑してた  
スタイルつけなきゃな～。そもそも投稿画面別にするかホーム画面で投稿できるようにするか。後者の方が使いやすいか？  
そろそろナビゲーションを縦にするか～。画面の配置とか考えんのだり～  
あとバリデーションつけてくれ

### 9/22
- 投稿作成をホーム画面に移した
propsにログイン中のユーザー情報がauthで入ってるのはweb.phpから直接呼ばれたjsxのみっぽい。jsxから呼んだjsxにはprops.authが無かった。
- カテゴリーを投稿の右上にした
flexboxの入れ子という新たな技法。かなり使える場面多そう。
- react-windowがimportできない。
`import { FixedSizeList } from 'react-window`だとMinified React error #130言われる。

### 9/23
- カテゴリーフォローボタン作った
- `class="hoge"`だとclassがhogeだけになるけど、`className="hoge"`だともとのクラスにhogeが追加される

### 9/24
- 空白2個で検索して空白4個に置き換えるとインデント簡単に揃えられる。革命。

### 9/26
- `onClick={function(x)}`の書き方はやめよう  
ロード時に無限に実行される。そもそもonClickにはメソッドを入れるのに、function(x)だとfunctionの返り値を入れようとしてる。
なので`() => function(x)`みたいにしよう。この書き方だと返り値は関数になるらしい。

### 9/28
- reactで作成するコンポーネントは、根の要素を一つにする必要がある  
map関数やdefault exportするやつは一つの要素にまとめよう

### 10/8
- ec2のメモリが不足してビルドできなくなったので環境をdockerに移行しよう
移行した～。おそらくgitのバージョンが違うせいでgit操作できなくなったのでリモートリポジトリを新しくした。  
git branchで何も出力されないとかあるんだね。
- いいね機能作った  
投稿ごとに全いいねに対してmap回してるのやばいか？1万ぐらいまでなら余裕そうだからいいか？  
計算量に無駄がある書き方が気になるのは明らかに競プロの弊害。  
でもやっぱり処理が汚すぎる。muiのcheckbox使ったらもうちょい良い感じにできそうかも。

### 10/10  
- propsの受け取り方  
引数にひとつのオブジェクトが来るからそれをどのように受け取るかというだけ。  
`const Mypage = (props) => {`  
こうするとpropsという名前のオブジェクトに全部入る。  
`const FollowCategories = ({categories, user}) => {`  
こう書くとcategoriesとuserだけ受け取る。受け取る変数を明示的に示せるから多分こっちのほうが良い。
他ファイルでimportして使うときもVScodeの機能で引数を確認できた。絶対便利。

### 10/14
- 中間テーブルのカラム取得  
フォロー中のカテゴリーの投稿の表示・非表示を示す情報を中間テーブルに持たせたい。  
`return $this->belongsToMany(Category::class)->withPivot('display');`  
モデルのリレーションをこんな感じで書くといける。Pivotにはデフォルトでキーが入ってて、他のカラムも入れたいときはこんな感じで明示する。  

### 10/15
- TLに表示する投稿のカテゴリーを制限する。  
mapは連想配列には使えない！！  
エラー原因がかなりはっきりしてたし学びもあったので初めてQiitaに投稿してみた
https://qiita.com/shima10/items/ec0502c972515c9c366c  
わりと時間かかってだるかった。良記事を投稿してくれてる先人に感謝。

### 10/16
- 感情分析どうやるか検討  
    - ローカルで実行  
    GPUのメモリ足りなくて無理そう。Herokeにアップロードしたらまず無理。
    - Google ColaboratoryをAPIサーバー化  
    90分アクセスが無いor12時間立ち上げっぱなしでセッション終了されるらしくてめんどそう。ライブラリとかも全部消えるらしい。  
    日次処理的な感じにすればいけるのでは？？
    - Amazon ComprehendとかGoogle Cloud Natural LanguageとかのAPIを使う  
    料金発生する可能性がある  
- Google ColaboratoryをAPIサーバーにする  
flask + ngrokでできるらしい  
デフォルトだとurlが毎回変わるが固定できるようになったらしい  
https://qiita.com/youtoy/items/8a79d6954bb37f935f1b  
90分問題はバッチ処理にすれば解決しそうだが12時間問題は解決しない  
かなり力技で解決してる人もいた。インスタンスを二個用意して渡り歩かせてる。おもろ
https://qiita.com/shoyaokayama/items/8869b7dda6deff017046  
colabもGASみたいに定時実行させてくれ～  
これ全部やるのは時間足らなそ～  
いったん普通のapi使うか

### 10/19, 20
- amazon comprehendをローカルのPHPから実行する
    - AWS IAM Identity Centerを設定する  
    https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html
    - aws sdkのインストール (https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/getting-started_installation.html)
awsのドキュメントが読みづら過ぎてきれそう  
認証情報のファイルどこに置くんだ？vendor/aws/configとvendor/aws/credentialsを作ったけど合ってるのか？  
  - /root/.awsの下だった。
aws_session_tokenてなに～～  
IAM Identity centerの認証情報取得方法  
https://docs.aws.amazon.com/ja_jp/singlesignon/latest/userguide/howtogetcredentials.html#how-to-get-temp-credentials  
MFAしてなければsession tokenはいらないっぽい？  

### 10/21
- aws comprehendのサンプルコードをphpで実行できた!!!!  
awsアカウント持ってたからこれにしたけど他のサービスのほうが楽だったかも  
awsに他のサービスもいっぱいあるせいで認証システムとか普通のweb apiよりかなり複雑だった

### 10/29
- aws comprehendにlaravelアプリケーションからアクセスできた  
普通にサンプルコードと同じでいけると思ったけど認証情報の与え方を変えないといけなかった。もともと/root/.aws/に認証ファイルを作ってたけどlaravelアプリからホームディレクトリにアクセスできないらしい。.envファイルにアクセスキーとか書いたらいけた。もしかしてidentity centerの登録とかいらなかった？？
- スクリプトからリロード  
`window.location.reload();`

### 10/30
- axios.delete  
データ送るときの書き方がpostと違うので注意

### 11/13
- 複数行の投稿やコメントを改行して表示  
Typographyにwhite-space: pre-wrapを指定
- 投稿のアイコンから投稿主のマイページに飛べるようにした