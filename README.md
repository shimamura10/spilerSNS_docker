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
- [ ] ログインボタンを二回押さないとdashboardに遷移しない

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
