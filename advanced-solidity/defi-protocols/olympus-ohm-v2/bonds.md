# Bonds

## Bonding

Olympus bonds are a financial primitive for protocols to acquire assets, including their own liquidity, in exchange for governance tokens at a discount. In other words, Olympus bonds are a pricing mechanism for any two ERC-20 tokens that does not rely on third parties like oracles. Olympus bonds internally respond to supply and demand by offering a variable ROI rate to the market and its users.

### **How do both the Olympus Treasury and the bonder benefit from the process?**

Bonds are the primary mechanism for Treasury inflows, and thus, the growth of the network.Bonders commit a capital sum upfront and are promised a fixed return at a set point in time; that return is in OHM and thus the bonder's profit would depend on OHM price when the bond matures. In Olympus v2, users who bond their assets for OHM reap the same benefits as stakers as OHM is automatically staked at the time of a bond purchase.If the ROI is positive – a bond can be purchased at a discount to market price) – market participants (bonders) are incentivized to exchange their assets for gOHM, vested over a period of time. The Treasury sells OHM at a premium to its backing, while the bonder is able to capture a discount (positive ROI) by purchasing OHM directly from the Treasury. However, if the variable ROI is negative, and market participants are unable to express their demand on the bond marketplace, they would have to resort to a decentralized exchange.The variable ROI rate is at the one hand determined by the demand for the given bond on the Olympus bond marketplace, and on the other hand it is governed by the policy team which sets the BCV which determines the bond capacity. In exchange for being temporarily illiquid, and exposed to OHM/gOHM volatility for the duration of the vesting period, the bonder is rewarded with a variable ROI rate.

## **Check value of Bond**

```solidity
pragma solidity ^0.7.5;

import "./libraries/SafeMath.sol";
import "./libraries/FixedPoint.sol";
import "./libraries/Address.sol";
import "./libraries/SafeERC20.sol";

import "./interfaces/IERC20Metadata.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IBondingCalculator.sol";
import "./interfaces/IUniswapV2ERC20.sol";
import "./interfaces/IUniswapV2Pair.sol";

contract OlympusBondingCalculator is IBondingCalculator {
    using FixedPoint for *;
    using SafeMath for uint256;

    IERC20 internal immutable OHM;

    constructor(address _OHM) {
        require(_OHM != address(0), "Zero address: OHM");
        OHM = IERC20(_OHM);
    }

    function getKValue(address _pair) public view returns (uint256 k_) {
        uint256 token0 = IERC20Metadata(IUniswapV2Pair(_pair).token0()).decimals();
        uint256 token1 = IERC20Metadata(IUniswapV2Pair(_pair).token1()).decimals();
        uint256 decimals = token0.add(token1).sub(IERC20Metadata(_pair).decimals());

        (uint256 reserve0, uint256 reserve1, ) = IUniswapV2Pair(_pair).getReserves();
        k_ = reserve0.mul(reserve1).div(10**decimals);
    }

    function getTotalValue(address _pair) public view returns (uint256 _value) {
        _value = getKValue(_pair).sqrrt().mul(2);
    }

    function valuation(address _pair, uint256 amount_) external view override returns (uint256 _value) {
        uint256 totalValue = getTotalValue(_pair);
        uint256 totalSupply = IUniswapV2Pair(_pair).totalSupply();

        _value = totalValue.mul(FixedPoint.fraction(amount_, totalSupply).decode112with18()).div(1e18);
    }
    function markdown(address _pair) external view override returns (uint256) {
        (uint256 reserve0, uint256 reserve1, ) = IUniswapV2Pair(_pair).getReserves();

        uint256 reserve;
        if (IUniswapV2Pair(_pair).token0() == address(OHM)) {
            reserve = reserve1;
        } else {
            require(IUniswapV2Pair(_pair).token1() == address(OHM), "Invalid pair");
            reserve = reserve0;
        }
        return reserve.mul(2 * (10**IERC20Metadata(address(OHM)).decimals())).div(getTotalValue(_pair));
    }
```
