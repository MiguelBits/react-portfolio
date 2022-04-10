---
description: >-
  Reference:
  https://www.youtube.com/watch?v=pJKy5HWuFK8&list=PLS01nW3RtgopJOtsMVOK3N7n7qyNMPbJ_&index=12
---

# Smart Contract Security

#### Safe Transfer functions

* They protect **users** from typos, from sending tokens to the wrong address,
* However for programmers they introduce new security risks. To know why let's take a look on unsafe external calls

### Unsafe External Calls

During an external call, an attacker has full control

* Interact with your smart contract again and again (reentrancy)
* Interact with other contracts

All external calls to non-trusted contracts may be unsafe!

#### How to determine if an external call is unsafe?

The external call must be contributing something, it has to be changing some state variables and/or giving some parameters for later use.

* What has the function already checked/changed?
* What will the function check/change?

![](<.gitbook/assets/image (2).png>)

## Reentrancy Attack Execution

Example of unsafe external function call, that results in the batch mint of more NFTs than the max supply cap.

![Call to the \_safeMint Function should be looked into](<.gitbook/assets/image (13).png>)

!["to" function external call is exploitable](<.gitbook/assets/image (6).png>)

Given that there's an unsafe external call, we can begin minting 20 NFTs, reaching the supply cap, when we pass the 5 require checks, we are going to receive a callback, during this callback we can choose to mint another 19 NFTs, because only 1 NFT is in minting process and it's what's left to reach to max supply cap.

![The result is that we have minted +19 NFTs that the programmer did not intend us to](<.gitbook/assets/image (3).png>)

## Executing in the Mempool

This exploit is done in a contract that allows the recovery of tokens, the recovery logic in this contract basically allows you to grant access to your holder ID, to another user.

![](<.gitbook/assets/image (5).png>)

However note that in this platform, when two accounts have the same ID, they are considered the same account. This means that we can bypass this check for allowances, because from ID does equal to sender ID:

![](<.gitbook/assets/image (10).png>)

If we could figure who was gonna get the tokens, then we could grant them access to our own ID, and then we could bypass the allowance check.

To do this understand this first:

![](<.gitbook/assets/image (14).png>)Between the marked steps, the transaction is visible to the public blockchain, but not mined already, that is not included in the block.

So anyone scanning the **mempool** can actually see what your transaction is and what it's going to do, and react accordingly.

To exploit this: ![](<.gitbook/assets/image (4).png>)Note: **Frontrunning** is sending the same transaction with more gas paid than the other transaction in order to get included in the block first then the other transaction.

