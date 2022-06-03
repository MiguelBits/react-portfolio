---
description: >-
  Reference:
  https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/
  & https://docs.openzeppelin.com/contracts/2.x/api/token/erc20
---

# ERC20 Standard

ERC-20 defines a common list of rules that all fungible Ethereum tokens should adhere to.

```solidity
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
```

### Getters <a href="#getters" id="getters"></a>

```solidity
function totalSupply() external view returns (uint256);
```

Returns the amount of tokens in existence. This function is a getter and does not modify the state of the contract. Keep in mind that there are no floats in Solidity. Therefore most tokens adopt **18 decimals** and will return the total supply and other results as followed **1000000000000000000 for 1 token**. Not every token has 18 decimals and this is something you really need to watch for when dealing with tokens.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

The ERC-20 standard allows an address to give an **allowance** to another address to be able to retrieve tokens from it. This getter returns the remaining number of tokens that the `spender` will be allowed to spend on behalf of `owner`. This function is a getter and does not modify the state of the contract and should return 0 by default.oli

### Functions <a href="#functions" id="functions"></a>

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Moves the `amount` of tokens from the function caller address (`msg.sender`) to the recipient address. This function emits the `Transfer` event defined later. It returns true if the transfer was possible.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Set the amount of `allowance` the `spender` is allowed to transfer from the function caller (`msg.sender`) balance. This function emits the **Approval event**. The function returns whether the **allowance** was successfully set.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Moves the `amount` of tokens from `sender` to `recipient` using the **allowance** mechanism. amount is then deducted from the caller’s **allowance**. This function emits the **`Transfer` event**.

### Events <a href="#events" id="events"></a>

This event is emitted when the amount of tokens (value) is sent from the `from` address to the `to` address.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

In the case of minting new tokens, the transfer is usually `from` the 0x00..0000 address while in the case of burning tokens the transfer is `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

This event is emitted when the amount of tokens (`value`) is approved by the `owner` to be used by the `spender.`&#x20;

Here is the most simple code to base your ERC-20 token from:

### A basic implementation of ERC-20 tokens <a href="#a-basic-implementation-of-erc-20-tokens" id="a-basic-implementation-of-erc-20-tokens"></a>

#### This implementation uses the SafeMath library.

`pragma solidity ^0.6.0;`

`interface IERC20`` `**`{`**

```solidity
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function allowance(address owner, address spender) external view returns (uint256);

function transfer(address recipient, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);
```

**}**

`contract ERC20Basic is IERC20`` `**`{`**

```solidity
string public constant name = "ERC20Basic";
string public constant symbol = "ERC";
uint8 public constant decimals = 18;


event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
event Transfer(address indexed from, address indexed to, uint tokens);


mapping(address => uint256) balances;

mapping(address => mapping (address => uint256)) allowed;

uint256 totalSupply_;

using SafeMath for uint256;
```

`constructor(uint256 total) public {`&#x20;

`totalSupply_ = total;`&#x20;

`balances[msg.sender] = totalSupply_;`&#x20;

`}`

{% code title="" %}
```solidity
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
```
{% endcode %}

```solidity
function add(uint256 a, uint256 b) internal pure returns (uint256) {
  uint256 c = a + b;
  assert(c >= a);
  return c;
}
```

**}**
