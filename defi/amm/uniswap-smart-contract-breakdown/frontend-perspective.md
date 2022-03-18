---
description: >-
  Reference:
  https://medium.com/clearmatics/how-i-made-a-uniswap-interface-from-scratch-b51e1027ca87
---

# Frontend Perspective

### The swap function <a href="#c01d" id="c01d"></a>

The `swapTokens` function makes a transaction to the **Router** contract on the blockchain to perform one of three different swaps (AUT to token, token to AUT, token to token), depending on the token addresses provided to it, `address1` and `address2`.

* If `address1` is the address of the **Weth** contract, it calls the **Router** function `swapExactETHForTokens`
* If `address2` is the address of the **Weth** contract, it calls the **Router** function `swapExactTokensForETH`
* If neither `address1` or `address2` is the address of the **Weth** contract, the `swapTokens` function calls the **Router** function `swapExactTokensForTokens`

```
export async function swapTokens(
  address1,
  address2,
  amount,
  routerContract,
  accountAddress,
  signer
) {
  const tokens = [address1, address2];
  const time = Math.floor(Date.now() / 1000) + 200000;
  const deadline = ethers.BigNumber.from(time);
  const amountIn = ethers.utils.parseEther(amount.toString());
  const amountOut = await routerContract.callStatic.getAmountsOut(
    amountIn,
    tokens
  );
const token1 = new Contract(address1, ERC20.abi, signer);
  await token1.approve(routerContract.address, amountIn);
if (address1 === COINS.AUTONITY.address) {
    // Eth -> Token
    await routerContract.swapExactETHForTokens(
      amountOut[1],
      tokens,
      accountAddress,
      deadline,
      { value: amountIn }
    );
  } else if (address2 === COINS.AUTONITY.address) {
    // Token -> Eth
    await routerContract.swapExactTokensForETH(
      amountIn,
      amountOut[1],
      tokens,
      accountAddress,
      deadline
    );
  } else {
    await routerContract.swapExactTokensForTokens(
      amountIn,
      amountOut[1],
      tokens,
      accountAddress,
      deadline
    );
  }
}
```

The function `getAmountOut` is used to get a preview of a swap. It calls the **Router** function `getAmountsOut` with the amount of the first token and an array of the addresses of the tokens to be swapped as parameters. It returns the amount out of the second token.

```
export async function getAmountOut(
  address1,
  address2,
  amountIn,
  routerContract
) {
  try {
    const values_out = await routerContract.getAmountsOut(
      ethers.utils.parseEther(amountIn),
      [address1, address2]
    );
    const amount_out = ethers.utils.formatEther(values_out[1]);
    return Number(amount_out);
  } catch {
    return false;
  }
}
```

### The reserves function <a href="#1684" id="1684"></a>

Returns the liquidity pool reserves for a given pair of tokens, as well as the **liquidity token balance for the user**. Internally this function calls another function `fetchReserves`, which fetches the reserves by making a call to the pair contract then making sure the reserves are returned in the right order.

```
export async function fetchReserves(address1, address2, pair) {
  try {
    const reservesRaw = await pair.getReserves();
    let results = [
      Number(ethers.utils.formatEther(reservesRaw[0])),
      Number(ethers.utils.formatEther(reservesRaw[1])),
    ];

    return [
      (await pair.token0()) === address1 ? results[0] : results[1],
      (await pair.token1()) === address2 ? results[1] : results[0],
    ];
  } catch (err) {
    console.log("no reserves yet");
    return [0, 0];
  }
}
```

```
export async function getReserves(
  address1,
  address2,
  factory,
  signer,
  accountAddress
) {
  const pairAddress = await factory.getPair(address1, address2);
  const pair = new Contract(pairAddress, PAIR.abi, signer);

  const reservesRaw = await fetchReserves(address1, address2, pair);
  const liquidityTokens_BN = await pair.balanceOf(accountAddress);
  const liquidityTokens = Number(
    ethers.utils.formatEther(liquidityTokens_BN)
  ).toFixed(2);

  return [
    reservesRaw[0].toFixed(2),
    reservesRaw[1].toFixed(2),
    liquidityTokens,
  ];
}
```

### Add Liquidity

The `addLiquidity` function has a similar layout to the `swapTokens` function described above.

It approves the router to spend given amounts for the contracts of the two provided addresses, then makes a transaction to the router contract on the blockchain to perform one of three different liquidity additions (AUT + token, token + AUT, token + token), depending on the pair of addresses provided to it, `address1` and `address2:`

