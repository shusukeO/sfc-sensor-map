# sfc-sensor-map

sfc 内に設置された環境センサーデータを視覚化するサイト

## 表示するセンサーの追加方法

js/sensorsData.js に sox に登録されているデバイス名、設置場所の緯度経度を書き加える。緯度経度は Google マップ上で、該当地点を右クリックで取得できる。

```js
{
  name: "登録されているデバイス名",
  label: "表示名",
  location: [緯度, 経度],
},
```
