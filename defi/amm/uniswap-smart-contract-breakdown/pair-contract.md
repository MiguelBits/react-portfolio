---
description: >-
  Reference:
  https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
---

# Pair Contract

## Pair Contract (LP token)

The Pair contract implements the exchange between a pair of tokens such as Dogecoin and Shiba. The full code of the Pair smart contract can be found on Github under [v2-core/contracts/UniswapV2Pair.sol](https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol)

![](<../../../.gitbook/assets/imagem (6) (1).png>)![](<../../../.gitbook/assets/imagem (5) (1).png>)****

**Note:**`UQ112x112` is a library for supporting floating numbers. Solidity does not support floats by default. This library represents floats using 224 bits. The First 112 bits are for the whole number, and the last 112 bits are for the fractional part.

It implements the `IUniswapV2Pair` interface, which is just an interface for this contract (can be found [here](https://github.com/Uniswap/v2-core/blob/master/contracts/interfaces/IUniswapV2Pair.sol)).

### Managing the funds <a href="#7d54" id="7d54"></a>

A _Uniswap_ Pair is an exchange between a pair of tokens such as Dogecoin and Shiba. These tokens are represented as `token0` and `token1` in the contract. They are the addresses of the ERC20 smart contracts that implement them.

`reserve` variables store how much of the token we have in this Pair.

![](<../../../.gitbook/assets/imagem (7) (1).png>)

The actual token is stored in the ERC20 contract of the    token itself.

The Pair contract just keeps track of the reserves. From the ERC20’s perspective, the Pair contract is just a regular user that can transfer and receive tokens, it has its own balance, etc.

![This is how funds are managed across 3 smart contracts](<../../../.gitbook/assets/imagem (4).png>)

The Pair contract calls ERC20’s functions such as `balanceOf` (with `owner=Pair contract’s address`) and `transfer` to manage the tokens (see the OP's [ERC20 Smart Contract Breakdown](https://ilamanov.medium.com/erc20-smart-contract-breakdown-9dab65cec671) if you’re confused). Here is an example of how ERC20's `transfer` function is used in the Pair contract.

![Here is an example of how ERC20's transfer function is used in the Pair contract.](<../../../.gitbook/assets/imagem (8) (1).png>)

**Note:** See [https://solidity-by-example.org/function-selector/](https://solidity-by-example.org/function-selector/) if you are confused with **Function Selector.**

The `_update` function below is called whenever there are **new funds deposited or withdrawn** by the **liquidity providers** or **tokens are swapped** by the traders.

![](<../../../.gitbook/assets/imagem (9) (1).png>)

A few things happening in this function:

* `balance0` and `balance1` are the balances of tokens in the ERC20. They are the return value of ERC20’s `balanceOf` function.
* `_reserve0` and `_reserve1` are _Uniswap_’s previously known balances (last time `balanceOf` was checked).
* All we do in this function is check for overflow (line 74), **update price oracle**, **update reserves**, and update a **`Sync` event**.

**Note:** What’s the difference between the arguments `_reserve0, _reserve1` and the stored variables `reserve0, reserve1` (shown below)? They are essentially the same. The callers of the `_update` function already have read the `reserve` variables from storage and just pass them as arguments to the `_update` function. This is just a way to save on gas. Reading from storage is more expensive than reading from memory.

### Minting and Burning <a href="#64ce" id="64ce"></a>

Now onto the next functionality — minting and burning. Minting is when a liquidity provider adds funds to the pool and as a result, new pool ownership tokens are minted (created out of thin air) for the liquidity provider. Burning is the opposite — liquidity provider withdraws funds (and the accumulated rewards) and his pool ownership tokens are burned (destroyed).

Let’s take a look at the **`mint` ** function:

![](../../../.gitbook/assets/imagem.png)

* We read the balances of our contract (the **Pair contract**) on lines 112 and 113 and then calculate the amount of each token that was deposited.
* `totalSupply` indicates the total supply of the pool ownership tokens and is a stored variable in the `UniswapV2ERC20` contract (see OP's breakdown of it [here](https://ilamanov.medium.com/erc20-smart-contract-breakdown-9dab65cec671)). The **Pair contract** extends `UniswapV2ERC20` which is why it has access to the `totalSupply` variable.
* If `totalSupply` is 0, it means that this pool is brand new and we need to lock in `MINIMIUM_LIQUIDITY` amount of pool ownership tokens to avoid division by zero in the liquidity calculations. The way it’s locked in is by sending it to the address zero.&#x20;
* **`liquidity` variable is the amount of new pool ownership tokens that need to be minted to the liquidity provider**. The liquidity provider gets a proportional amount of pool ownership tokens depending on how much new funds he provides (line 123).
* We finally mint new pool ownership tokens to the `to` address (line 126). `to` is the address of the liquidity provider (this will be provided by the Periphery contract called the Router which calls the `mint` function).

**The way adding funds works is:** they are just deposited to the ERC20 contracts (by calling `transfer(from: liquidity provider’s address, to: Pair contract’s address, amount)` for each token). Then the Pair contract will read the balances (lines 112 and 113) and compare them to the last known balances (lines 114 and 115). This is how the Pair contract can deduce the amounts deposited.

The **`burn` ** function is just the mirror image of the `mint` function:

![](<../../../.gitbook/assets/imagem (2).png>)

* `balance0` and `balance1` are total balances of the tokens in this pool. `liquidity` is the amount of pool ownership tokens that the liquidity provider (who wishes to cash out) has.&#x20;
* The liquidity was transferred to the **Pair contract** by the **Periphery contract** before calling the `burn` function.
* We calculate the amounts of tokens to **withdraw to the liquidity provider** proportionally to how much liquidity (pool ownership tokens) he has (lines 144 and 145).
* **Rewards** to the liquidity provider are automatically withdrawn along with his funds. The math makes sure that rewards are accumulated properly and that you get more than you deposited.

### swapping, pool ownership tokens, protocol fee, and price oracle

## Swapping <a href="#5d59" id="5d59"></a>

The`swap` function is used by traders to swap tokens:

![](<../../../.gitbook/assets/imagem (10).png>)

* On lines 170 and 171, **we transfer tokens out (to the trader) optimistically** (without making sure that the trader has already transferred corresponding tokens into our balance. We can optimistically transfer tokens out because we have **assertions** later in the function to check if we received corresponding tokens (the **Periphery contract** should send us the tokens before calling us for the swap). If we have not, assertions will fail and Solidity will revert the entire function.
* Line 172 will inform the receiver about the swap if requested.
* Then on lines 176 and 177 we actually check how many <mark style="color:purple;">tokens we received</mark>. We assert that we <mark style="color:purple;">received ></mark> **** <mark style="color:purple;">0</mark> amount for at least one token on line 178. If this assertion fails, the entire function will revert and nothing will have taken place.
* Then, on lines 180 and 181, we <mark style="color:purple;">subtract the trading fee (0.3%)</mark> from the balance, and on line 182 <mark style="color:purple;">check if the k value (x\*y=k) has decreased after the trade.</mark> The k value can never decrease because otherwise, _Uniswap_ would lose from the swap.
* Finally, we update our known reserves with the new balances and emit a `Swap` event.

### A note about fees and rewards <a href="#c062" id="c062"></a>

_Uniswap_ works by taking a small percentage (0.3%) **fee** from the traders on each trade. It then later (optionally) takes **some of those fees** (1/6th) to itself and distributes the rest to the liquidity providers in proportion to how much the liquidity provider contributed to the pool. Which are stored right in the pool itself.

When traders pay their fee, this fee is added to the pool. Later when liquidity providers either add or withdraw funds, the liquidity provider's rewards are calculated using complicated math formulas.

### Pool ownership tokens <a href="#40d7" id="40d7"></a>

When liquidity providers add funds to the pool, they are given pool ownership tokens. After some time, these ownership tokens gain in value due to traders’ fees. When the tokens are exchanged back, liquidity providers get more than they deposited.

The pool ownership tokens are implemented as a standard ERC20 token. It’s implemented in the `UniswapV2ERC20.sol` contract of _Uniswap_ ( [v2-core/contracts/UniswapV2ERC20.sol](https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2ERC20.sol)).

The **Pair contract gets access to the ERC20 implementation** by extending it:

![That way the Pair contract gets access to ERC20’s \_mint and \_burnfunctions](<../../../.gitbook/assets/imagem (7).png>)

### Protocol fee <a href="#dd87" id="dd87"></a>

_Uniswap_ v2 introduced a switchable protocol fee — a fee that can be turned on/off by _Uniswap_ which goes to _Uniswap_ for maintaining the service. It’s equal to 1/6th of the fees paid by the traders. Let’s examine how the protocol fee is handled in the **Pair contract.**

The main function of the protocol fee is `_mintFee`:

![](<../../../.gitbook/assets/imagem (12).png>)

* We first get the `feeTo` address from the `factory`. `factory` is the contract that created this Pair contract.
* If it’s set to something other than address zero, that means the protocol fee is on. `feeTo` address indicated the address where the protocol fee should be sent to.
* If the fee is on, we mint some liquidity to the `feeTo` address. (`_mint` function is the ERC20’s `_mint` function)
* The rest of the code is for calculating `liquidity`. Liquidity here indicates the amount of new pool ownership tokens that need to be minted to the `feeTo` address. This is how Uniswap implements the protocol fees: it just mints new pool ownership tokens to itself. That, in effect, dilutes everyone else in the pool (the liquidity providers).

Protocol fee is accumulated during trades into the pool so the pool becomes a mix of the exchange tokens, protocol fees, and rewards for liquidity providers. Clever math formulas allow us to calculate how much of each constituent there is.

The protocol fee, in particular, is calculated using a complicated formula which you can find in the [Uniswap V2 whitepaper](https://uniswap.org/whitepaper.pdf):

![](<../../../.gitbook/assets/imagem (8).png>)

The **k** value here is the product of the reserves **(k=x\*y)**. This is why we keep track of the `kLast` value throughout the code: `kLast` value allows us to calculate the total accumulated protocol fee (from every trade) so far and collect all this fee in one go either in mint or burn functions.

### Price oracle <a href="#f46a" id="f46a"></a>

_Uniswap_ implements a price oracle that can be used by other smart contracts in the Ethereum ecosystem to query the price of tokens relative to each other.

To implement the price oracle, _Uniswap_ uses only 3 variables: `price0CumulativeLast`, `price1CumulativeLast`, and `blockTimestampLast`

![](<../../../.gitbook/assets/imagem (1).png>)

The relative price can be calculated by subtracting cumulative prices at 2 points in time and dividing by the elapsed time. Check the [Uniswap whitepaper’s](https://uniswap.org/whitepaper.pdf) “Price oracle” section for more details.

The variables are updated only once per block here:

![](<../../../.gitbook/assets/imagem (6).png>)

* Lines 75–77 calculate whether this is the first time the code is executed in a particular block.
* Why do we update values only once per block? Because it’s harder that way for someone to manipulate prices in order to gain something. See the “Price oracle” section of the [Uniswap whitepaper](https://uniswap.org/whitepaper.pdf) for more details on these price manipulators.

![](<../../../.gitbook/assets/imagem (11).png>)

A liquidity event is when funds are either added or withdrawn by the liquidity providers.

![](https://miro.medium.com/max/1400/1\*n4XqAf5X07\_Kc3EbU9Z\_Pw@2x.png)

`lock` is for guarding against [reentrancy abuse](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Essentially this function modifier prevents 2 different parts of this contract to be executed simultaneously. It kinda makes the contract execute with a single thread.

![](https://miro.medium.com/max/1400/1\*PWYg0GA-6DtEt\_dyjTpW3A@2x.png)

**skim and `sync`** are needed when **balances** on the **ERC20** contracts of the exchange tokens, fall out of sync with the `reserve` variables in the Pair contract. This can happen for example when someone just transfers some Dogecoin to Pair contract’s account for no reason. There are 2 solutions to keep reserve variables in sync with the actual balances on ERC20 contracts:

* `skim` allows someone to withdraw the extra funds from the ERC20 contract. Anyone can call this function!
* `sync` updates the `reserve` variables to match the balances.
