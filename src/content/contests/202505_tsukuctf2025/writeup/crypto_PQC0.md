---
contest: 202505_tsukuctf2025
title: PQC0
category: crypto
# membersにある自分の名前
author: chizuchizu
---

### 問題

PQC(ポスト量子暗号)を使ってみました!

```python
# REQUIRED: OpenSSL 3.5.0

import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

flag = "TsukuCTF25{hoge}"

# generate private key
os.system("openssl genpkey -algorithm ML-KEM-768 -out priv-ml-kem-768.pem")
# generate public key
os.system("openssl pkey -in priv-ml-kem-768.pem -pubout -out pub-ml-kem-768.pem")
# generate shared secret
os.system("openssl pkeyutl -encap -inkey pub-ml-kem-768.pem -secret shared.dat -out ciphertext.dat")

with open("priv-ml-kem-768.pem", "rb") as f:
    private_key = f.read()

print("==== private_key ====")
print(private_key.decode())

with open("ciphertext.dat", "rb") as f:
    ciphertext = f.read()

print("==== ciphertext(hex) ====")
print(ciphertext.hex())

with open("shared.dat", "rb") as f:
    shared_secret = f.read()

encrypted_flag = AES.new(shared_secret, AES.MODE_ECB).encrypt(pad(flag, 16))

print("==== encrypted_flag(hex) ====")
print(encrypted_flag.hex())
```
outputは長いので省略する。
```output.txt
==== private_key ====
-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----

==== ciphertext(hex) ====
83d...7ab65
==== encrypted_flag(hex) ====
5f2b9c04a67523dac3e0b0d17f79aa2879f91ad60ba8d822869ece010a7f78f349ab75794ff4cb08819d79c9f44467bd    
```

### 解法

大会中は自分のOpenSSLが3.4.xのためにderyptできなくてAIに書いてもらったPythonスクリプトで正解した。
それじゃWriteupとして情報量がないので正攻法でやってみる。

OpenSSLをビルドした。

[Downloads | OpenSSL Library](https://openssl-library.org/source/)

本当は./Configureの時点でprefixを設定して/usr/localにバイナリを置かないようにするべきだと思う。
```bash
wget https://github.com/openssl/openssl/releases/download/openssl-3.5.0/openssl-3.5.0.tar.gz
tar zxvf openssl-3.5.0.tar.gz
cd openssl-3.5.0
./Configure
make
make install
```

あとは`xxd`を使ってhexをバイナリになおしてopensslで復号する。

- priv.pem
- ct.bin

```bash
xxd -r -p flag.hex > flag.enc
```

```bash
/usr/local/bin/openssl pkeyutl -decap -inkey priv.pem -in ct.bin -out shared.dat
```

最後にAESでフラグを復号して終わり。

```python
from Crypto.Cipher import AES

with open("shared.dat", "rb") as f:
    shared_secret = f.read()

encrypted_flag = bytes.fromhex("5f2b9c04a67523dac3e0b0d17f79aa2879f91ad60ba8d822869ece010a7f78f349ab75794ff4cb08819d79c9f44467bd")
flag = AES.new(shared_secret, AES.MODE_ECB).decrypt(encrypted_flag)

print(flag.decode())
```
`TsukuCTF25{W3lc0me_t0_PQC_w0r1d!!!}`

初めてOpenSSLをビルドして良い経験になった。