```
export async function quoteAddLiquidity(
  address1,
  address2,
  amountADesired,
  amountBDesired,
  factory,
  signer
) {
  const pairAddress = await factory.getPair(address1, address2);
  const pair = new Contract(pairAddress, PAIR.abi, signer);

  const reservesRaw = await fetchReserves(address1, address2, pair); // Returns the reserves already formated as ethers
  const reserveA = reservesRaw[0];
  const reserveB = reservesRaw[1];

  if (reserveA === 0 && reserveB === 0) {
    let amountOut = Math.sqrt(reserveA * reserveB);
    return [
      amountADesired.toString(),
      amountBDesired.toString(),
      amountOut.toString(),
    ];
  } else {
    let [amountBOptimal, amountOut] = quote(amountADesired, reserveA, reserveB);
    if (amountBOptimal <= amountBDesired) {
      return [
        amountADesired.toString(),
        amountBOptimal.toString(),
        amountOut.toString(),
      ];
    } else {
      let [amountAOptimal, amountOut] = quote(
        amountBDesired,
        reserveB,
        reserveA
      );
      console.log(amountAOptimal, amountOut);
      return [
        amountAOptimal.toString(),
        amountBDesired.toString(),
        amountOut.toString(),
      ];
    }
  }
}
```

### Remove liquidity <a href="#7f0d" id="7f0d"></a>

First it approves the router to spend the given amount for the pair contract of the two provided addresses (as the pair contract itself is ERC20 compatible, and is used to hold the liquidity pool tokens). It then makes a transaction to the router contract on the blockchain to perform one of three different liquidity removals (AUT + token, token + AUT, token + token), depending on the pair of addresses provided to it, `address1` and `address2` :

```
export async function quoteAddLiquidity(
  address1,
  address2,
  amountADesired,
  amountBDesired,
  factory,
  signer
) {
  const pairAddress = await factory.getPair(address1, address2);
  const pair = new Contract(pairAddress, PAIR.abi, signer);

  const reservesRaw = await fetchReserves(address1, address2, pair); // Returns the reserves already formated as ethers
  const reserveA = reservesRaw[0];
  const reserveB = reservesRaw[1];

  if (reserveA === 0 && reserveB === 0) {
    let amountOut = Math.sqrt(reserveA * reserveB);
    return [
      amountADesired.toString(),
      amountBDesired.toString(),
      amountOut.toString(),
    ];
  } else {
    let [amountBOptimal, amountOut] = quote(amountADesired, reserveA, reserveB);
    if (amountBOptimal <= amountBDesired) {
      return [
        amountADesired.toString(),
        amountBOptimal.toString(),
        amountOut.toString(),
      ];
    } else {
      let [amountAOptimal, amountOut] = quote(
        amountBDesired,
        reserveB,
        reserveA
      );
      console.log(amountAOptimal, amountOut);
      return [
        amountAOptimal.toString(),
        amountBDesired.toString(),
        amountOut.toString(),
      ];
    }
  }
}
```

### Add liquidity quote <a href="#894a" id="894a"></a>

One necessary feature of the liquidity page was that the user would see a preview of adding the liquidity before actually doing it.

To add liquidity, the user chooses the tokens then inputs the desired values of each token to be added to the liquidity pool. The amount of each token that is actually added has to match the ratio of the reserves already in the pool, so the maximum possible amount of both tokens is first found using equation 1:

_Ain = Input of coin A_

_Bin = Optimum input of coin B_

_Ra = Reserves of coin A_

_Rb = Reserves of coin B_

![](https://miro.medium.com/max/640/1\*5vEmY3-reHmzqf3ggeZNBg.png)Equation 1

This is calculated for first using the input for coin A as `amount1.` If the output `amount2` is larger than the input for coin B, then the input for coin B is instead used to set the amounts of liquidity added.

The amount of liquidity tokens created for the user is given by the geometric mean of the inputs of A and B:

_Lout = Liquidity tokens out_

![](https://miro.medium.com/max/792/1\*NKqym3bKg0BSKFASBgMPQg.png)Equation 2

The code for this is defined in the function `quoteAddLiquidity`, which uses the internal function `quote`:

```
const quote = (amount1, reserve1, reserve2) => {
  const amount2 = amount1 * (reserve2 / reserve1);
  const amountOut = Math.sqrt(amount2 * amount1);
  return [amount2, amountOut];
};
```

