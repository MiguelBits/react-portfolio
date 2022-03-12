---
description: >-
  From a high level language to a low level language, code is compiled to
  bytecode to be interpreted by Ethereum Virtual Machine.
---

# Solidity and Ethereum Bytecode

## Solidity

is statically typed like Java, C, Rust... unlike Python or Javascript. Meaning you have to declare variables types before using the variable.

Specially for integers, you need to specify if it's signed or unsigned integer, and the bytes of said integer.

### Mapping data types

\-> Mapping: a key value storage / hash table;

\-> Every key is initially mapped to zero;

\-> There is no built-in way to query the length of a mapping, or iterate over its non-zero elements. A separate variable can be used;

### Function signatures

![](<../.gitbook/assets/imagem (1).png>)
