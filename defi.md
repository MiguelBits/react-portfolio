---
description: 'Reference: https://medium.com/coinmonks/dexs-and-amms-c79bce065703'
---

# DeFi

## Decentralized Finance

A [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex) (aka decentralized exchange) is a platform that enables trading your tokens without an intermediary (e.g. centralized exchange).

There are two main types of [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s: **Order book based** and **Liquidity pool based.**

### Order Book Based DEX <a href="#881e" id="881e"></a>

An order book based [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s operate similarly to [CEX](https://coinmarketcap.com/alexandria/glossary/centralized-exchange-cex%C3%BA%C5%B1)s, where users can buy and sell orders at their chosen prices. The main difference is that in a [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex) the assets are held in the users wallets, not in exchange wallets.

Order books [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s can be either on or off-chain. [Off-chain order book](https://www.argent.xyz/learn/what-are-off-chain-order-book-dexs/) are more efficient, trades remain off-chain (e.g. on a server) until they are matched and executed on-chain. [dYdX](https://dydx.exchange/), [DeversiFi](https://deversifi.com/), [Serum](https://www.projectserum.com/) are some of the most popular [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s of this type.

### Liquidity Pool Based DEXs <a href="#8e23" id="8e23"></a>

To understand [LP](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity) Based [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s, first we need to understand what a [liquidity pool](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity) is.

[Liquidity pools](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity) are pools of tokens that sit in a [smart contract](https://www.investopedia.com/terms/s/smart-contracts.asp) ready to be exchanged for their pair tokens.

Typically an [LP](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity) holds 2 tokens and each pool has a market for that pair of tokens. Gravely simplified: when you want to swap [ETH](https://ethereum.org/en/eth/) to [USDC](https://coinmarketcap.com/hu/currencies/usd-coin/) on [Uniswap](https://app.uniswap.org/#/swap), you take out [USDC](https://coinmarketcap.com/hu/currencies/usd-coin/) and give [ETH](https://ethereum.org/en/eth/) to the ETH/USDC pool.

Most [liquidity pool](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity)-based [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s use Automated Market Makers ([AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7)) which predefines asset prices algorithmically. AMM is one of the most innovative inventions of [DeFi](https://www.coindesk.com/learn/what-is-defi/) as it achieves high efficiency. The majority of [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s are [AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7)-based like [Uniswap](https://app.uniswap.org/#/swap), [Curve](https://curve.fi/), [Balancer](https://app.balancer.fi/#/), [Bancor](https://www.bancor.network/), [TerraSwap](https://app.terraswap.io/) and [Raydium](https://raydium.io/).

### Automated Market Makers (AMM) <a href="#0d7a" id="0d7a"></a>

Orders are executed automatically via a [smart contract](https://www.investopedia.com/terms/s/smart-contracts.asp) that will calculate trade prices.

[AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7) is a mathematical function to price assets algorithmically based on [liquidity pools](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity). There are several [AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7) formulas, but we will focus on Constant Product Market Maker, as it is the most widely used.

![](<.gitbook/assets/imagem (6) (1) (1) (1).png>)Image from [Crypto Robin](https://cryptorobin.com/)

### Constant Product Market Maker <a href="#744f" id="744f"></a>

**`x * y = k`**

Popularized by [Uniswap](https://app.uniswap.org/#/swap), x and y represent the quantity of two tokens in the [liquidity pool](https://www.gemini.com/cryptopedia/what-is-a-liquidity-pool-crypto-market-liquidity), and k represents the product. The formula helps create a range of prices for the two tokens depending on the available quantities. To maintain k as constant, when the supply of x increases, the supply of y must decrease.

There are 22,538 [WETH](https://weth.io/) and 88,378,445 [USDT](https://coinmarketcap.com/hu/currencies/tether/) in [Uniswap’s WETH/USDT liquidity pool](https://pools.fyi/#/returns/0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852) as of 19 December 2021. The ratio implies that **ETH**’s price is at 88,378,445 / 22,538 = 3921 **USDT**.

Let’s assume [ETH](https://ethereum.org/en/eth/)’s price would drop to 3821 [USDT](https://coinmarketcap.com/hu/currencies/tether/) on another protocol like SushiSwap. [Arbitrageurs](https://www.investopedia.com/terms/a/arbitrageur.asp) will take advantage of the price difference by buying cheap [ETH](https://ethereum.org/en/eth/) on an exchange like [SushiSwap](https://app.sushi.com/swap) and selling it for a profit on [Uniswap](https://pools.fyi/#/returns/0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852). [Arbitrageurs](https://www.investopedia.com/terms/a/arbitrageur.asp) repeat this until the price is equal on both exchanges. This brings price stability across [DeFi](https://www.coindesk.com/learn/what-is-defi/) protocols.

## Popular Automated Market Makers <a href="#0cc6" id="0cc6"></a>

### Uniswap <a href="#df39" id="df39"></a>

The pink unicorn’s journey started when [Uniswap version 1](https://docs.uniswap.org/protocol/V1/introduction) was deployed on Ethereum in November 2018. From their launch to today they remained one of the top [AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7)s. [Uniswap](https://pools.fyi/#/returns/0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852) popularized the Constant Product Market Maker formula (x \* y = k). On 2021 May 5, they launched their latest iteration, [Uniswap version 3](https://www.youtube.com/watch?v=Ehm-OYBmlPM), which introduced new features such as [concentrated liquidity](https://docs.uniswap.org/protocol/concepts/V3-overview/concentrated-liquidity) and [multiple fee tiers](https://help.uniswap.org/en/articles/5391541-provide-liquidity-on-uniswap-v3). [Uniswap](https://pools.fyi/#/returns/0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852) is the second largest [DEX](https://cointelegraph.com/defi-101/what-are-decentralized-exchanges-and-how-do-dexs-work) by Total value locked ([TVL](https://coinmarketcap.com/alexandria/glossary/total-value-locked-tvl)), only to be dethroned by [Curve Finance](https://curve.fi/).

### Curve Finance <a href="#f25b" id="f25b"></a>

[Curve](https://curve.fi/) is a [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex) designed for efficient trading between similar assets. This is useful for the ecosystem as there are plenty of [wrapped](https://academy.binance.com/en/articles/what-are-wrapped-tokens) or [synthetic tokens](https://docs.umaproject.org/synthetic-tokens/what-are-synthetic-assets) that need their prices to be the same as their mimicked asset. Curve uses the [Stableswap Invariant](https://curve.readthedocs.io/exchange-overview.html) [AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7) formula and was the first to introduce [base pools and metapools](https://resources.curve.fi/faq/base-and-metapools). Currently [Curve Finance](https://curve.fi/) has the largest [TVL](https://coinmarketcap.com/alexandria/glossary/total-value-locked-tvl) among all [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s.

## Risks to be aware of when using AMMs <a href="#07db" id="07db"></a>

### Impermanent Loss <a href="#c981" id="c981"></a>

Impermanent loss is the loss of profit compared to holding the token versus providing [liquidity](https://www.investopedia.com/terms/l/liquidity.asp). Your loss becomes permanent when you remove your tokens from the pool.

### Price slippage and Front running <a href="#c9db" id="c9db"></a>

[Price slippage](https://www.angelone.in/knowledge-center/online-share-trading/slippage-trading) is the difference between the expected price and the price when the trade is executed. Slippage is the highest when there’s little amount of [liquidity](https://www.investopedia.com/terms/l/liquidity.asp) in the pool and when a large order is executed. Low [liquidity](https://www.investopedia.com/terms/l/liquidity.asp) + Large orders = Bad news aka High [Price Slippage](https://www.angelone.in/knowledge-center/online-share-trading/slippage-trading). You can set your slippage tolerance in most [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s, the lower (<1%) the better.

Orders made on an [AMM](https://medium.com/balancer-protocol/what-is-an-automated-market-maker-amm-588954fc5ff7) are broadcasted to the blockchain for everyone. **** [**Front-runner bots**](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest) **** make a profit by picking orders and [front-running](https://www.youtube.com/watch?v=UZ-NNd6yjFM) them by placing a higher transaction fee to have their order mined faster than yours, raising the price you have to pay for the asset and then selling it after you bought for a higher price. This is known as a **** [**Sandwich Attack**](https://coinmarketcap.com/alexandria/article/what-are-sandwich-attacks-in-defi-and-how-can-you-avoid-them). There are some [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex)s now that offer protection against this attack like [CowSwap](https://cowswap.exchange/#/swap).

![](<.gitbook/assets/imagem (2) (1).png>)Front running from [blog.enigma.co](https://blog.enigma.co/preventing-dex-front-running-with-enigma-df3f0b5b9e78)

