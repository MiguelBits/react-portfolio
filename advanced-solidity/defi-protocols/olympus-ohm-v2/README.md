---
description: Rebase and Staking mechanisms
---

# Olympus OHM v2

## Staking&#x20;

Staking is the primary value accrual strategy of Olympus. Stakers stake their OHM on the Olympus website to earn rebase rewards. The rebase rewards are minted every 2200 Ethereum blocks (8 hours) as long as there is a corresponding equivalent of 1 DAI in the Treasury to back it. This is guaranteed on the smart-contract level. Runway displays the number of days Olympus would maintain its current rate of emissions without any inflows to the Treasury or changes to the reward rate. Staking is a passive, long-term strategy. The increase in your stake of OHM translates into a constantly falling cost basis converging on zero. This means even if the market price of OHM drops below your initial purchase price, given a long enough staking period, the increase in your staked OHM balance should eventually outpace the fall in price. When you stake, you lock OHM and receive an equal amount of sOHM. Your sOHM balance rebases up automatically at the end of every epoch. sOHM is transferable and therefore composable with other DeFi protocols. When you unstake, you burn sOHM and receive an equal amount of OHM. Unstaking means the user will forfeit the upcoming rebase reward. Note that the forfeited reward is only applicable to the unstaked amount; the remaining staked OHM (if any) will continue to receive rebase rewards.

> **What is a rebase?**\
> Rebase is a mechanism by which your staked OHM balance increases automatically. When new OHM are minted by the protocol, a large portion of it goes to the stakers. Because stakers only see staked OHM balance instead of OHM, the protocol utilizes the rebase mechanism to increase the staked OHM balance so that 1 staked OHM is always redeemable for 1 OHM.

![](<../../../.gitbook/assets/image (3).png>)

The roughly 8-hour period is called an Epoch and that's when rebase rewards are added to your wallet in the form of sOHM. And since it's already in sOHM, it means that the rewards are automatically staked which increases the rebase rewards you get each Epoch.

```solidity
/**
     * @notice trigger rebase if epoch over
     * @return uint256
     */
    function rebase() public returns (uint256) {
        uint256 bounty;
        if (epoch.end <= block.timestamp) {
            sOHM.rebase(epoch.distribute, epoch.number);

            epoch.end = epoch.end.add(epoch.length);
            epoch.number++;

            if (address(distributor) != address(0)) {
                distributor.distribute();
                bounty = distributor.retrieveBounty(); // Will mint ohm for this contract if there exists a bounty
            }
            uint256 balance = OHM.balanceOf(address(this));
            uint256 staked = sOHM.circulatingSupply();
            if (balance <= staked.add(bounty)) {
                epoch.distribute = 0;
            } else {
                epoch.distribute = balance.sub(staked).sub(bounty);
            }
        }
        return bounty;
    }
```

### sOHM rebase

```solidity
/* ========== REBASE ========== */

    /**
        @notice increases rOHM supply to increase staking balances relative to profit_
        @param profit_ uint256
        @return uint256
     */
    function rebase(uint256 profit_, uint256 epoch_) public override onlyStakingContract returns (uint256) {
        uint256 rebaseAmount;
        uint256 circulatingSupply_ = circulatingSupply();
        if (profit_ == 0) {
            emit LogSupply(epoch_, _totalSupply);
            emit LogRebase(epoch_, 0, index());
            return _totalSupply;
        } else if (circulatingSupply_ > 0) {
            rebaseAmount = profit_.mul(_totalSupply).div(circulatingSupply_);
        } else {
            rebaseAmount = profit_;
        }

        _totalSupply = _totalSupply.add(rebaseAmount);

        if (_totalSupply > MAX_SUPPLY) {
            _totalSupply = MAX_SUPPLY;
        }

        _gonsPerFragment = TOTAL_GONS.div(_totalSupply);

        _storeRebase(circulatingSupply_, profit_, epoch_);

        return _totalSupply;
    }
```

## What is the relationship between staking and reward rate?

The level of OHM staking rewards is determined by the overall reward rate, and was codified by the community (via the OIP-18 vote). The reward yield, which is a function of reward rate, is also dependent on how many other individuals are staking their OHM. When more individuals are staking the reward yield declines and the opposite occurs when the reward rate increases.

Olympus presents our current sOHM (staked OHM) reward yield as an illustrative annual percentage yield (APY) on our app. We do this because sOHM rebases several times a day (about every 8 hours). Given this, rebases have an effect analogous to compounding interest.

The APYs presented by Olympus are a representation of the current rebase rate, number of stakers and existing supply. These calculations are floating and the current rates are not a guarantee of future returns.

The APY is calculated from the reward yield (a.k.a rebase rate) using the following equation:

$$
APY = ( 1 + rewardYield )^{1095} - 1
$$

It raises to the power of 1095 because a rebase happens 3 times daily. Consider there are 365 days in a year, this would give a rebase frequency of 365 \* 3 = 1095.

Reward yield is determined by the following equation:

$$
rewardYield = OHM_{distributed} / OHM_{totalStaked}
$$

The number of OHM distributed to the staking contract is calculated from OHM total supply using the following equation:

$$
OHM_{distributed} = OHM_{totalSupply} \times rewardRate
$$

Note that the reward rate is subject to change by the protocol.
