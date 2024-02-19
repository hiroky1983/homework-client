export const TopScreen = () => {
  return (
    <div className="h-screen">
      <ul>
        <h1>開発課題</h1>
        <h2>バックエンド</h2>
        <li>
          チャット送信後の挙動、現状メッセージしか送れない為、sender判定がotherにしかならない。ハンドリングをフロントで行うかどうかを考える
        </li>
        <li>チャットroomにどちらか片方が抜けるとpanicになる挙動の修正</li>
        <li>seederデータの作成、自動化</li>
        <li>routerがfatになるのでリファクタリング</li>
        <li>各リクエストとレスポンスをmodelで定義してきれいにする</li>
        <li>tokenチェックのAPIを作成する</li>
        <li>各テストの記述</li>
        <li>CI／CDテスト</li>
        <li>
          intercepterのmiddleware実装をどうするか検討（要らなければディレクトリの記述を消す）
        </li>
        <li>多言語対応</li>
        <li>
          chatのキャッシュ周りどうするか(rdbじゃなくredisとかにするか考える)
        </li>
        <li></li>
        <br />
        <h2>フロントエンド</h2>
        <li>ブレイクポイント設定</li>
        <li>プロフィール情報のrequireを外す</li>
        <li>エラーハンドリングを修正</li>
        <li>csrf tokenのチェックすぐおかしくなる挙動修正</li>
        <li>認証、認可周りの実装、リダイレクト処理</li>
        <li>UIをモダンできれいにする</li>
        <li>tailwind周りの修正、長い記述をcssに移動する</li>
        <li>tailwind周り、JITの導入</li>
        <li>CSSコンテナ周りの共通化</li>
        <li>CSS chatコンテンツのスクロール、heightの固定化</li>
        <li></li>
      </ul>
      <div className="hidden"></div>
    </div>
  )
}
