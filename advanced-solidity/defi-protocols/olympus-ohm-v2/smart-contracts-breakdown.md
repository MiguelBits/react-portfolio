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
* **Base Token** - The token used to payout users for their bond. In the Olympus Protocol, this is normally OHM, but, in theory, it could be any token that a protocol wants to exchange for bonded assets. An examples of non-OHM base token contracts are the [Olympus Pro](https://www.olympusdao.finance/pro) bond offerings that they provide for other protocols as a service.
* **Quote Token** - The token being bonded by a user and deposited in the Treasury.
* **Market** - A specific Bond offering on a Bond Depository contract. Each Market is for a specific asset to bond, has its own price that fluctuates with deposit activity and tuning adjustments, has a set expiration date/time and vesting period, and has a specific capacity that it can pay in OHM or accept in quote tokens.
* **Note** - A data structure with the terms agreed to as a result of the user bonding tokens on an active Market. You can think of it as an IOU from the Bond Depository to a user with a specific time that the user can retrieve their Payout.
* **Payout** - The amount a Note holder will receive in gOHM at the end of the Note's Vesting Duration.
* **Front-end Operator** - A person or entity that operates a front-end interface for the Olympus protocol. The Bond Depository V2 contract includes an incentive mechanism to allow the team to decentralize the creation and operation of interfaces. A Front-end Operator can be whitelisted by the protocol and receive rewards for user deposits that they route to the protocol. Not shown on the diagram.
* **Staking Contract** - A smart contract that users can stake their OHM with and receive sOHM or gOHM. The staking contract issues the staking rewards to users after each protocol epoch (specified time period) by rebasing sOHM.
