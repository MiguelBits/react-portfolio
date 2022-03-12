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

![](<../.gitbook/assets/imagem (6).png>)

### Constructors

\-> Invoked when initially creating the contract

\-> Used to customized settings or give an initial state

![](<../.gitbook/assets/imagem (2).png>)

### Visibility Modifiers

![](<../.gitbook/assets/imagem (5).png>)

### Mutability Modifiers

![](<../.gitbook/assets/imagem (8).png>)

### Events

\-> A way to subscribe to an event of a contract, and a good way to print/debug your code.

\-> Any node that is subscribed to this event is going to get notified the parameters of the events.

![](../.gitbook/assets/imagem.png)

### Calling methods of other contracts

\-> First define the interface for an external contract: ![](<../.gitbook/assets/imagem (7).png>)

\-> Next you need to have the address of said external contract, only then you can invoke the functions of the external contract: ![](<../.gitbook/assets/imagem (3).png>)

### Working with the native currency
