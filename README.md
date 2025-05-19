## プロジェクトの概要
このウェブアプリは、日本語を楽しく学ぶためのツールです。
JLPTレベルごとの文法やビジネス日本語のロールプレイ、フラッシュカード、漢字ゲームなどを使って、自分のペースで学習できます。

## 使用技術
このアプリは以下の技術で作られています：
- フロントエンド（画面部分）：React（リアクト）という技術で、使いやすい画面を作っています。
- バックエンド（データの管理など）：Pythonという言語と、Djangoというフレームワークを使っています。
- データベース：SQLiteを使用し、ユーザ情報、フラッシュカード、クイズデータなどを保存しています。
### その他：
- HTML / CSS / JavaScript
- react-router-dom
- Git（バージョン管理）
- Rest framework
- JWT (Json Web Tokens)

## 開発のポイント
- **ログイン機能と認証**
<br>Django REST Framework と JWT（JSON Web Token）を使って、ログイン認証を実装。
<br>ユーザーごとのデータを安全に管理できるようにしました。
- **学習データの保存**
<br>Django のモデル機能を使って、SQLite にデータベーステーブルを作成。
<br>ユーザー情報、フラッシュカード、学習進捗などを保存しています。
- **フラッシュカードの作成・編集・削除**
　<br>React の画面からフラッシュカードを自由に追加・編集・削除できます。
<br>操作内容はすぐにバックエンドに反映されます。
- **フラッシュカードセットの共有機能**
<br>自分で作ったデッキを他のユーザーに渡せるよう、共有コードを生成。
<br>コードを入力することで、相手のアカウントに同じデッキをコピーできます。
- **フロントエンドとバックエンドの通信**
<br>React（フロントエンド） と Django（バックエンド） の間にデータを受送信するために、Axios ライブラリを使用。
<br>GET / POST / PUT / DELETE のAPI呼び出しで、データをやり取りします。
- **文法クイズ機能（選択式）**
<br>React の useState、useEffect、useContext などのフックを活用して実装。
<br>クイズの内容は JSON ファイルから読み込み、ユーザーの選択に応じて結果を表示します。
- **敬語変換練習ページ**
<br>一般的な単語（例：「言います」）を敬語（例：「申します」）に変換する練習ページを実装。
<br>正解チェックには正規表現（RegExp）を使い、入力が正しいか判定します。
- **ビジネス日本語ロールプレイ機能**
<br>画像付きのシチュエーションを用意し、ユーザーがセリフを入力。
<br>正解の形式を正規表現で判定し、自然な敬語表現が使えているかチェックできます。

## デモ
<table>
  <tr>
    <td><img src="images/login.png" width="250px"><br><sub>ログイン画面</sub></td>
    <td><img src="images/profile.png" width="250px"><br><sub>プロフィール</sub></td>
    <td><img src="images/flashcard.png" width="250px"><br><sub>フラッシュカード</sub></td>
  </tr>
  <tr>
    <td><img src="images/keigo1.png" width="250px"><br><sub>ロールプレイ1</sub></td>
    <td><img src="images/keigo2.png" width="250px"><br><sub>ロールプレイ2</sub></td>
    <td><img src="images/keigo3.png" width="250px"><br><sub>ロールプレイ3</sub></td>
  </tr>
  <tr>
    <td><img src="images/roleplay.png" width="250px"><br><sub>ロールプレイ</sub></td>
    <td><img src="images/level.png" width="250px"><br><sub>レベル選択</sub></td>
    <td><img src="images/grammar.png" width="250px"><br><sub>文法</sub></td>
  </tr>
</table>
