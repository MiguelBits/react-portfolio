---
description: >-
  Reference:
  https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
---

# Pair Contract

## Pair Contract (LP token)

The Pair contract implements the exchange between a pair of tokens such as Dogecoin and Shiba. The full code of the Pair smart contract can be found on Github under [v2-core/contracts/UniswapV2Pair.sol](https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol)

![](<../../../.gitbook/assets/imagem (6).png>)![](<../../../.gitbook/assets/imagem (5).png>)****

**Note:**`UQ112x112` is a library for supporting floating numbers. Solidity does not support floats by default. This library represents floats using 224 bits. The First 112 bits are for the whole number, and the last 112 bits are for the fractional part.

It implements the `IUniswapV2Pair` interface, which is just an interface for this contract (can be found [here](https://github.com/Uniswap/v2-core/blob/master/contracts/interfaces/IUniswapV2Pair.sol)).

### Managing the funds <a href="#7d54" id="7d54"></a>

A _Uniswap_ Pair is an exchange between a pair of tokens such as Dogecoin and Shiba. These tokens are represented as `token0` and `token1` in the contract. They are the addresses of the ERC20 smart contracts that implement them.

`reserve` variables store how much of the token we have in this Pair.

![](<../../../.gitbook/assets/imagem (7).png>)

The actual token is stored in the ERC20 contract of the    token itself.

The Pair contract just keeps track of the reserves. From the ERC20’s perspective, the Pair contract is just a regular user that can transfer and receive tokens, it has its own balance, etc.

![This is how funds are managed across 3 smart contracts](<../../../.gitbook/assets/imagem (4).png>)

The Pair contract calls ERC20’s functions such as `balanceOf` (with `owner=Pair contract’s address`) and `transfer` to manage the tokens (see the OP's [ERC20 Smart Contract Breakdown](https://ilamanov.medium.com/erc20-smart-contract-breakdown-9dab65cec671) if you’re confused). Here is an example of how ERC20's `transfer` function is used in the Pair contract.

![Here is an example of how ERC20's transfer function is used in the Pair contract.](<../../../.gitbook/assets/imagem (8).png>)

**Note:** See [https://solidity-by-example.org/function-selector/](https://solidity-by-example.org/function-selector/) if you are confused with **Function Selector.**

The `_update` function below is called whenever there are **new funds deposited or withdrawn** by the **liquidity providers** or **tokens are swapped** by the traders.

![](<../../../.gitbook/assets/imagem (9).png>)

A few things happening in this function:

* `balance0` and `balance1` are the balances of tokens in the ERC20. They are the return value of ERC20’s `balanceOf` function.
* `_reserve0` and `_reserve1` are _Uniswap_’s previously known balances (last time `balanceOf` was checked).
* All we do in this function is check for overflow (line 74), **update price oracle**, **update reserves**, and update a **`Sync` event**.

**Note:** What’s the difference between the arguments `_reserve0, _reserve1` and the stored variables `reserve0, reserve1` (shown below)? They are essentially the same. The callers of the `_update` function already have read the `reserve` variables from storage and just pass them as arguments to the `_update` function. This is just a way to save on gas. Reading from storage is more expensive than reading from memory.

### Minting and Burning <a href="#64ce" id="64ce"></a>

Now onto the next functionality — minting and burning. Minting is when a liquidity provider adds funds to the pool and as a result, new pool ownership tokens are minted (created out of thin air) for the liquidity provider. Burning is the opposite — liquidity provider withdraws funds (and the accumulated rewards) and his pool ownership tokens are burned (destroyed).

Let’s take a look at the `mint` function:

![](../../../.gitbook/assets/imagem.png)

* We read the balances of our contract (the **Pair contract**) on lines 112 and 113 and then calculate the amount of each token that was deposited.
* `totalSupply` indicates the total supply of the pool ownership tokens and is a stored variable in the `UniswapV2ERC20` contract (see OP's breakdown of it [here](https://ilamanov.medium.com/erc20-smart-contract-breakdown-9dab65cec671)). The **Pair contract** extends `UniswapV2ERC20` which is why it has access to the `totalSupply` variable.
* If `totalSupply` is 0, it means that this pool is brand new and we need to lock in `MINIMIUM_LIQUIDITY` amount of pool ownership tokens to avoid division by zero in the liquidity calculations. The way it’s locked in is by sending it to the address zero.&#x20;
* **`liquidity` variable is the amount of new pool ownership tokens that need to be minted to the liquidity provider**. The liquidity provider gets a proportional amount of pool ownership tokens depending on how much new funds he provides (line 123).
* We finally mint new pool ownership tokens to the `to` address (line 126). `to` is the address of the liquidity provider (this will be provided by the Periphery contract called the Router which calls the `mint` function).

**The way adding funds works is:** they are just deposited to the ERC20 contracts (by calling `transfer(from: liquidity provider’s address, to: Pair contract’s address, amount)` for each token). Then the Pair contract will read the balances (lines 112 and 113) and compare them to the last known balances (lines 114 and 115). This is how the Pair contract can deduce the amounts deposited.

The `burn` function is just the mirror image of the `mint` function:

![](<../../../.gitbook/assets/imagem (2).png>)



* `balance0` and `balance1` are total balances of the tokens in this pool. `liquidity` is the amount of pool ownership tokens that the liquidity provider (who wishes to cash out) has.&#x20;
* The liquidity was transferred to the **Pair contract** by the **Periphery contract** before calling the `burn` function.
* We calculate the amounts of tokens to **withdraw to the liquidity provider** proportionally to how much liquidity (pool ownership tokens) he has (lines 144 and 145).
* **Rewards** to the liquidity provider are automatically withdrawn along with his funds. The math makes sure that rewards are accumulated properly and that you get more than you deposited.

### swapping, pool ownership tokens, protocol fee, and price oracle

