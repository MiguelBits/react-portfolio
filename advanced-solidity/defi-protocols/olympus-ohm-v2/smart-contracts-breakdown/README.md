---
description: 'Reference: https://blog.oighty.com/olympus-v2-bonds#heading-tokens'
---

# Smart Contracts Breakdown

## Tokens <a href="#heading-tokens" id="heading-tokens"></a>

* **OHM** - The base ERC20 token of the protocol. Each OHM is backed by 1 DAI by the DAO.
* **sOHM** - "Staked OHM". A **rebasing** ERC20 token issued by the protocol in exchange for users staking their OHM. Rebasing means that the number of tokens a user holds changes over time as the protocol "rebases" the token to issue staking rewards. Primary reason for this is to have gas-less staking rewards.
* **gOHM** - "Governance OHM". A **wrapped version of the sOHM** token that does not rebase. Instead, it becomes worth more sOHM overtime as the staking index increases. It is now used for governance of the protocol as of the V2 migration.

## Bond Terminology <a href="#heading-bond-terminology" id="heading-bond-terminology"></a>

* **Bond Depository** - A smart contract that lets users bond (**deposit**) specified Reserve or LP assets to the protocol in exchange for a Payout in OHM after a Vesting Period (the payout is automatically staked as sOHM or gOHM in V2 for the user during the vesting). A Bond Depository contract can only have one payout token.
* **Treasury** - A smart contract that **holds the assets users bond** (deposit) to the protocol.
* **Base Token** - The token used to payout users for their bond. In the Olympus Protocol, this is normally OHM, but, in theory, it could be any **token that a protocol wants to exchange for bonded assets**. An examples of non-OHM base token contracts are the [Olympus Pro](https://www.olympusdao.finance/pro) bond offerings that they provide for other protocols as a service.
* **Quote Token** - The token being bonded by a user and deposited in the Treasury.
* **Market** - A specific Bond offering on a Bond Depository contract. Each Market is for a specific asset to bond, has its own price that fluctuates with deposit activity and tuning adjustments, has a set expiration date/time and vesting period, and has a specific capacity that it can pay in OHM or accept in quote tokens.
* **Note** - A **data structure with the terms agreed** to as a result of the user bonding tokens on an active Market. You can think of it as an IOU from the Bond Depository to a user with a specific time that the user can retrieve their Payout.
* **Payout** - The **amount a Note holder will receive** in gOHM at the end of the Note's Vesting Duration.
* **Front-end Operator** - A person or entity that operates a front-end interface for the Olympus protocol. The Bond Depository V2 contract includes an incentive mechanism to allow the team to decentralize the creation and operation of interfaces. A Front-end Operator can be whitelisted by the protocol and receive rewards for user deposits that they route to the protocol. Not shown on the diagram.
* **Staking Contract** - A smart contract that users can stake their OHM with and receive sOHM or gOHM. The staking contract issues the staking rewards to users after each protocol epoch (specified time period) by rebasing sOHM.

## Bond Market Parameters <a href="#heading-bond-market-parameters" id="heading-bond-market-parameters"></a>

A key challenge for the Olympus Policy Team is determining the right settings to achieve the DAO Policy objectives in current and upcoming market conditions. Since they are trying to build a decentralized reserve currency, OlympusDAO is trying to build a diverse, deep treasury with stable assets (such as DAI and FRAX) and needs deep liquidity for their token to enable a high volume of transactions (e.g. as OHM/DAI or OHM/FRAX LP tokens). The following parameters are set whenever a new Bond Market is created.

* **Quote Token** - The **token that the user can deposit for a bond on this Market**. This can be a Reserve asset or LP token that the DAO wants to acquire in the Treasury.
* **Capacity** - Each Market has a capacity for the **amount of collateral it can receive or the amount of OHM that can be paid out**. The creator can specify which type of capacity to use. The Market will stop accepting new bonds when the capacity is reached.
* **Debt Buffer** - A **percentage over the initial target debt** (Capacity in Base Token) **that the Total Market Debt is allowed to exceed**. This acts as a circuit breaker and closes the Market immediately if hit. The purpose is to save the protocol in the event of a Quote Token having rapid decline (e.g. a stable coin losing its peg). It's important to set the Debt Buffer with enough room for normal market activities to be able to hit the target capacity of the Market.
* **Initial Price** - The starting price of the Market in the number of Quote Tokens per Base Token
* **Expiration** - A timestamp when the Market will stop accepting new bonds, regardless of whether the capacity has been reached or not.
* **Vesting Period** - Amount of **time that users must wait between bonding assets and redeeming their payout**. Vesting can be set as a Fixed Term (e.g. 5 days) or a Fixed Expiration (all bonds vest at a specific timestamp).
* **Target Deposit Interval** - Target frequency for users to bond assets on the Market. It determines the Max Payout for any one deposit: MaxPayout=Capacity∗TargetDepositInterval/TotalDuration. Additionally, it is used by the `_tune` function to make price adjustments.
* **Tuning Interval** - Frequency of how often the Market auto-adjusts the Bond Price and the amount of time that downward Bond Price adjustments will be phased in over.

## Creating a Bond Market <a href="#heading-creating-a-bond-market" id="heading-creating-a-bond-market"></a>

The Olympus Policy Team creates Bonds with different parameters to achieve their goals. Bonds are announced on the Olympus Discord the parameters specified, such as "DAI bonds have a capacity of 8,260 OHM over 7 days which is approximately $300,000 per day with a deposit target of every 6 hours. The bonds will have a 14-day vesting term, are automatically staked, and can be claimed at the end of the vesting term." This translates to the following Market parameters on the contract:

* **Quote Token**: DAI
* **Capacity**: 8,260 OHM (Capacity is in the Base Token)
* **Expiration**: 7 days
* **Vesting Period**: 14 days (Vesting Type is Fixed Term)
* **Target Deposit Interval**: 6 hours

The following parameters are not specified in the statement.

*   **Initial Price**: Not specified, but it is implied by the dollar amount per day compared to the OHM to be paid out. 7∗300,000 DAI/8,260 OHM= 254 DAI/OHM

    A key question here is "Why did they pick that initial price?". To make the bond attractive to users, the payout needs to provide a positive ROI from the amount deposited. The initial price is typically set at a discount to the current price of OHM on the market to create this ROI. For example, if OHM was trading at $267 when the bond was created and the initial price is $254, then the ROI for the user would be \~5% over the vesting at the time of bonding. This ROI will change depending on whether the price of OHM goes up or down during the vesting period (and to account for the staking rewards earned from the auto-stake).
* **Debt Buffer**: This is an internal parameter for the protocol to set as a circuit breaker. It could affect user activity, since it will stop the Market if exceeded, but it shouldn't affect the actions of a single user.
* **Tuning Interval**: This is also an internal parameter for the protocol to control how fast the Market reacts to price changes. Therefore, it isn't necessarily applicable to end users and not specified when new Markets are released.
