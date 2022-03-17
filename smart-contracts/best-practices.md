---
description: Solidity programming practices
---

# Best Practices

### SafeMath

> “Arithmetic operations in Solidity wrap on overflow. This can easily result in bugs, because programmers usually assume that an overflow raises an error, which is the standard behavior in high level programming languages. \`SafeMath\` restores this intuition by reverting the transaction when an operation overflows.
>
> Using this library instead of the unchecked operations eliminates an entire class of bugs, so it’s recommended to use it always.” — [OpenZeppelin docs](https://docs.openzeppelin.com/contracts/3.x/api/math)

“Operations in Solidity wrap on overflow” refers to a specific thing bound to the way numbers are represented in computers and in Solidity, in particular.

_Overflow_ and _Underflow_ example:

![](<../.gitbook/assets/imagem (4).png>)What you see in the figure is what the sentence “operations in Solidity wrap on overflow” means. Now, just imagine if the `uint8` we fiddled with represents an amount of some precious assets. This just means that your system will work gloriously in the majority of cases (increments and decrements far from the limits of the representation) and will fail dramatically, producing an inconsistent state.

![](<../.gitbook/assets/imagem (2).png>)![](<../.gitbook/assets/imagem (5).png>)

At this point, it is clear that _we do need a safer math —_ even in the simplest smart contract.

**SafeMath** is provided by _OpenZeppelin_ for `uint256`. This means that it will never overflow with our example that uses `uint8`. For example, you should overflow if you pass a 255, but it will not because it will be represented within SafeMath as a `uint256`.

_Reference:_ [https://betterprogramming.pub/solidity-do-we-really-need-a-safer-math-733ea7a9ea44](https://betterprogramming.pub/solidity-do-we-really-need-a-safer-math-733ea7a9ea44)
