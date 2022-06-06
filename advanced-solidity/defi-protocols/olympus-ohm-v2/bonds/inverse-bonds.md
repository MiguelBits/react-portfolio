# Inverse Bonds

## What are inverse bonds? <a href="#what-are-inverse-bonds" id="what-are-inverse-bonds"></a>

Inverse bonds have been introduced as a protocol lever in [OIP-76](https://snapshot.org/#/olympusdao.eth/proposal/0xa544837835f3c4e681efba18d33623d4eb2acedec352dfc3c926a45902cd3612) as a way to support the price of OHM when it is below the backing per OHM. As their name suggests, one can think of inverse bonds as doing the "inverse" of what a regular bond does: instead of taking a treasury asset in exchange for OHM, **it takes in OHM in exchange for an asset from the treasury**.Here is a TL;DR on inverse bonds:

* They buy your OHM in exchange for a backing asset from the treasury.
* They buy your OHM at a premium (slightly above market price) and then burn it.
* They buy your OHM at a slight discount to the backing per OHM, increasing the backing per remaining OHM.
* They have no vesting, meaning that the asset exchange is instant.
* They are only available while the OHM market price is below the backing per OHM.
* They are launched by the policy team.
* Their price is determined by the market.



## How do these bonds affect the backing per OHM?

* The protocol acquires and burns OHM at a discount compared to backing per OHM.
* The revenues from inverse bonds increase the backing of all remaining OHM tokens.



## Are these bonds the same as a buyback?

While they seem similar there are notable differences:

* They absorb sell pressure because they buy OHM slightly above the market price.
* They reduce sell pressure further because they increase the backing per OHM.
* Their availability is limited to certain market conditions.
* The amount of OHM tokens that the protocol will acquire and burn is limited.
* Sales are driven by market demand and not by the protocol or the DAO, removing moral hazard.
