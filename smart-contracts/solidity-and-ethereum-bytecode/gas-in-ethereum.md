---
description: >-
  Each transaction has to pay a gas fee, more complicated transactions consume
  more gas, so they cost more.
---

# Gas in Ethereum

### Gas limits and refunds

* Each transaction specifies a gas limit and a price for the gas, in units of Ether;
* Ether value to pay for the gas must be reserved up front;
* At the end of contract execution, unused gas is refunded.

### There is a table for how much each opcode spends of gas:

{% embed url="https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0" %}
Reference: [https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem\_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0](https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem\_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0)
{% endembed %}

This is based on the compiled opcodes for **EVM**, not high level code.

"Formula" means the gas for this opcode depends on the arguments, for example the size of the argument.

### What happens when you run out of gas?

1. An **Out-Of-Gas** exception is thrown;
2. Any changes made to storage variables, any account transfers, are **reverted** to their state before this method call;
3. You are **still charged** the gas fee for every instruction leading up to the exception;
4. Like other exceptions, it can be **caught** by a handler function;
5. Methods can be invoked with just a portion of available gas.

Reference: [https://www.youtube.com/watch?v=R3p7O53lk8s\&list=PLS01nW3Rtgor6y\_5TyhTcsu5IWA25wW81\&index=80](https://www.youtube.com/watch?v=R3p7O53lk8s\&list=PLS01nW3Rtgor6y\_5TyhTcsu5IWA25wW81\&index=80)
