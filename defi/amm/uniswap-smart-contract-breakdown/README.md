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



### A note on the market dynamics <a href="#c4b6" id="c4b6"></a>

_Uniswap_ prices tokens according to the proportion of them in the pool. The greater disbalance of them in the pool the greater the price difference (in favor of the rarer token).

But how does _Uniswap_ make sure that the relative price of tokens in the pool matches the market rate? **Arbitrage**. _Uniswap_ takes advantage of arbitrage to ensure the prices in the pool closely track the market prices.

Arbitrage is when a smart investor sees a discrepancy between the market rate and Uniswap exchange rate, he will use it to make a profit and as a result, bring the Unsiwap rate closer to the market rate.

For example, if _Uniswap_ offered a lower _Dogecoin-to-Shiba_ price compared to the market rate, a smart investor would exchange his _Shiba_ for _Dogecoin_ on _Uniswap_ and sell the _Dogecoin_ at a higher price in the market. He will have made a profit and as a result, brought the _Unsiwap_ rate closer to the market rate because he decreased the supply of _Dogecoin_ and increased the supply of _Shiba_ in the _Uniswap_ pool (_Dogecoin-to-Shiba_ price will increase because of how _Uniswap_ price tokens relative to each other).

This will continue until the _Uniswap_ rate matches the market rate. Thus _Uniswap_ rate tends to closely track the market rate and that’s why it can be used as an on-chain price oracle.

* As [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf) put it: The first liquidity provider to join a pool sets the initial exchange rate by depositing what they believe to be an equivalent value of _ETH_ and ERC20 tokens. If this ratio is off, arbitrage traders will bring the prices to equilibrium at the expense of the initial liquidity provider.
* And [Uniswap v1 whitepaper](https://hackmd.io/@HaydenAdams/HJ9jLsfTz?type=view) put it: Large trades cause price slippage as well, but **arbitrage** will ensure that the price will not shift too far from that of other exchanges.
