# Olympus OHM v1

## Background <a href="#heading-background" id="heading-background"></a>

OlympusDAO and its forks proliferated this past year with high nominal rates of return from staking and the popular (3,3) meme. OlympusDAO created and popularized two main concepts for DeFi platforms:

* Bonding to achieve Protocol Owned Liquidity (POL) or other Protocol Reserve objectives. Bonding is an improvement over Incentivized Liquidity Farming because it is a one-time expense and you then own the liquidity vs. renting it perpetually from liquidity providers.
* Staking system designed using game theory to achieve a Nash equilibrium where all participants best strategy is to stake. "(3, 3)"

The biggest innovation that OlympusDAO has contributed to the ecosystem:&#x20;

The V2 BondDepository contract and associated types were published in January 2022 and are written by [Zeus](https://twitter.com/ohmzeus) and [Indigo](https://twitter.com/\_nd\_go) for OlympusDAO. The code and contracts reviewed in this post is as of commit _0646cc499d7af8a135f9bf6c653e2c62299f52a1_ on the [OlympusDAO/olympus-contracts](https://github.com/OlympusDAO/olympus-contracts/tree/0646cc499d7af8a135f9bf6c653e2c62299f52a1) GitHub repository.

## DAO and Protocol <a href="#heading-dao-and-protocol" id="heading-dao-and-protocol"></a>

* **OlympusDAO** - The decentralized autonomous organization (DAO) that develops, deploys, and operates the Olympus decentralized reserve currency protocol. The protocol has two main user-facing components: Bonding and Staking. Bonds provide assets for the Treasury in exchange for the native protocol token. The market price of OHM is used in bonding, which has historically always been above the backed value (1 DAI). When the protocol makes a profit by bonding assets with OHM, it distributes the profits to users staking OHM as new OHM tokens minted with the excess collateral received. In the future, other income sources could be used to mint new rewards for stakers.
* **Olympus V1** - The original version of the protocol that was released in March 2021. While upgrades were made to specific contracts over the course of 2021, the base concepts remained the same.
* **Olympus V2** - A re-written version of the protocol that was deployed between December 2021 and January 2022. The changeover required a migration of treasury assets, deployment of new Bond Depository contracts, and migration of user tokens.

## V2 Differences

### Bonds <a href="#f20d" id="f20d"></a>

Bonds have received a significant overhaul. The upgrades are as follows:

* **Bond payouts are staked at the time of purchase.** Rather than requiring bonders to factor in missed rewards when considering a discount, they are now earned by default. This means that any >0% discount will outperform staking, and as a result discounts should not deviate far above 0%. This is good for minimizing market pressure and maximizing protocol efficiency.
* **Bonds no longer vest linearly.** Instead, bonders must wait until the end of their term to redeem. This illiquidity is enabled by staking bond payouts, and creates a form of locked staking that will save ohmies money by removing the incentive to incur wasteful gas transactions through frequent redemption.
* **New bond types are created as isolated offerings.** Each bond has a maximum amount of OHM that can be paid or a maximum amount of principal that can be purchased and, once exceeded, the bond is retired. All parameters of the bond are set in stone after initialization. This improves both budgeting and immutability.
* **Bonds can be held as NFTs.** This enables liquid secondary bond markets.
* **Bonds can be fixed-term or fixed-expiration.** What we have now is fixed-term; if the term for a bond is 1 week, your maturation date will be in 1 week. Fixed-expiration means the maturation date is the same for all who buy that bond. If a bond has fixed-expiration on day 8 and you buy one on day 1, your term is 7 days; if you buy the same bond on day 2, your term is 6 days. This lends itself to composability; fixed-expiration bonds can be wrapped into a fungible token and traded like any ERC20.
* **Bonds offer a front-end reward.** This will incentivize third-parties to run front-ends for Olympus, reducing single-point-of-failure risk.
