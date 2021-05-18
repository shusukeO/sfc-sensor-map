# sfc-sensor-map

sfc 内に設置された環境センサーデータを視覚化するサイト

## 表示するセンサーの追加方法

js/sensorsData.js に sox に登録されているデバイス名、設置場所の緯度経度を書き加える。緯度経度は Google マップ上で、該当地点を右クリックで取得できる。

```js
{
  name: "登録されているデバイス名",
  label: "ウェブ上での表示名",
  location: [緯度, 経度],
},
```

![画面収録 2021-02-27 9 19 45 mov](https://user-images.githubusercontent.com/56382189/118574399-4b022380-b7bf-11eb-9238-3547b2b91ab7.gif)
