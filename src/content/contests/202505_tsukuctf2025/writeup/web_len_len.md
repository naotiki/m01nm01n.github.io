---
# ../../のフォルダ名
contest: 202505_tsukuctf2025
# 任意
title: len_len
# src/content.config.tsにあるカテゴリ名を使用。 先頭に+をつけると任意のカテゴリ名を使用可能だが非推奨
# 例: category: +brainrot
category: web
# membersにある自分の名前
author: naotiki
---
expressで書かれたAPIがあり、`array`に何かを入れ、長さが0未満だとフラグをくれるっぽい
```js {7}
function chall(str = "[1, 2, 3]") {
  const sanitized = str.replaceAll(" ", "");
  if (sanitized.length < 10) {
    return `error: no flag for you. sanitized string is ${sanitized}, length is ${sanitized.length.toString()}`;
  }
  const array = JSON.parse(sanitized);
  if (array.length < 0) {
    // hmm...??
    return FLAG;
  }
  return `error: no flag for you. array length is too long -> ${array.length}`;
}
```

配列のみ入力しろとは言ってないので、`length`が`-1`になる何かを入れれば良い。


```sh
curl -X POST -d 'array={"length":-1}' http://challs.tsukuctf.org:28888
```

`TsukuCTF25{l4n_l1n_lun_l4n_l0n}`