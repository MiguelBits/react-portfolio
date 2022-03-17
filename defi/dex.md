---
description: >-
  Reference :
  https://ethereum.org/en/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/
---

# DEX

## Decentralized Exchange



Our **DEX** will instantiate an instance of the contract in its constructor and perform the operations of:

* exchanging tokens to ether
* exchanging ether to tokens

We’ll start our Decentralized exchange code by adding our simple ERC20 codebase:e(address owner, address spender) external view returns (uint256)

```
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 100 ether;

    using SafeMath for uint256;

   constructor(uint256 total) public {
    balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
 
```

Our new **DEX** smart contract will deploy the ERC-20 and get all the supplied:

**`contract DEX {`**

```
IERC20 public token;

event Bought(uint256 amount);
event Sold(uint256 amount);

constructor() public {
    token = new ERC20Basic();
}

function buy() payable public {
    // TODO
}

function sell(uint256 amount) public {
    // TODO
}
```

**`}`**

So we now have our **DEX** and it has all the token reserve available. The contract has two functions:

* `buy`: The user can send ether and get tokens in exchange
* `sell`: The user can decide to send tokens to get ether back

### The buy function <a href="#the-buy-function" id="the-buy-function"></a>

To keep things simple, we just exchange 1 token for 1 Wei.&#x20;

**Note:** The function has modifier payable so it requires to send Ether to this function.

`function buy() payable public {`&#x20;

`uint256`` `**`amountTobuy`**` ``= msg.value;`&#x20;

`uint256`` `**`dexBalance`**` ``= token.balanceOf(address(this));`&#x20;

**`require`**`(amountTobuy > 0, "You need to send some ether");`&#x20;

**`require`**`(amountTobuy <= dexBalance, "Not enough tokens in the reserve");`

&#x20;`token.`**`transfer`**`(msg.sender, amountTobuy);`&#x20;

`emit`` `**`Bought`**`(amountTobuy);`&#x20;

`}`

### The sell function <a href="#the-sell-function" id="the-sell-function"></a>

The function responsible for the sell will first **require** the user to have **approved** the **amount** by calling the approve function beforehand. Then when the sell function is called, we’ll check if the transfer from the caller address to the contract address was successful and then send the Ethers back to the caller address.

**Note:** The **approve** function must be called from outside the **DEX** contract.

### ~~Full code:~~

`contract DEX {`

```
event Bought(uint256 amount);
event Sold(uint256 amount);


IERC20 public token;

constructor() public {
    token = new ERC20Basic();
}

function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}

function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    msg.sender.transfer(amount);
    emit Sold(amount);
}
```

}
