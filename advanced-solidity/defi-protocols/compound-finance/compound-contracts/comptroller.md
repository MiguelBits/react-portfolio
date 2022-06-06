---
description: https://compound.finance/docs/comptroller#introduction
---

# Comptroller

## Introduction

The Comptroller is the risk management layer of the Compound protocol; it determines how much collateral a user is required to maintain, and whether (and by how much) a user can be liquidated. Each time a user interacts with a cToken, the Comptroller is asked to approve or deny the transaction.

The Comptroller maps user balances to prices (via the Price Oracle) to risk weights (called [Collateral Factors](https://compound.finance/docs/comptroller#collateral-factor)) to make its determinations. Users explicitly list which assets they would like included in their risk scoring, by calling [Enter Markets](https://compound.finance/docs/comptroller#enter-markets) and [Exit Market](https://compound.finance/docs/comptroller#exit-market).

## Architecture

The Comptroller is implemented as an upgradeable proxy. The Unitroller proxies all logic to the Comptroller implementation, but storage values are set on the Unitroller. To call Comptroller functions, use the Comptroller ABI on the Unitroller address.

## Enter Markets

Enter into a list of markets - it is not an error to enter the same market more than once. In order to supply collateral or borrow in a market, it must be entered first.

**Comptroller**

```solidity
function enterMarkets(address[] calldata cTokens) returns (uint[] memory)
```

* msg.sender: The account which shall enter the given markets.
* cTokens: The addresses of the cToken markets to enter.
* RETURN: For each market, returns an error code indicating whether or not it was entered. Each is 0 on success, otherwise an [Error code](https://compound.finance/docs/comptroller#error-codes).

## Exit Market

Exit a market - it is not an error to exit a market which is not currently entered. Exited markets will not count towards account liquidity calculations.

**Comptroller**

```solidity
function exitMarket(address cToken) returns (uint)
```

* msg.sender: The account which shall exit the given market.
* cTokens: The addresses of the cToken market to exit.
* RETURN: 0 on success, otherwise an [Error code](https://compound.finance/docs/comptroller#error-codes).

## Get Assets In

Get the list of markets an account is currently entered into. In order to supply collateral or borrow in a market, it must be entered first. Entered markets count towards [account liquidity](https://compound.finance/docs/comptroller#account-liquidity) calculations.

**Comptroller**

```solidity
function getAssetsIn(address account) view returns (address[] memory)
```

* account: The account whose list of entered markets shall be queried.
* RETURN: The address of each market which is currently entered into.

## Collateral Factor

A cToken's collateral factor can range from 0-90%, and represents the proportionate increase in liquidity (borrow limit) that an account receives by minting the cToken.

Generally, large or liquid assets have high collateral factors, while small or illiquid assets have low collateral factors. If an asset has a 0% collateral factor, it can't be used as collateral (or seized in liquidation), though it can still be borrowed.

Collateral factors can be increased (or decreased) through Compound Governance, as market conditions change.

**Comptroller**

```solidity
function markets(address cTokenAddress) view returns (bool, uint, bool)
```

* cTokenAddress: The address of the cToken to check if listed and get the collateral factor for.
* RETURN: Tuple of values (isListed, collateralFactorMantissa, isComped); isListed represents whether the comptroller recognizes this cToken; collateralFactorMantissa, scaled by 1e18, is multiplied by a supply balance to determine how much value can be borrowed. The isComped boolean indicates whether or not suppliers and borrowers are distributed COMP tokens.

## Get Account Liquidity

Account Liquidity represents the USD value borrowable by a user, before it reaches liquidation. Users with a shortfall (negative liquidity) are subject to liquidation, and can’t withdraw or borrow assets until Account Liquidity is positive again.

For each market the user has [entered](https://compound.finance/docs/comptroller#enter-markets) into, their supplied balance is multiplied by the market’s [collateral factor](https://compound.finance/docs/comptroller#collateral-factor), and summed; borrow balances are then subtracted, to equal Account Liquidity. Borrowing an asset reduces Account Liquidity for each USD borrowed; withdrawing an asset reduces Account Liquidity by the asset’s collateral factor times each USD withdrawn.

Because the Compound Protocol exclusively uses unsigned integers, Account Liquidity returns either a surplus or shortfall.

**Comptroller**

```solidity
function getAccountLiquidity(address account) view returns (uint, uint, uint)
```

* account: The account whose liquidity shall be calculated.
* RETURN: Tuple of values (error, liquidity, shortfall). The error shall be 0 on success, otherwise an [error code](https://compound.finance/docs/comptroller#error-codes). A non-zero liquidity value indicates the account has available [account liquidity](https://compound.finance/docs/comptroller#account-liquidity). A non-zero shortfall value indicates the account is currently below his/her collateral requirement and is subject to liquidation. At most one of liquidity or shortfall shall be non-zero.

## Close Factor

The percent, ranging from 0% to 100%, of a liquidatable account's borrow that can be repaid in a single liquidate transaction. If a user has multiple borrowed assets, the closeFactor applies to any single borrowed asset, not the aggregated value of a user’s outstanding borrowing.

**Comptroller**

```solidity
function closeFactorMantissa() view returns (uint)
```

* RETURN: The closeFactor, scaled by 1e18, is multiplied by an outstanding borrow balance to determine how much could be closed.

## Liquidation Incentive

The additional collateral given to liquidators as an incentive to perform liquidation of underwater accounts. For example, if the liquidation incentive is 1.1, liquidators receive an extra 10% of the borrowers collateral for every unit they close.

**Comptroller**

```solidity
function liquidationIncentiveMantissa() view returns (uint)
```

* RETURN: The liquidationIncentive, scaled by 1e18, is multiplied by the closed borrow amount from the liquidator to determine how much collateral can be seized.

\
\
\
\
