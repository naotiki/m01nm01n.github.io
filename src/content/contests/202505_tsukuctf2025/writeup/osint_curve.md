---
contest: 202505_tsukuctf2025
title: curve
category: osint
# membersにある自分の名前
author: naotiki
---
### 問題
これは日本の有名な場所の一部です。あなたはこの写真の違和感に気づけますか？
フラグはこの場所のWebサイトのドメインです。
例: `TsukuCTF25{example.com}`

![curve "width=30vmax;margin=auto"](./images/curve.jpg)

Google Lensで調べると、どうやらスパイラルエスカレーターという珍しいエスカレーターらしい

スパイラルエスカレーターで検索して画像を漁っていると・・・

![google screenshot "width=30vmax;margin=auto"](./images/curve_2.png)

エスカレーターの警告表示(?)が似ている

https://ameblo.jp/umaleeno/entry-12876405935.html

「ランドマークタワー」という場所らしい

https://www.yokohama-landmark.jp/

`TsukuCTF25{www.yokohama-landmark.jp}`