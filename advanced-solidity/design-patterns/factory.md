---
description: >-
  Reference:
  https://blog.logrocket.com/creating-contract-factory-clone-solidity-smart-contracts/#the-factory-pattern
---

# Factory

## The factory pattern <a href="#the-factory-pattern" id="the-factory-pattern"></a>

The factory design pattern is a well-known programming pattern. The concept is simple: instead of directly creating instances of objects, you have a single object (the factory) that does it for you.

This is the same with Solidity because smart contracts are objects. In Solidity, a factory is a contract that will deploy multiple instances of other contracts.

We sometimes need to create different types of objects, but we don’t know what kind of object we’ll instantiate until the code is executed at runtime. In such cases, the factory technique comes in handy.

Generally, a basic factory contract should be able to deploy multiple instances of the same contract, store these created instances on the blockchain, and retrieve them when needed. You may want to add more functionality for managing deployed contracts like retrieving a specific instance of the contract, disabling an instance of the contract, and so on.

### Benefits of using the factory pattern in Solidity <a href="#benefits-of-using-the-factory-pattern-in-solidity" id="benefits-of-using-the-factory-pattern-in-solidity"></a>

The following are benefits of using the factory pattern in Solidity:

1. Deployments of multiple contracts with high gas-efficiency
2. Keep track of all deployed contracts
3. Save gas on multiple contract deployments

## When to use the factory pattern <a href="#when-to-use-the-factory-pattern" id="when-to-use-the-factory-pattern"></a>

The factory pattern is effective in the following situations:

* When we need to quickly produce multiple instances of a smart contract at runtime
* When we’re dealing with a large number of contracts that all have the same functionalities

### Types of factory patterns in Solidity <a href="#types-of-factory-patterns-in-solidity" id="types-of-factory-patterns-in-solidity"></a>

