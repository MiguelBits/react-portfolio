---
description: 'Reference: https://soliditydeveloper.com/sushi-swap'
---

# MasterChef

## SushiSwap Explained!

SushiSwap is making use of liquidity pool tokens (LP tokens). Check out [https://uniswap.org/docs/v2/core-concepts/pools/](https://uniswap.org/docs/v2/core-concepts/pools/) under 'Pool tokens' for all details. Essentially LPs are for receiving [pro-rata](https://www.investopedia.com/terms/p/pro-rata.asp) fees accrued in the pool. So you provide liquidity in a pool and get LP tokens minted in return. When the pool is now collecting fees over time, they are evenly distributed to all LP holders at the time of the trade. When you burn your LP tokens, you will receive your share of the pool + the collected fees.

SushiSwap is a Uniswap v2 Fork!&#x20;

Two changes to the Uniswap code where made by SushiSwap:

1. The function [setFeeTo](https://github.com/sushiswap/sushiswap/blob/64b758156da6f9bde1d8619f142946b005c1ba4a/contracts/uniswapv2/UniswapV2Factory.sol#L47-L50) was called in the deployment and the fee recipient was set to the SushiMaker contract (see below). Once the fee recipient is set, 1/6th of the LP supply growth due to the current trade are minted as protocol fee in the form of pool tokens. Since the trade fee on Uniswap is 0.3%, this will result in a 0.05% fee of every trade going towards the SushiMaker.
2. A migrator functionality was added (see SushiRoll below).

## SushiMaker

The [SushiMaker](https://github.com/sushiswap/sushiswap/blob/master/contracts/SushiMaker.sol) will receive LP tokens from people trading on SushiSwap. It mostly consists of a `convert` function which does the following:

1. [Burn](https://github.com/Uniswap/uniswap-v2-core/blob/4dd59067c76dea4a0e8e4bfdda41877a6b16dedc/contracts/UniswapV2Pair.sol#L134) the LP tokens for the provided token pair. The result will be receiving proportional amounts of both `token0` and `token1`.
2. Inside `convertStep` trade both received tokens into SUSHI. This may require additional steps if there's no direct pool to trade into SUSHI.

```solidity
function convert(address token0, address token1) external {
  UniV2Pair pair = UniV2Pair(factory.getPair(token0, token1));
  require(address(pair) != address(0), "Invalid pair");

  IERC20(address(pair)).safeTransfer(
      address(pair),
      pair.balanceOf(address(this))
  );

  (uint256 amount0, uint256 amount1) = pair.burn(address(this));

  if (token0 != pair.token0()) {
      (amount0, amount1) = (amount1, amount0);
  }

  _convertStep(token0, token1, amount0, amount1)
}
```

The swap itself is performed on the SushiSwap pools itself. Let's see how this is done by examining the `_swap` function.

## Swap

The swap itself is performed on the SushiSwap pools itself. For the trade we are using the low-level Uniswap [swap](https://github.com/Uniswap/uniswap-v2-core/blob/4dd59067c76dea4a0e8e4bfdda41877a6b16dedc/contracts/UniswapV2Pair.sol#L159) function.

1. Get the current reserves of both tokens in the pool.
2. Compute the receiving amount from the reserves and token amount being swapped minus the fees. Calculation is based on the [x \* y = k curve](https://uniswap.org/docs/v1/frontend-integration/trade-tokens/).

Once the amount out is computed, we can perform the swap. The last step to convert into SUSHI will always call the `_swap` function by passing the SUSHI token address and sending it to the bar:

```solidity
_swap(token, sushi, amountIn, bar)
```

```solidity
function _swap(
    address fromToken,
    address toToken,
    uint256 amountIn,
    address to
) internal returns (uint256 amountOut) {
    UniV2Pair pair =
        UniV2Pair(factory.getPair(fromToken, toToken));
    require(address(pair) != address(0), "Cannot convert");

    (uint256 reserve0, uint256 reserve1, ) = pair.getReserves();
    uint256 amountInWithFee = amountIn.mul(997);

    if (fromToken == pair.token0()) {
        amountOut =
            amountInWithFee.mul(reserve1) /
            reserve0.mul(1000).add(amountInWithFee);
        IERC20(fromToken).safeTransfer(address(pair), amountIn);
        pair.swap(0, amountOut, to, new bytes(0));
    } else {
        amountOut =
            amountInWithFee.mul(reserve0) /
            reserve1.mul(1000).add(amountInWithFee);
        IERC20(fromToken).safeTransfer(address(pair), amountIn);
        pair.swap(amountOut, 0, to, new bytes(0));
    }
}
```

That's it, now we converted all LP tokens into SUSHI. All converted SUSHI are sent to the **SushiBar**, see next contract.

## SushiBar

Inside the [SushiBar](https://github.com/sushiswap/sushiswap/blob/master/contracts/SushiBar.sol) people can enter with SUSHI, receive xSUSHI and later leave with even more SUSHI. Remember that all SUSHI from the SushiMaker are sent here. So over time the bar will accumulate more and more SUSHI.

Who will receive this SUSHI?

Anyone who entered the bar. For entering a user receives xSUSHI which are kind of like the LP tokens for Uniswap. They represent ownership of the SUSHI token in the bar.

The amount of xSUSHI you receive is your transferred SUSHI \* total xSUSHI supply / current balance of SUSHI. So if you send 10 SUSHI to the bar which already has 100 SUSHI in it and 200 xSUSHI total supply, you will receive 10 \* 200 / 100 = 20 xSUSHI.

```solidity
function enter(uint256 _amount) external {
  uint256 totalSushi = sushi.balanceOf(address(this));
  uint256 totalShares = totalSupply();

  uint256 mintAmount =
      totalShares == 0 || totalSushi == 0
      ? _amount
      : _amount.mul(totalShares).div(totalSushi);
    
  _mint(msg.sender, mintAmount);
  sushi.transferFrom(
    msg.sender,
    address(this),
    _amount
  );
}
```

Now when you leave again, you get your equal share of SUSHI back. This will be at the minimum what you paid in, but considering the bar will accumulate SUSHI over time, it should be more than what you put originally in.

The amount of SUSHI you receive is your transferred xSUSHI \* current balance of SUSHI / total xSUSHI supply. So if you send 20 xSUSHI to the bar which has 100 SUSHI in it and 200 xSUSHI total supply, you will receive 20 \* 100 / 200 = 10 SUSHI.

```solidity
function leave(uint256 _share) external {
    uint256 totalShares = totalSupply();
    uint256 transferAmount = _share
        .mul(sushi.balanceOf(address(this)))
        .div(totalShares);

    _burn(msg.sender, _share);
    sushi.transfer(msg.sender, transferAmount);
}
```

## SushiToken

Of course you have the [SUSHI token contract](https://github.com/sushiswap/sushiswap/blob/master/contracts/SushiToken.sol) itself. There's nothing special to it other than being a regular ERC-20 with delegation functionality identical to the COMP token. We've previously discussed COMP governance [here](https://soliditydeveloper.com/comp-governance). The mentioned [Timelock](https://github.com/sushiswap/sushiswap/blob/master/contracts/governance/Timelock.sol) contract is also included in SushiSwap.

The token allows delegating your voting power to some other trusted address. This address can then vote with increased power. Any time you may choose to re-delegate somewhere else.

## SushiRoll (Migrator)

In the [SushiRoll](https://github.com/sushiswap/sushiswap/blob/master/contracts/SushiRoll.sol) contract a migrator is provided, so people can easily move liquidity from Uniswap to SushiSwap.

With the migrate function, you essentially

1. Remove liquidity from Uniswap.
2. Add liquidity in SushiSwap.

Any potential leftover tokens from the token pair will be returned to the user.

```solidity
function migrate(
    address tokenA,
    address tokenB,
    uint256 liquidity,
    uint256 amountAMin,
    uint256 amountBMin,
    uint256 deadline
) external {
    require(deadline >= block.timestamp, 'SushiSwap: EXPIRED');

    // Remove liquidity from the old router with permit
    (uint256 amountA, uint256 amountB) = removeLiquidity(
        tokenA,
        tokenB,
        liquidity,
        amountAMin,
        amountBMin,
        deadline
    );

    (uint256 pooledAmountA, uint256 pooledAmountB)
        = addLiquidity(tokenA, tokenB, amountA, amountB);

    if (amountA > pooledAmountA) {
        IERC20(tokenA).safeTransfer(msg.sender, amountA - pooledAmountA);
    }
    
    if (amountB > pooledAmountB) {
        IERC20(tokenB).safeTransfer(msg.sender, amountB - pooledAmountB);
    }
}
```

## MasterChef

\
The [MasterChef](https://github.com/sushiswap/sushiswap/blob/master/contracts/MasterChef.sol) enables the minting of new SUSHI token. It's the only way that SUSHI tokens are created. This is possible by staking LP tokens inside the MasterChef.&#x20;

The MasterChef is controlled by the owner which originally used to be [Chef Nomi](https://twitter.com/nomichef), but is since controlled by a 9 person multi-sig belonging to:

* [SBF\_Alameda](https://twitter.com/SBF\_Alameda) (FTX CEO)
* [Rleshner](https://twitter.com/Rleshner) (Compound founder)
* [0xMaki](https://twitter.com/0xMaki) (Sushiswap GM)
* [Lawmaster](https://twitter.com/Lawmaster) (head of Research at The Block)
* [CMsholdings](https://twitter.com/CMsholdings) (CMS Holdings)
* [Mattysino](https://twitter.com/Mattysino) (CEO of Sino Global Capital)
* [mickhagen](https://twitter.com/mickhagen)（Genesis Block founder)
* [AdamScochran](https://twitter.com/AdamScochran) (partner at Cinneamhain Ventures)
* [zippoxer](https://twitter.com/zippoxer) (Zippo)

Eventually the plan is to move control of the MasterChef to governance. The owner has the power to control the allocations points from pools. What this means is the higher the allocation points of a liquidity pool, the more SUSHI one receives for staking its LP tokens. In the future this might create powerful control to create incentives for participating in special liquidity pools.

The owner can control pool allocations via the `add` function:

```solidity
function add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate) public onlyOwner;
```

## updatePool

Ongoing pools can be updated and then mint SUSHI to the people staking the LP tokens using `updatePool`.

The newly minted SUSHI amount per pool depends on the passed blocks since the last update and the set **allocation points** for the pool. (plus some extra multiplier left out for simplicity in the example on the right)

The **calculated sushiReward is then distributed in 10% towards the dev address** and the other 90% towards the pool LP stakers.

```solidity
function updatePool(uint256 _pid) public {
    PoolInfo storage pool = poolInfo[_pid];
    if (block.number <= pool.lastRewardBlock) {
        return;
    }
    uint256 lpSupply = pool.lpToken.balanceOf(address(this));
    if (lpSupply == 0) {
        pool.lastRewardBlock = block.number;
        return;
    }

    uint256 sushiReward = sushiPerBlock
        .mul(pool.allocPoint)
        .div(totalAllocPoint);

    sushi.mint(devaddr, sushiReward.div(10));
    sushi.mint(address(this), sushiReward);

    pool.accSushiPerShare = pool.accSushiPerShare.add(
        sushiReward.mul(1e12).div(lpSupply)
    );
    pool.lastRewardBlock = block.number;
}
```

## deposit

Using the deposit function users can stake their LP tokens for the provided pool. This will put the user's LP token into the MasterChef contract.

```solidity
function deposit(uint256 _pid, uint256 _amount) public {
    PoolInfo storage pool = poolInfo[_pid];
    UserInfo storage user = userInfo[_pid][msg.sender];
    updatePool(_pid);
    if (user.amount > 0) {
        uint256 pending = user.amount
                .mul(pool.accSushiPerShare)
                .div(1e12)
                .sub(user.rewardDebt);
        safeSushiTransfer(msg.sender, pending);
    }

    pool.lpToken.safeTransferFrom(
        address(msg.sender),
        address(this),
        _amount
    );

    user.amount = user.amount.add(_amount);
    user.rewardDebt = user.amount
        .mul(pool.accSushiPerShare)
        .div(1e12);
}
```

## withdraw

Using the withdraw function users can **unstake** their LP tokens for the provided pool. In return they will

1. receive their original LP tokens
2. get their share of newly minted SUSHI tokens

The amount of minted SUSHI depends on the `accSushiPerShare` computed previously (see **updatePool**).

```solidity
function withdraw(uint256 _pid, uint256 _amount) public {
    PoolInfo storage pool = poolInfo[_pid];
    UserInfo storage user = userInfo[_pid][msg.sender];
    require(user.amount >= _amount, "withdraw: not good");
    updatePool(_pid);
    uint256 pending =
        user.amount
            .mul(pool.accSushiPerShare)
            .div(1e12)
            .sub(user.rewardDebt);
    safeSushiTransfer(msg.sender, pending);
    user.amount = user.amount.sub(_amount);
    user.rewardDebt = user.amount
        .mul(pool.accSushiPerShare)
        .div(1e12);
    pool.lpToken.safeTransfer(address(msg.sender), _amount);
}
```

## Pending Sushi

```solidity
function pendingSushi(uint256 _pid, address _user)
    external
    views
    returns (uint256)
{
    PoolInfo storage pool = poolInfo[_pid];
    UserInfo storage user = userInfo[_pid][_user];
    uint256 accSushiPerShare = pool.accSushiPerShare;
    uint256 lpSupply = pool.lpToken.balanceOf(address(this));
    if (block.number > pool.lastRewardBlock && lpSupply != 0) {
        uint256 multiplier =
            getMultiplier(pool.lastRewardBlock, block.number);
        uint256 sushiReward =
            multiplier.mul(sushiPerBlock).mul(pool.allocPoint).div(
                totalAllocPoint
            );
        accSushiPerShare = accSushiPerShare.add(
            sushiReward.mul(1e12).div(lpSupply)
        );
    }
    return user.amount.mul(accSushiPerShare).div(1e12).sub(user.rewardDebt);
}
```
