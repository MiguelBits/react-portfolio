---
description: An overview of GMX contracts and mechanics.
---

# GMX Technical Overview

### **Software Architecture**

The main components of the platform are:

1. Vault
2. Routers
3. Price Feeds
4. GMX
5. GLP

Addresses for these contracts can be found at:[https://gmxio.gitbook.io/gmx/contracts](https://gmxio.gitbook.io/gmx/contracts)

### **Vault**

The [Vault](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/core/Vault.sol) contract stores deposits and handles the main trading functions.

* Deposits: Funds are deposited into the Vault through the minting of GLP tokens. e.g. if the price of GLP is $1.50, a user can mint 1 GLP by depositing 1.50 USDC tokens.
* Withdrawals: Funds can be withdrawn from the vault through the burning of GLP tokens. e.g. if the price of GLP is $1.50, a user can burn 1 GLP to redeem 1.50 USDC tokens.
* Swaps: The vault allows swapping of the tokens held in the vault. e.g. if the price of ETH is $5000 a user can swap 1 ETH for 5000 USDC through the swap function of the vault.
* Longing: Users can open a long position using the vault. e.g. to open a long, a user can deposit 1 ETH into the vault and open a position of $25,000, if the price of ETH at the time of opening the position is $5000, then this would be a 5x long position. If the price of ETH increases by 10%, the user would make a profit of $25,000 \* 10% = $2500. A snapshot of the collateral is taken when the position is opened, so in this example, the collateral would be recorded as $5000 and will not change even if the price of ETH changes. To ensure the vault has sufficient funds to pay out any profits, an amount of ETH equivalent to the position’s size is marked as reserved, for this position, 5 ETH in the vault would be reserved.
* Shorting: Users can open a short position using the vault. e.g. to open a short, a user can deposit 5000 USDC into the vault and open a position of $25,000. Stablecoins are required as collateral for shorts and similar to longs, an amount of stablecoins equivalent to the size of the position would be reserved to pay out any profits.
* Liquidations: A position can be liquidated by keepers if the losses of the position reduces the collateral to the point where `position size / remaining collateral` is more than the max allowed leverage.