We’ll discuss two types of factory patterns commonly implemented in [Solidity smart contracts](https://blog.logrocket.com/writing-smart-contracts-solidity/). These patterns include:

* The normal factory pattern — this factory pattern deploys multiple instances of other contracts without any optimization to save gas on each deployment
* The cloned factory pattern — this factory pattern deploys multiple instances of other contracts with emphasis on optimization to save gas on each deployment

## Our first Solidity smart contract <a href="#our-first-solidity-smart-contract" id="our-first-solidity-smart-contract"></a>

We’ll create a simple smart contract that will be used by the factory contract to deploy multiple instances of it:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

contract Foundation {
    string public name;
    address public _owner;

    constructor(
        string memory _name,
        address _owner
    ) public {
        name = _name;
        _owner = msg.sender;
    }

}
```

Because Ethereum is an open source project, the first line shows the contract’s open source license. The second line specifies the Solidity version necessary to execute this contract.

## Writing our first factory contract

The Foundation contract currently has no means of being created. So, we are going to make a factory contract that will create the individual instances of the Foundation contract using the normal factory pattern.

Below is what a normal factory contract should look like:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;
import "./Foundation.sol";
contract FoundationFactory {
    Foundation[] private _foundations;
    function createFoundation(
        string memory name
    ) public {
        Foundation foundation = new Foundation(
            name,
            msg.sender
        );
        _foundations.push(foundation);
    }
    function allFoundations(uint256 limit, uint256 offset)
        public
        view
        returns (Foundation[] memory coll)
    {
        return coll;
    }
}
```

Here, this code imports the `Foundation` contract, which we want to create multiple instances of. The `_foundations` variable holds the instances of the `Foundation` contract created.

The `createFoundation` function deploys an instance of the `Foundation` contract and stores it in the blockchain while the function `allFoundations` retrieves all instances of the `Foundation` contract stored in the blockchain.

### A drawback of the normal factory pattern <a href="#a-drawback-of-the-normal-factory-pattern" id="a-drawback-of-the-normal-factory-pattern"></a>

The gas cost for the CREATE opcode is presently 32,000 Gwei. Each time an instance of the `Foundation` contract is deployed, a gas fee of 32,000 Gwei is charged.

The major drawback of the normal factory pattern is [high gas costs](https://ethereum.stackexchange.com/q/84764/33305). And that’s where the cloned factory pattern comes in handy.

The **clone factory pattern**: The right pattern for deploying multiple instances of our Solidity smart contract

## Why the clone factory pattern? <a href="#why-the-clone-factory-pattern" id="why-the-clone-factory-pattern"></a>

Since we’re deploying the same contract, each instance of the contract will have identical bytecode. So, storing all bytecode for each deployment repeatedly promotes wastage of gas costs for the bytecode.

The solution to this is a mechanism to deploy only one instance of the `Foundation` contract and have all other instances of the `Foundation` contract behave as proxies, delegating calls to the first instance of the `Foundation` contract and allowing functions to run in the context of the proxy contracts. With this, each instance of the `Foundation` contract will have its own state and simply uses the instance of the `Foundation` contract established by us as a library.

The [eip-1167](https://eips.ethereum.org/EIPS/eip-1167) created by [Peter Murray](https://github.com/yarrumretep), [Nate Welch](https://github.com/nathanwelch), [Joe Messerman](https://github.com/JAMesserman) provides this mechanism. According to its [documentation](https://eips.ethereum.org/EIPS/eip-1167), “This standard specifies a minimal bytecode implementation that delegates all calls to a known, fixed address to simply and cheaply clone contract functionality in an immutable way.”

The [clone factory contract](https://github.com/optionality/clone-factory) is a reference implementation of the [eip-1167](https://eips.ethereum.org/EIPS/eip-1167) standard.

* Ensure that your master contract is not self-destructed as it will cause all clones to stop working, thus freezing their state and balances
* Ensure that your master contract is preinitialized in your constructor because the only time the master contract constructor is called is during the master contract’s creation

While this is a better mechanism, you should look out for the following:

With the above snippet, we have a contract that will delegate all calls to the contract `libraryAddress` at a lower gas cost.

Here, we import the `Ownable` contract from the OpenZeppelin library in order to make use of its `onlyOwner` modifier since it’s audited and more secured compared to writing one ourselves.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;
import "./Foundation.sol";
import "@optionality.io/clone-factory/contracts/CloneFactory.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract FoundationFactory is Ownable, CloneFactory {

  address public libraryAddress;

  event FoundationCreated(address newFoundation);

  function FoundationFactory(address _libraryAddress) public {
    libraryAddress = _libraryAddress;
  }

  function setLibraryAddress(address _libraryAddress) public onlyOwner {
    libraryAddress = _libraryAddress;
  }

  function createFoundation(string _name) public onlyOwner {
    address clone = createClone(libraryAddress);
    Foundation(clone).init(_name);
    FoundationCreated(clone);
  }
}
```

Now we can implement the clone factory contract on our `FoundationFactory` as follows

```
npm install @optionality.io/clone-factory
```

To implement the clone factory contract, you’ll have to install the clone-factory package as follows:

## Using the clone factory pattern <a href="#using-the-clone-factory-pattern" id="using-the-clone-factory-pattern"></a>

Now we can implement the clone factory contract on our `FoundationFactory` as follows

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;
import "./Foundation.sol";
import "@optionality.io/clone-factory/contracts/CloneFactory.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract FoundationFactory is Ownable, CloneFactory {

  address public libraryAddress;

  event FoundationCreated(address newFoundation);

  function FoundationFactory(address _libraryAddress) public {
    libraryAddress = _libraryAddress;
  }

  function setLibraryAddress(address _libraryAddress) public onlyOwner {
    libraryAddress = _libraryAddress;
  }

  function createFoundation(string _name) public onlyOwner {
    address clone = createClone(libraryAddress);
    Foundation(clone).init(_name);
    FoundationCreated(clone);
  }
}
```

Here, we import the `Ownable` contract from the OpenZeppelin library in order to make use of its `onlyOwner` modifier since it’s audited and more secured compared to writing one ourselves.

With the above snippet, we have a contract that will delegate all calls to the contract `libraryAddress` at a lower gas cost.

While this is a better mechanism, you should look out for the following:

* Ensure that your master contract is not self-destructed as it will cause all clones to stop working, thus freezing their state and balances
* Ensure that your master contract is preinitialized in your constructor because the only time the master contract constructor is called is during the master contract’s creation

## Comparison between the normal factory and clone factory patterns

In order to examine the difference in gas cost between the `CloneFactory` and the normal factory, we’ll deploy each contract to a testnet, followed by executing each contract’s `createFoundation` function, then check the transaction hash in the explorer to know how much gas was used. Below is the gas fee charged on executing the `createFoundation` function:

Clone factory\
Gas Fees:\
Base: 12.959896517 Gwei

Normal factory\
Gas Fees:\
Base: 25.529794514 Gwei

\
\
