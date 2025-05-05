---
contest: 202505_tsukuctf2025
title: xortsukuctf
category: crypto
# membersにある自分の名前
author: chizuchizu
---

### 問題

つくし君とじゃんけんしよう。負けてもチャンスはいっぱいあるよ！ フラグフォーマットは TsukuCTF25{} です。

```python
import os
import secrets
import signal

FLAG = os.getenv("FLAG", "TsukuCTF25{dummy_flag}")

class xor_tsuku_shift:
    def __init__(self, seed):
        self.a = seed

    def shift(self):
        self.a ^= (self.a << 17) & 0xFFFFFFFFFFFFFFFF
        self.a ^= (self.a >> 9) & 0xFFFFFFFFFFFFFFFF
        self.a ^= (self.a << 18) & 0xFFFFFFFFFFFFFFFF
        return self.a & 0xFFFFFFFFFFFFFFFF

def janken(a, b):
    return (a-b+3) % 3

rng = xor_tsuku_shift(seed=secrets.randbits(64))

signal.alarm(600)

print("Tsukushi: Let's play janken!")
print("Tsukushi: Win 294 times in a row and you'll get the flag.")

for challenge in range(300):
    print(f"Tsukushi: You have {300-challenge:03} tries.")
    for round in range(294):
        print(f"--- Round {round:03} ---")
        tsukushi = rng.shift()
        you = int(input("Rock, Paper, Scissors... Go! (Rock: 0, Paper: 1, Scissors: 2): "))

        if you != 0 and you != 1 and you != 2:
            print("Tsukushi: Hey, you cheated!")
            break

        result = janken(you, tsukushi)

        if result == 1:
            print("Tsukushi: You win!")
            if round != 293:
                print("Tsukushi: Let's go to the next round!")
        elif result == 0:
            print("Tsukushi: Draw! ...But If you wanna get the flag, you have to win 294 rounds in a row.")
            break
        else:
            print("Tsukushi: You lose!")
            break

    else:
        print("Tsukushi: You won 294 times in a row?! That's incredible!")
        print(f"Tsukushi: So, here is the flag. {FLAG}")
        quit()

else:
    print("Tsukushi: GGEZ, Bye!")
```

### 解法

294回連続で勝てばいいらしい。じゃんけんで出す手が謎のXOR Shiftによって定義されている。
AIはSATだといって解こうとしたが計算が終わらず終了。

もう一回AIに投げたらじゃんけんの手が280回の周期でループするらしい?????　実験すればよかった。

AIにexploitを書いてもらった。280回勝つ手を記録し、新しいゲームで294回勝つ手を出し続ける。

```python
from pwn import *
import re

HOST, PORT = "challs.tsukuctf.org", 30057
PROMPT   = b"(Rock: 0, Paper: 1, Scissors: 2): "

def recv_prompt(r):
    r.recvuntil(PROMPT)

def parse_result(line: bytes) -> int:
    s = line.decode()
    if   "You win"   in s: return 1
    elif "Draw"      in s: return 0
    elif "You lose"  in s: return 2
    else: raise ValueError("unexpected server output")

def main():
    r = remote(HOST, PORT)
    cycle = []

    # ------- Phase 1 : collect 280 outputs mod 3 -------
    while len(cycle) < 280:
        recv_prompt(r)
        r.sendline(b"0")          # always Rock
        res = parse_result(r.recvline())
        ts = (-res) % 3           # tsukushi mod 3; because we played 0
        cycle.append(ts)
        print(len(cycle))
        if res != 1:              # lost / draw → next try block
            continue

    # ------- Phase 2 : exit the current try block -------
    # send an illegal value (“cheat”) to force a break
    recv_prompt(r)
    r.sendline(b"3")              # triggers "Hey, you cheated!"
    print("done")
    r.recvuntil(b"cheated!")      # flush current block

    # RNG has advanced exactly one extra step we didn't record
    offset = 1                    # we start at cycle[1]
    recv_prompt(r)                # first prompt of the new try

    # ------- Phase 3 : 294 perfect moves -------
    for i in range(294):
        print(i)
        ts = cycle[(i + offset) % 280]
        you = (ts + 1) % 3        # the winning move
        r.sendline(str(you).encode())

        res = parse_result(r.recvline())
        if res != 1:
            print("alignment failed :(")
            return

        if i != 293:              # skip "next round!" etc.
            recv_prompt(r)

    # flag line appears after the inner loop finishes
    print(r.recvall().decode())

if __name__ == "__main__":
    main()
```

ほえーーーというのと、実験することは大事なんだなぁと思った。