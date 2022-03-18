---
description: >-
  Reference:
  https://github.com/Uniswap/v2-periphery/blob/master/contracts/UniswapV2Router02.sol
---

# Router Contract

The **Periphery contract is the API for **_**Uniswap**_**.** You could call the Core contracts directly but that’s more complicated (periphery provides wrapper functions) and more dangerous (you could lose money if you’re not careful).

Let’s break down the Router contract which is the only contract in the periphery. It can be found at [v2-periphery/contracts/UniswapV2Router02.sol](https://github.com/Uniswap/v2-periphery/blob/master/contracts/UniswapV2Router02.sol).

* This contract has a bunch of similar functions for adding liquidity, removing liquidity, and swapping tokens. Different variants of functions are for different trading/liquidity preferences.
* I removed the body of most functions because they are pretty similar.
* From the [Ethereum website](https://ethereum.org/en/developers/tutorials/uniswap-v2-annotated-code/#UniswapV2Router01): `UniswapV2Router01` has problems and should no longer be used.
