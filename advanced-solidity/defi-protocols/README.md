---
description: Protocols to fork and understand the concepts
---

# DeFi Protocols

Reference to OP: [https://multicoin.capital/2020/04/16/on-forking-defi-protocols/](https://multicoin.capital/2020/04/16/on-forking-defi-protocols/)

## Synthetic Stablecoin - Maker <a href="#synthetic-stablecoin---maker" id="synthetic-stablecoin---maker"></a>

About a year ago, I [wrote](https://multicoin.capital/2019/03/14/on-value-capture-at-layers-1-and-2/) about how Layer 2 assets such as MKR (the “equity” of the MakerDAO system) can capture value in permissionless, open settings. In that essay, I specifically identified the presence of “unforkable state” as the key to value capture. In the context of Maker, the obvious unforkable state is the collateral (primarily ETH) backing the DAI loans.

However, it’s now clear that this framing is incomplete. To understand why, let’s assume that the only source of network effect for Maker is the collateral. A wealthy 3rd party could fork all of Maker’s contracts, create an alt-Maker ecosystem, and deposit tens of millions of dollars of collateral to bootstrap liquidity. But what then? The alt-Maker system is useless if no one wants to buy or interact with alt-DAI.

Maker’s most potent source of defensibility is not MKR, or the collateral backing the DAI loans, but the liquidity and usability of DAI. DAI must be liquid in order for Maker to be usable. If someone withdraws DAI debt against ETH collateral, the DAI is useless if there’s no liquidity. But usability is a superset of liquidity. DAI’s usability is clear acceptance by merchants, its use in other protocols like Augur, and its use as collateral in lending protocols like Compound and Lendf.me. DAI is plugged into all kinds of 3rd party apps, services, and infrastructure, and that makes it more useful and usable.

The combination of DAI’s liquidity and usability is a powerful moat. A well capitalized alt-Maker team could offer a higher Dai Savings Rate (DSR), and pay 3rd parties to integrate alt-DAI, but it’s unclear if this would gain meaningful traction.

## Collateralized Money Market - Compound / Lendf.me <a href="#collateralized-money-market---compound--lendfme" id="collateralized-money-market---compound--lendfme"></a>

The unforkable state in [Compound](http://compound.finance/) is the collateral.

Therefore, the defensibility of Compound can be understood as follows: as the value of the collateral pool increases, borrowers can borrow more capital, which draws more lenders, etc.

How difficult is it for someone to fork Compound and bootstrap liquidity in alt-Compound?

There are a few ways to do this. The alt-Compound team can:

Support assets that Compound does not support (e.g. USDT). Introduce more favorable collateralization ratios and liquidation penalties. Lend their own assets in the alt-Compound pool at a competitive or even discounted rate. Subsidize 3rd party lenders to undercut Compound’s rates.

Today, Compound has less than [$100M](https://defipulse.com/compound) of collateral. If the creators of alt-Compound undercut Compound’s rates by subsidizing users - for example on the order of 100 basis points per year - the annualized opportunity cost of bootstrapping liquidity would be less than $1M. This level of scale is venture fundable.

However, in addition to Compound’s internal liquidity (in the form of lending and borrowing rates), Compound is also subject to a couple of unique forms of external liquidity that may provide additional defensibility.

First, there are 3rd-party aggregators such as [Instadapp](https://instadapp.io/), [Zerion](https://zerion.io/), [RAY](https://staked.us/v/robo-advisor-yield/), [idle.finance](https://idle.finance/), [Aave](https://aave.com/), etc. These systems route deposits to Compound, which in turn lowers borrowing rates, which then attracts more borrowers. While organic capital flow is certainly good, it’s not clear that it matters on the margin (since an alt-Compound team can subsidize rates to bootstrap liquidity).

Interestingly, the presence of aggregators can actually backfire because the aggregators are incentivized to send user assets to the highest-yielding lending pools. Assuming [similarly trusted](https://multicoin.capital/2020/03/24/trust-spectrum/) contracts, governance and oracle mechanics, aggregators will not be loyal to Compound at the expense of their users, and so an alt-Compound can easily win over aggregators with subsidies. Moreover, a sufficiently large aggregator can siphon liquidity away from Compound into its own pool or alt-Compound fork. While this hasn’t happened yet, I expect it will in the coming years.

Overall, it’s unclear if 3rd-party aggregators will act as a substantial source of defensibility.

Second, let’s consider cTokens. cTokens are somewhat-analogous to DAI. If third party apps integrate cTokens (for example, for use as collateral), that makes cTokens more usable outside of the core Compound protocol. That makes it difficult for lenders (cToken holders) to move from Compound to alt-Compound.

While the Maker/DAI - Compound/cToken analogy is good, it’s not perfect: the only reason to create DAI is to sell it for something else (e.g. more ETH). Therefore alt-Maker is useless unless there is a market for alt-DAI. However, this is not true for Compound. Compound is still useful even if 3rd-party apps do not utilize cTokens.

Empirically, this is playing out as one should expect. The China-based dForce community forked the Compound codebase and launched a collateralized money market protocol called [lendf.me](https://www.lendf.me/), and they’ve already bootstrapped[\~$20M](https://markets.lendf.me/) of collateral into the system in just a few months. They accomplished this by

1. Offering products that Compound does not support (notably USDT, imBTC, and HBTC)
2. Localizing the service with 3rd party integrations for Chinese users.

It does not appear that the dForce community had to subsidize rates on the lendf.me product to accomplish this.

Maker is more defensible than Compound. With a subsidy budget, anyone can fork Compound and bootstrap liquidity internal to the lending/borrowing market. But successfully forking Maker requires more than a subsidy budget: it requires liquidity and usability of DAI external to the protocol.

## Generalized Synthetic Asset Protocol - Synthetix <a href="#generalized-synthetic-asset-protocol---synthetix" id="generalized-synthetic-asset-protocol---synthetix"></a>

[Synthetix](https://www.synthetix.io/) is a specific type of exchange focused on trading synthetic assets. The defensibility of an exchange is generally understood to be a function of liquidity. However, Synthetix is not a traditional exchange because it does not offer a central limit order book (CLOB) like virtually all major exchanges across traditional markets and crypto markets (e.g. NYSE, CME, Coinbase, Binance).

One of the defining features of Synthetix is that takers do not incur any slippage when trading synths against the collateral pool; however, liquidity is limited based on the amount of collateral in the system. This means that liquidity - and therefore defensibility - is primarily a function of available collateral.

Interestingly, the growth of the Synthetix exchange is actually hampered by the need for takers to onboard into the Synthetix ecosystem by trading real assets (non-Synths such as ETH) for Synths (such as sETH). Today, most users onboard into the Synthetix ecosystem via [Uniswap](https://uniswap.io/), and the [largest liquidity pool](https://uniswap.info/home) on Uniswap is sETH-ETH. So while the need for a liquidity bridge is a constraint to growth, it’s also conversely a moat: if someone forks the Synthetix system to create alt-Synthetix, she will need to bootstrap an analogous liquidity bridge.

### How do the network effects of Synthetix compare to Maker and Compound?

First, let’s consider collateral in the protocol. Like in the cases of alt-Maker and alt-Compound, anyone who forks Synthetix can capitalize the collateral pool themselves, or subsidize others for doing so. Therefore, the collateral base is unlikely to provide defensibility.

Next let’s consider exogenous assets: DAI, cTokens, and Synths. Unlike Maker’s DAI, Synths do not require liquidity external to the protocol... by design! Instead, Synths are more comparable to Compound’s cTokens: like cTokens, Synths can be used as collateral in third-party apps, but don’t need to be in order for the protocol to function. While this can become a source of defensibility, it hasn’t yet.

The last major form of defensibility is the real asset <--> Synth bridge. While Synthetix leverages Uniswap for this today, an alt-Synthetix team could easily provide their own real asset <--> alt-Synth bridge using Uniswap, Kyber, or other freely available DeFi tools.

## Automated Market Makers - Uniswap, StableCoinSwap, Shell, Bancor, FutureSwap, Kyber <a href="#automated-market-makers---uniswap-stablecoinswap-shell-bancor-futureswap-kyber" id="automated-market-makers---uniswap-stablecoinswap-shell-bancor-futureswap-kyber"></a>

Compound is an automated market maker (AMM), albeit for borrowing/lending instead of trading. As such, the defensibility of most of the trading-focused AMMs can be understood to be comparable to that of Compound, excluding cTokens.

Empirically, this seems to be the case. While not all of these AMMs are directly competitive because of different product focuses (e.g. StableCoinSwap and Shell are focused on stablecoin trading, while FutureSwap is focused on futures), the defensibility of each is primarily a function of the size of each protocol’s liquidity pool. Whereas larger liquidity pools in Compound allow for tighter lending/borrow rates, larger liquidity pools in trading-focused AMMs offer lower slippage for takers.

Kyber has become the [most liquid](https://defirate.com/kyber-research-report/) AMM over the last 12 months largely by 1) tapping into other AMM liquidity pools such as Uniswap, and 2) because of third-party integrations that route taker order flow. It’s clear that all the AMMs are going to tap into one another’s liquidity pools as they continue to improve over time.

Paradoxically, once all the AMMs within a given vertical (e.g. stablecoin swaps) tap into one another’s liquidity pools, all of those AMMs become perfect substitutes. None of the AMMs will be able to compete on distribution. The ultimate winner from this end-state of perfect competition will be takers, who will always receive best execution.

## Non-Custodial Central Limit Order Book Exchanges - dYdX, IDEX, Nuo, 0x

The defensibility of these protocols are comparable to those of centralized exchanges, albeit with a few disadvantages.

First, all of these protocols are subject to the constraints of the underlying blockchain which ultimately settles trades, including non-deterministic order execution, high latency, and miner front running. All of these constraints deter liquidity providers, and therefore increase slippage.

Second, in general none of the decentralized exchanges support cross-margining or position netting. While I hope to eventually see this develop in the DeFi ecosystem, it’s clear that this is years away. Meanwhile, centralized exchanges like FTX and Binance offer cross-margining today, and are rapidly expanding their product offerings to maximize capital efficiency for traders.

## Mixer - Tornado.cash

[Tornado Cash](https://tornado.cash/) is unique among the other DeFi protocols above. While the others are focused on borrowing/lending and trading, Tornado is focused on mixing funds to maximize user privacy.

Today, Tornado Cash does not support private payments in a pool. Rather, it can just be used to anonymize funds. The source of defensibility in Tornado is the size of the anonymity pool. Since funds cycle through the Tornado pool relatively quickly (the entire asset base turns over every [1-2 weeks](https://explore.duneanalytics.com/public/dashboards/b0fsH5VyNTbtkkOsQlg0YCPplxxPCC4bo0AGsJPt)), the network effects are fleeting. Moreover, beyond a certain point, a marginally larger anonymity pool doesn’t really matter. For example, as the anonymity set grows from 500 to 1,000 addresses, it’s not clear that the next marginal user cares. Who is the marginal user who believes 1/500 isn’t good enough, but that 1/1,000 is? Thus, in its current form, Tornado Cash is not that defensible.\
However, in a future version of the service, Tornado Cash [aims to support](https://gitcoin.co/grants/198/tornadocash?tab=description) privacy-enabled asset transfers inside the privacy pool (rather than just anonymizing funds, which is what’s available now). In this model, capital will be stickier as it won’t leave the system so quickly. This will allow the anonymity pool to grow much larger, making it more useful for larger amounts of capital.

The notion that large amounts of capital will only enter a large privacy pool is unique relative to the other services above. For example, if the entire privacy pool is just 1,000 ETH, that pool may not be useful for someone wishing to anonymize 9,000 ETH, and in fact be harmful for first 1,000 ETH in the pool, as the owners of the first 1,000 ETH may not want a 90% probability of being associated with the other 9,000 ETH.

For a user who wants to anonymize 10,000 ETH, they may require a pool of 90,000 ETH. This model, while not yet available, is clearly more defensible than the status quo because it enables the wealthiest people to use the service, and the wealthiest people are the people with the largest incentive to hide their wealth.
