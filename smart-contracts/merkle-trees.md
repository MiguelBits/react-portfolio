---
description: A secure and easy way to implement an NFT whitelist. and Bulk Transfers
---

# Merkle Trees

## What is a Merkle tree? <a href="#c5f4" id="c5f4"></a>

A tree-like structure in which every node is labeled with a hash of some data. The bottom-most nodes are called **leaves.**

These leaves come from an array of length = 2^n, if the length does not meet this requirement you should duplicate or push 0 to the last element, making it possible to be 2^n.

![](<../.gitbook/assets/image (16).png>)Starting by hashing each element in the array, and then hashing 2 by 2 of them getting parent leaves, until you get only 1 leave, which is called root hash node!

**Javascript Merkle Tree:**

Reference: [https://medium.com/codex/using-merkle-trees-for-smart-contracts-24ccf6f75a0a](https://medium.com/codex/using-merkle-trees-for-smart-contracts-24ccf6f75a0a)

```solidity
// Some code
const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

// List of 7 public Ethereum addresses
let addresses = [...]

// Hash leaves
let leaves = addresses.map(addr => keccak256(addr))

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
let rootHash = merkleTree.getRoot().toString('hex')

// Pretty-print tree
console.log(merkleTree.toString())
console.log(rootHash)
```

### Merkle Proof <a href="#7094" id="7094"></a>

Now that we have our root hash, our tree, and the leaves, we can verify if a given hash is part of the tree, and therefore valid. In a real-world application, you’d get the user’s address from the front-end. We simply get one from our list.

Next, we hash the address with `keccak256` and retrieve the proof using `getHexProof()` . This proof is then sent alongside the transaction to the smart contract.

```solidity
// 'Serverside' code
let address = addresses[0]
let hashedAddress = keccak256(address)
let proof = merkleTree.getHexProof(hashedAddress)
console.log(proof)
```

We can also verify it within the backend already if we really want to. It isn’t useful for the whitelist application, but it’s good to know how it works anyway since we’ll do something similar in the smart contract.

## Smart Contract <a href="#c094" id="c094"></a>

The smart contract will simply do the same as the final code snippet in the last paragraph. It will verify the proof with the leaf and the root hash using a simple function from another library.

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTest {
    // Our rootHash
    bytes32 public root = 0x11d251a3c7c541a8a68635af1ed366692175fbdc9f3b07da18af66c111f85800; 

    function checkValidity(bytes32[] calldata _merkleProof) public view returns (bool){
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, root, leaf), "Incorrect proof");
        return true; // Or you can mint tokens here
    }
}
```

We use **OpenZeppelin’s** contract to help with verifying the Merkle proof. In a production environment, be sure to also have a function for setting the root, and disabling the check for a valid proof altogether if your backend somehow fails.

Reference: [https://solidity-by-example.org/app/merkle-tree](https://solidity-by-example.org/app/merkle-tree)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract MerkleProof {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf,
        uint index
    ) public pure returns (bool) {
        bytes32 hash = leaf;

        for (uint i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }

            index = index / 2;
        }

        return hash == root;
    }
}

contract TestMerkleProof is MerkleProof {
    bytes32[] public hashes;

    constructor() {
        string[4] memory transactions = [
            "alice -> bob",
            "bob -> dave",
            "carol -> alice",
            "dave -> bob"
        ];

        for (uint i = 0; i < transactions.length; i++) {
            hashes.push(keccak256(abi.encodePacked(transactions[i])));
        }

        uint n = transactions.length;
        uint offset = 0;

        while (n > 0) {
            for (uint i = 0; i < n - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(hashes[offset + i], hashes[offset + i + 1])
                    )
                );
            }
            offset += n;
            n = n / 2;
        }
    }

    function getRoot() public view returns (bytes32) {
        return hashes[hashes.length - 1];
    }

    /* verify
    3rd leaf
    0x1bbd78ae6188015c4a6772eb1526292b5985fc3272ead4c65002240fb9ae5d13

    root
    0x074b43252ffb4a469154df5fb7fe4ecce30953ba8b7095fe1e006185f017ad10

    index
    2

    proof
    0x948f90037b4ea787c14540d9feb1034d4a5bc251b9b5f8e57d81e4b470027af8
    0x63ac1b92046d474f84be3aa0ee04ffe5600862228c81803cce07ac40484aee43
    */
}

```
