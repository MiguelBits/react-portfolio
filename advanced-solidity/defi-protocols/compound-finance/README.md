---
description: >-
  Reference:
  https://academy.moralis.io/blog/what-is-compound-finance-a-detailed-defi-guide#:~:text=Compound%20Finance%20is%20an%20algorithmically,real%2Dtime%20supply%20and%20demand.
---

# Compound Finance

### **What is Compound finance blockchain lending?**

Compound Finance is a place where you can lend or borrow cryptocurrencies.

&#x20;It is a platform where users can supply (lend) cryptocurrencies as collateral, to borrow crypto assets based on interest rates set by real-time supply and demand.

The process of earning interest or borrowing assets against your collateral is pretty straightforward.

* You can immediately earn compound interests by supplying assets to Compound’s liquidity pool.
* The compound interest rates adjust accordingly, depending on supply and demand.
* There is no lockdown period when it comes to Compound. You have the freedom to withdraw or repay your collateral whenever you want.

Compound has adopted community governance. Holders of the COMP token and their delegates debate, propose, and vote on all changes to Compound.

### **What is Compound – Functionality**

The concept is pretty straightforward, deposit collateral, and earn interest. However, instead of depositing your money into an intermediary like a bank, you put it in a smart contract. This ensures that you are not giving up control of your assets to intermediaries.

### **Compound Finance Blockchain Lending: Deposit**

* Choose which coin from the list you want to supply to the website.
* Each list has a different Annual Percentage Yield (APY). In the image above, you can see that USDC has an APY of 1.6%. This means that you earn 1.6% of your deposit if you supply USDC to the platform.
* If you want to supply USDC, simply click on it and you will something similar to the image shown below:

How does the deposit process work? It’s actually pretty straightforward:

![
](<../../../.gitbook/assets/image (13).png>)

### **Compound Finance Blockchain Lending: Borrow**

* The borrowing process is as straightforward as the deposit process.
* Borrowing cryptocurrencies requires you to pay some fees. Eg. If you want to take a loan of Ether, you will need to pay 2.96% per year.
* ![](<../../../.gitbook/assets/image (15).png>)
*
  * The differential between the amount of interest generated from depositing and the fees you need to pay for borrowing is the fees collected by Compound for their services.

## **What is Compound blockchain dual-token system? cTokens vs COMP**

#### **Compound Blockchain Tokens #1: cTokens**

****![](<../../../.gitbook/assets/image (10).png>)cTokens represents your balance every time you choose to interact with the Compound liquidity pool. The underlying asset represented by cTokens allows you to earn interest and serve as collateral. It works similarly to ERC-20 tokens as it can be traded, or programmed by developers to create new technologies.

To illustrate how this works, consider the following example. Suppose you supply 1000 BAT to Comound’s liquidity, wherein the exchange rate is 0.02. In this case, you receive 50,000 (1000/.02) cBATs, in return. After a few weeks, you decide to withdraw, but this time, the exchange rate is 0.021. Your 50,000 cBAT will now be equal to (50,000\*0.021) 1050 BAT.

In this case, you can withdraw your 1050 BAT, redeeming all your 50,000 cBAT tokens. Likewise, you can just withdraw your initial investment (1000 BAT), withdrawing 47619.0476 cBAT tokens in the process and keeping the rest in your wallet.

Some features of cTokens are as follows:

* You can borrow up to 50-75% of their cTokens’ value, depending on the quality of the underlying asset.&#x20;
* You can add or remove tokens anytime.
* If your debt becomes undercollateralized, anyone can liquidate.
* Liquidators receive 5% on liquidated assets as an incentive.
* Coinbase Wallet and MetaMask integrate cToken balances.
* cTokens are visible on Etherscan.

### **How to get cEther?**

The method of getting cETH is quite different from, say, cBAT or cDAI.&#x20;

![](https://academy.moralis.io/wp-content/uploads/2021/06/cether-1024x341.jpeg)

* When you send ETH to the Compound, an application can send it directly to the payable mint function in the cEther contract.&#x20;
* Upon activating the feature, cEther shows up in the wallet.&#x20;
* As a result, due to the invocation, the cToken contract retrieves the indicated amount of underlying tokens from the sender’s address.

## **Compound Blockchain Tokens #2: COMP**

The second token in the Compound ecosystem is COMP, which is the native governance token. As we have mentioned before, Compound has transitioned to community governance since May 2020. COMP tokens holders can make proposals and vote to decide on the direction the protocol takes in the future.

The features of COMP are as follows:

* The total supply of COMP is 10 million. 42.3% is reserved for users to earn when they use Compound.
* Within each of these markets, the amount of COMP is divided 50:50 between the suppliers and borrowers within that market.
* Users can check the amount of interest paid per day by checking the User Distribution page.
* COMP holders can earn more COMP token by voting on various governance proposals.

### **What is Compound finance blockchain lending interest rate?**

Alright, time and again, we have talked about the interest rates provided by Compound. In this section, we will gain a deeper understanding of what it actually means

* Interests are dependent on the liquidity available in each market.
* The rates fluctuate depending on real-time supply and demand.
* When the liquidity is high, the interest rates are low.
* When the liquidity is down, the interest rate increases.

### **How is the interest calculated?**

The interest rate, as seen on the website, is an annual interest rate. Upon the mining of a new Ethereum block, i.e., every 15 seconds, the interest is generated.&#x20;

### **Why is supply rate > borrow rate?**

Excess liquidity can only exist when the assets supplied are higher than the number of assets borrowed.  As a rule, this simple mechanism ensures that users can withdraw or borrow funds from the pool with ease. There are two things you need to keep in mind regarding this:

* If a market has more suppliers than borrowers, the interest rate earned by the supplier is comparatively lower. In fact, the asset’s utilization rate measures the interest.
* A portion of the interest paid by borrowers is set aside as reserves. Furthermore, COMP holders are responsible for this action.

### **What is Compound Community Governance?**

Compound has a very straightforward and simple governance framework. This is how it works:

* Anybody with 1% COMP delegated can propose a governance action.
* Any proposal made has a 3-day voting period.
* Any address which has voting power can vote for or against the proposal.
* If the proposal receives at least 400,000 votes, it’s queued in the Timelock and implemented after two days.
* However, if it doesn’t receive the appropriate amount of votes, it gets dropped.\


![](<../../../.gitbook/assets/image (17).png>)

The examples of actions taken by COMP holders are as follows:

* List a new cToken market.
* Update the interest rate model of the market.
* Update the oracle address.
* Withdraw a cToken reserve.

### **What is Compound decentralized governance?**

As community governance adopts complete decentralization to enhance security and stability, Compound will be utilizing the following protocols:

* The company’s shareholders will receive a portion of the COMP tokens during the initial sandbox period. The shareholders can either delegate the voting weight to themselves or someone else.
* Most of the COMP tokens will be escrowed, and hence, will not participate in governance.
* Compound developers are encouraged to participate in governance actively.

### **What is the Compound Finance Blockchain Lending Use Case?**

* Holders can use Compound to earn interest without going through the pains of personally managing their assets or taking speculative risks.&#x20;
* Dapps and exchanges can use Compound as a source of monetization in the Ethereum ecosystem.
* Traders can borrow Ether from the liquidity pool buy putting in their existing portfolio as collateral to participate in a crowdsale.
* Traders looking to short a particular token can borrow it from the liquidity pool, and sell it immediately.&#x20;

