---
description: >-
  Reference:
  https://betterprogramming.pub/uniswap-smart-contract-breakdown-ea20edf1a0ff
---

# Uniswap Smart Contract Breakdown

Now that we know how to work with the constant product formula (x\*y=k) that powers _Uniswap_.

## How Uniswap code is organized <a href="#e03a" id="e03a"></a>

_Uniswap_ has 4 smart contracts in total. They are divided into **core** and **periphery**.

1. **Core** is for storing the funds (the tokens) and exposing functions for swapping tokens, adding funds, getting rewards, etc.
2. **Periphery** is for interacting with the **core**.

![](<../../../.gitbook/assets/imagem (3).png>)

**Core** consists of the following smart contracts:

1. **Pair** — a smart contract that implements the functionality for swapping, minting, burning of tokens. This contract is created for every exchange pair like _Dogecoin ↔ Shiba_.
2. **Factory** — creates and keeps track of all Pair contracts
3. **ERC20** — for keeping track of ownership of pool. Think of the pool as a property. When liquidity providers provide funds to the pool, they get “pool ownership tokens” in return. These ownership tokens earn rewards (by traders paying a small percentage for each trade). When liquidity providers want their funds back, they just submit the ownership tokens back and get their funds + the rewards that were accumulated. The **ERC20** contract keeps track of the ownership tokens.

**Periphery** consists of just one smart contract:

1. **Router** is for interacting with the core. Provides functions such as `swapExactETHForTokens`, `swapETHForExactTokens`, etc.
