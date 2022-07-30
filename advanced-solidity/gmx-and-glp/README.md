---
description: https://gmxio.gitbook.io/gmx/
---

# GMX (& GLP)

## GMX

GMX is a decentralized spot and perpetual exchange that supports low swap fees and zero price impact trades.

## Staking



The RewardRouter contract handles the necessary actions needed for staking in a single transaction.

When staking GMX:

* The RewardRouter deposits the GMX token into the StakedGmxTracker contract
* The StakedGmxTracker issues itself as a token for each token deposited
* esGMX can similarly be deposited into the StakedGmxTracker
* The StakedGmxTracker distributes esGMX to staked tokens
* After this step, the RewardRouter deposits the StakedGmxTracker tokens into the BonusGmxTracker
* The BonusGmxTracker distributes Multiplier Points to staked tokens
* Finally the BonusGmxTracker tokens are deposited into the FeeGmxTracker which distributes ETH or AVAX to staked tokens

When minting GLP:

* The RewardRouter sends the funds to be deposited to the GlpManager and mints GLP tokens
* The RewardRouter then deposits the GLP tokens to the FeeGlpTracker which distributes ETH or AVAX to the staked tokens
* Finally the RewardRouter deposits the FeeGlpTracker tokens into the StakedGlpTracker which distributes esGMX to staked tokens

Addresses for contracts can be found at [https://github.com/gmx-io/gmx-interface/blob/master/src/Addresses.js](https://github.com/gmx-io/gmx-interface/blob/master/src/Addresses.js).

To get the deposit balances for an account you can use RewardTracker.depositBalances(account, token), or RewardReader.getDepositBalances(account, depositTokens, rewardTrackers).

To get claimable rewards you can use RewardReader.getStakingInfo(account rewardTrackers), this returns an array of uint256 values in the order:

* Claimable rewards
* Amount of reward token distribution per second
* Average staked amount for account
* Total rewards distributed to account
* Total staked tokens in the rewardTracker

## GLP

GLP is the platform's liquidity provider token.

#### Overview <a href="#overview" id="overview"></a>

GLP consists of an index of assets used for swaps and leverage trading. It can be minted using any index asset and burnt to redeem any index asset. The price for minting and redemption is calculated based on (total worth of assets in index including profits and losses of open positions) / (GLP supply).

## GLP Price

The price of GLP is based on the total worth of all tokens in the pool and factors in pending profits and losses from all currently opened positions.

* Buy price: `glpManager.getAum(true) / glp.totalSupply()`
* Sell price: `glpManager.getAum(false) / glp.totalSupply()`

Since there might be a spread for token pricing, passing in `true` into the `getAum` function returns the maximum worth of tokens at that point in time, while passing in false returns the minimum worth.
