---
description: >-
  A brief introduction to terms that are going to be mentioned in the next
  pages. Reference: Wikipedia
---

# 🧐 Glossary

## Cryptography:

### Hash functions:

A **hash function** is any [function](https://en.wikipedia.org/wiki/Function\_\(mathematics\)) that can be used to map [data](https://en.wikipedia.org/wiki/Data\_\(computing\)) of arbitrary size to fixed-size values. The values returned by a hash function are called _hash values._

These hash values are irreversible to their previous data.

A good hash function must be collision resistant, meaning there cannot be two equal hash values for two different input data. _Example: **SHA256**_

### Merkle Tree

In [cryptography](https://en.wikipedia.org/wiki/Cryptography), a **hash tree** or **Merkle tree** is a [tree](https://en.wikipedia.org/wiki/Tree\_\(data\_structure\)) in which every "leaf" ([node](https://en.wikipedia.org/wiki/Tree\_\(data\_structure\)#Terminology)) is labelled with the [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic\_hash\_function) of a data block, and every node that is not a leaf is labelled with the cryptographic hash of the labels of its child nodes.

Hash trees can be used to verify any kind of data stored, handled and transferred in and between computers. They can help ensure that data [blocks](https://en.wikipedia.org/wiki/Blockchain) received from other peers in a [peer-to-peer network](https://en.wikipedia.org/wiki/Peer-to-peer) are received undamaged and unaltered, and even to check that the other peers do not lie and send fake blocks.

Basically used to prove the contents of every transaction, and keeping the chain small.

### Private / Public Key (Asymmetric Encryption)

**Asymmetric Encryption** uses two distinct, yet related keys. One key, the Public Key, is used for encryption and the other, the Private Key, is for decryption. As implied in the name, the Private Key is intended to be private so that only the authenticated recipient can decrypt the message.

Both the keys are mathematically connected with each other.

The public key is open to everyone. Anyone can access it and encrypt data with it. However, once encrypted, that data can only be unlocked by using the corresponding private key. As you can imagine, the private key must be kept secret to keep it from becoming compromised. So, only the authorized person, server, machine, or instrument has access to the private key.

#### What Does Asymmetric Encryption Do?

Asymmetric encryption is a way for you to verify third parties that you’ve never met via public channels that are insecure. Unlike traditional (symmetric) encryption methods, which rely on one key to encrypt and decrypt data, asymmetric key encryption uses two separate keys to perform these functions.

## P2P network

Where any participant in the network functions as both client and server. BitTorrent is a big example of a P2P network. In BitTorrent, all the computers are connected to each other on the internet. One computer can upload any file in the network and other computers start downloading the files. Also, every computer can upload parts of the file if that computer has already downloaded some chunks of the file. Making the file hosted decentralized as there are pieces of it distributed accross many users.

### Miners

Validators of transactions in public blockchains.

### Memory pool ( _Mempool_ )

* [From](https://kb.beaconcha.in/glossary) the [Ethereum](https://dyor-crypto.fandom.com/wiki/Ethereum) 2.0 Knowledge Base (11-2020):

"_Every signed_ [_transaction_](https://dyor-crypto.fandom.com/wiki/Transaction) _visits the Mempool first, which can be referred to as the waiting room for transactions. During this period, the transaction status is pending. Depending on the chosen_ [_gas_](https://dyor-crypto.fandom.com/wiki/Gas) _fee for the transaction, miners pick the ones that return them the most value first. If the network is highly congested (=many pending transactions), there's a high chance that new transactions will outbid(gas fees) older transactions, leading to unknown waiting times."_

* [From](https://bankless.substack.com/p/how-transaction-ordering-can-save?token=eyJ1c2VyX2lkIjoxMzk3OTAwLCJwb3N0X2lkIjo4NTI5Nzc1LCJfIjoiYzl4Um4iLCJpYXQiOjE2MDI0OTA0NzcsImV4cCI6MTYwMjQ5NDA3NywiaXNzIjoicHViLTE2MDE1Iiwic3ViIjoicG9zdC1yZWFjdGlvbiJ9.OedSo0xapoAHoq1Xvf7r6lZn1krnaOXOrx2Jm2zUV0c) [Bankless](https://dyor-crypto.fandom.com/wiki/Bankless) (8-10-2020):

_"A ‘mempool’, or Memory Pool, is a pool of transactions that haven’t been included into their respective_ [_blockchain_](https://dyor-crypto.fandom.com/wiki/Blockchain)_. When you are watching your transaction pending on_ [_Etherscan_](https://dyor-crypto.fandom.com/wiki/Etherscan)_, your transaction is in_ [_Ethereums_](https://dyor-crypto.fandom.com/wiki/Ethereum)_’s mempool._

_When you make a transaction on Ethereum, before it’s formally included in the chain by_ [_miners_](https://dyor-crypto.fandom.com/wiki/Miners) _(validators, in_ [_PoS_](https://dyor-crypto.fandom.com/wiki/PoS)_), you broadcast it to an Ethereum_ [_node_](https://dyor-crypto.fandom.com/wiki/Node)_. This Ethereum node broadcasts it to its peers, and through this process, all Ethereum nodes are aware of your signed transaction._

_Rational miners prioritize the transactions with the highest fee paid, as this is how they maximize their profits. Obviously, it makes sense to include those who are willing to pay more first."_

##
