# Integer types

## Bits and Bytes:

#### [What is the difference between “int” and “uint”](https://stackoverflow.com/questions/3724242/what-is-the-difference-between-int-and-uint-long-and-ulong) ?

The primitive data types prefixed with "u" are unsigned versions with the same bit sizes. Effectively, this means they cannot store negative numbers, but on the other hand they can store positive numbers twice as large as their signed counterparts. The signed counterparts do not have "u" prefixed.

\-> The limits for int32 (32 bit) are:

```csharp
int32: –2147483648 to 2147483647 
uint32: 0 to 4294967295 
```

\-> And for int64 (64 bit):

```csharp
int64: -9223372036854775808 to 9223372036854775807
uint64: 0 to 18446744073709551615
```

&#x20;types

* An `uint` is short for `uint256`, so it can store 2^256 values - because it's unsigned the maximum value is 2^256-1 (zero needs one space). [What is the maximum input value for function uint256 parameter?](https://ethereum.stackexchange.com/questions/39321/what-is-the-maximum-input-value-for-function-uint256-parameter)
* An `int` is short for `int256` and it can store the same amount of values - because it's signed the maximum (positive) value is 2^256 / 2 - 1.

So the maximum values of `uint` and `int` are not the same. They have the same amount of values but `int` needs to store values also for negative numbers.

### Address

An address holds the 20 byte value representing the size of an Ethereum address. An address can be used to get the balance using .balance method and can be used to transfer balance to another address using .transfer method.
