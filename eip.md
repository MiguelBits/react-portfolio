---
description: Ethereum Improvement Protocols
---

# EIP

Reference: [https://blog.bitium.agency/eips-all-blockchain-developers-should-know-part-1-eip-5-eip-7-eip-20-eip-140-eip-214-33d13df54b4c](https://blog.bitium.agency/eips-all-blockchain-developers-should-know-part-1-eip-5-eip-7-eip-20-eip-140-eip-214-33d13df54b4c)

[https://blog.bitium.agency/eips-all-blockchain-developers-should-know-part-2-eip-695-eip-721-eip-777-eip-1041-eip-1052-58b7730e5305](https://blog.bitium.agency/eips-all-blockchain-developers-should-know-part-2-eip-695-eip-721-eip-777-eip-1041-eip-1052-58b7730e5305)

EIPs are Ethereum Improvement Proposals. Experts design EIPs to provide information and introduce new features of Ethereum. Knowing these proposals improves your knowledge of Ethereum and it’ll help you become a better blockchain developer.

## EIPs All Blockchain Developers Should Know: <a href="#0a60" id="0a60"></a>

### Types <a href="#7f21" id="7f21"></a>

EIPs are the best way to keep track of Ethereum changes, There are 4 different types of EIPs:

* **Standards Track EIP;** any major Ethereum change, including:\
  – **Core;** Improvements that require a fork or changes related to core dev.\
  – **Networking;** Improvements around devp2p and Ethereum networking protocols.\
  – **Interface;** Improvements in client API/RPC standards and also language level specifications like naming and ABIs.
* **ERC;** Application-level standards and conventions like contract standards.
* **Meta EIP;** Processes around Ethereum or a change in a process. Users can’t ignore these EIPs. They include procedures, guidelines, changes, etc.
* **Informational EIP;** Describes design issues and information about the Ethereum but doesn’t introduce a new feature.

## EIP-5 — Gas Usage for RETURN and CALL\* <a href="#5696" id="5696"></a>

In solidity when you call a function, its output size has to be specified in advance. But sometimes you need to call functions that return dynamically sized arrays like strings or byte arrays. One workaround is to set a large size but it’s not gas efficient.

EIP-5 introduces a way to make a gas-efficient call to a function. When you call a function that returns a dynamically sized array you only pay for the input data memory. Once you call the function, it will return the data and only charges you for the used memory.

## EIP-7 — DELEGATECALL <a href="#1972" id="1972"></a>

Before this EIP there were only 2 types of function calls in solidity smart contracts. `CALL`, `CALLCODE`. When you use `DELEGATECALL` to call a function, it propagates the `msg.sender` and `msg.value` to the function call. Here is the summary of how each one works:

* When _A_ `CALL` on _B_, the EVM uses the _B_ storage
* When _A_ `CALLCODE` on _B_, EVM runs the code of _B_ on _A_ storage (deprecated)
* When you call a function of _A_ and _A_ `DELEGATECALL` on _B_, EVM runs the code of _B_ on _A_ storage, the `msg.sender` is you, and the `msg.value` is the value that you have sent.

`DELEGATECALL` is mostly used in proxy contracts and also [EIP-2535 diamond](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard).

## EIP-140 — REVERT instruction <a href="#2407" id="2407"></a>

Before the `revert` instruction, you could use `assert` to stop the execution of a function. The downside is that `assert` consumes all of the gas. After the introduction of `revert`, you no longer have to use `assert`. Instead, you can use it to stop the execution and return the remaining gas to the caller.

Another advantage of `revert` is that you can return a value.

![](<.gitbook/assets/image (1).png>)

## EIP-214 — New opcode STATICCALL <a href="#fa75" id="fa75"></a>

This one is a security feature. `STATICCALL` works exactly like `CALL` except it prevents any state change. Any attempts to perform a state change will result in an exception. You should use this opcode when you want to make sure that the function you call, won’t have access to modify the states.



## EIP-695 — Create eth\_chainId method for JSON-RPC <a href="#ff87" id="ff87"></a>

Currently, many EVM-based chains exist. Ethereum, BNB, and Polygon are just some of them. You need to know the chainId to connect to the right chain. After EIP-695 you can query the JSON RPC to get the chainId. It’s a best practice to always check the chainId and show a proper error if the user isn’t connected to the desired chain in your dApp.

> You should use `eth_chainId` instead of `net_version`, so you can reliably identify the chain you are communicating with.
>
>
>
> Most web3 packages have implemented this method, in `ethersjs` you can get the chainId with the following code snippet.
>
> ```
> const { chainId } = await provider.getNetwork()
> ```

## EIP-777 — Token Standard <a href="#a660" id="a660"></a>

EIP-777 is a new backward compatible token standard. It aims to add advanced features to the EIP-20 token standard to enhance interactions with the token.

In this standard, the developers introduced the operator concept. Operators can send tokens on behalf of another address. Send and receive hooks are also a new feature of this standard. When tokens are transferred to an address, the receive hook is called, now smart contract developers can add custom logic to handle token receives. This way you can directly send tokens to smart contracts without needing approval.

Some of the functions that don’t exist in EIP-20 token standard.

* granularity
* defaultOperators
* isOperatorFor
* authorizeOperator
* revokeOperator
* operatorSend
* operatorBurn

The `granularity` function returns the smallest part of the token that’s not divisible. You should not mistake it with the `decimals` function which is not mandatory in EIP-777, but you have to implement it if you want the `decimals` to return anything but 18.

## EIP-1014 — Skinny CREATE2 <a href="#57b3" id="57b3"></a>

`CREATE` opcodes are for contract creations. When you deploy a smart contract using `CREATE`, Ethereum computes the contract address using the following formula.

```
address = keccak256(rlp.encode(sender, nonce))[12:]
```

you can see that the address is dependent on the nonce. A nonce is a number attached to each wallet that gets increased by each transaction. This way there is no way to know the contract address in advance.

![](<.gitbook/assets/image (18).png>)When you deploy a contract using the `CREATE2` opcode. Ethereum computes the contract address using the below formula.

```
keccak256( 0xff ++ address ++ salt ++ keccak256(init_code))[12:]
```

You can see that all of the above variables are known. This way you’ll know the contract address even before deployment. You can try this feature using Hardhat or Truffle. Try to deploy a contract and print it’s address. Now head to Etherscan and search that address. You can see that the contract is not deployed yet but you already have the address.

## EIP-1052 — EXTCODEHASH opcode

This EIP is also about a new opcode. The `EXTCODEHASH` returns the keccak256 hash of a contract’s code. Before this, you could only ask for a contract’s bytecode which is expensive, especially when you are dealing with large smart contracts.\


The `EXTCODEHASH` has many use cases. For example, you can use the following snippet to check if an address is a contract.

```
bytes32 codeHash;    assembly { codeHash := extcodehash(account) }return (codeHash != accountHash && codeHash != 0x0);
```

Be aware that this piece of code will return a false true in the following scenarios.

* A contract in construction
* An address where a contract will be created
* An address where a contract lived, but was destroyed
