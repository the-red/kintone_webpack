# kintone_webpack

kintoneでwebpackを使う実用的な例です。

## 実行方法
```
$ git clone https://github.com/TheRed/kintone_webpack.git
$ cd kintone_webpack
$ yarn install
$ yarn watch
```

## 特徴
`webpack.config.js`の`output`にDropboxフォルダを指定しています。フォルダの位置を変えている場合は随時変更してね。

これでプロジェクトフォルダをどこに置いても、ビルド結果だけがDropboxと同期されるようになります！

ってことは、kintoneにDropboxリンクを指定しておけば、`yarn watch`状態で開発している最中は、即座にビルド結果がDropbox経由でkintoneに反映されるわけです！素晴らしい！！！
