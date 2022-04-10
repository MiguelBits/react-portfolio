---
description: >-
  Reference:
  https://www.gemini.com/cryptopedia/crypto-oracle-blockchain-overview#section-blockchain-oracles-explained-why-do-we-need-oracles
---

# Oracles

Oracles provide external data to smart contracts that operate on blockchain technology. They are essentially a form of communication between the outside world and the world of blockchain. Because blockchains and smart contracts are closed systems — where there are rigid processes for connecting to external data sources — oracles present a way of securely providing off-chain data to a blockchain network’s on-chain environment. Here, we discuss a few different types of oracles and cover the potential challenges that oracles face within their role of executing smart contracts.

### The oracle problem definition <a href="#5a3f" id="5a3f"></a>

[The oracle problem](https://ethereum.stackexchange.com/a/84645/57451) is these two pieces combined:

1. Blockchains alone can’t access outside data.
2. Using centralized oracles nullifies the advantage of smart contracts — and are major security risks.

Reference: [https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72)

### The solution <a href="#7931" id="7931"></a>

[Chainlink](https://chain.link) solves both of these and is the standard for decentralized oracles.

### What is a decentralized oracle? <a href="#44aa" id="44aa"></a>

A [decentralized oracle](https://docs.chain.link/docs/architecture-decentralized-model) or decentralized oracle network is a group of independent blockchain oracles that provide data to a blockchain. Every independent node or oracle in the decentralized oracle network independently retrieves data from an off-chain source and brings it on-chain. The data is then aggregated so the system can come to a deterministic value of truth for that data point. Decentralized oracles solve the oracle problem.

Chainlink is a framework for choosing your independent network of nodes to connect the real world’s data to the blockchain to enable smart contracts to reach their true potential. With this, we are leveraging the same reliable decentralized infrastructure concept the blockchain has, but for blockchain oracles. If nodes/sources are hacked, depreciated, or deleted, the network of Chainlink will leverage the decentralized network and carry on.

![Decentralized oracles are the solution. (Image source: Chainlink)](<../.gitbook/assets/image (12).png>)

Using one blockchain oracle is a huge risk and Chainlink offers a fantastic new ecosystem around data. Blockchain oracles are the key to unlocking the future that smart contracts have for us. Oracles also provide a way for blockchains to see into each other. This is known as [interoperability](https://cointelegraph.com/explained/blockchain-interoperability-explained), and is an important next step as well.

There are massive marketplaces leveraging the Chainlink technology to help you pick your network of independent nodes to pull your data from. This way, your smart contracts can easily never have a single point of failure.

The technology is blockchain agnostic and is constantly working to integrate with more blockchains so all blockchains can have access to reliable secure off-chain data. And best of all, the [documentation](https://docs.chain.link/docs) is great for beginner engineers and experienced alike.
