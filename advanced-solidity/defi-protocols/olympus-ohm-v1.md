# Olympus OHM v1

## V2 Differences

### Bonds <a href="#f20d" id="f20d"></a>

Bonds have received a significant overhaul. The upgrades are as follows:

* **Bond payouts are staked at the time of purchase.** Rather than requiring bonders to factor in missed rewards when considering a discount, they are now earned by default. This means that any >0% discount will outperform staking, and as a result discounts should not deviate far above 0%. This is good for minimizing market pressure and maximizing protocol efficiency.
* **Bonds no longer vest linearly.** Instead, bonders must wait until the end of their term to redeem. This illiquidity is enabled by staking bond payouts, and creates a form of locked staking that will save ohmies money by removing the incentive to incur wasteful gas transactions through frequent redemption.
* **New bond types are created as isolated offerings.** Each bond has a maximum amount of OHM that can be paid or a maximum amount of principal that can be purchased and, once exceeded, the bond is retired. All parameters of the bond are set in stone after initialization. This improves both budgeting and immutability.
* **Bonds can be held as NFTs.** This enables liquid secondary bond markets.
* **Bonds can be fixed-term or fixed-expiration.** What we have now is fixed-term; if the term for a bond is 1 week, your maturation date will be in 1 week. Fixed-expiration means the maturation date is the same for all who buy that bond. If a bond has fixed-expiration on day 8 and you buy one on day 1, your term is 7 days; if you buy the same bond on day 2, your term is 6 days. This lends itself to composability; fixed-expiration bonds can be wrapped into a fungible token and traded like any ERC20.
* **Bonds offer a front-end reward.** This will incentivize third-parties to run front-ends for Olympus, reducing single-point-of-failure risk.
