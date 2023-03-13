# Mappings and Structs

### QUESTION 1

when reading this \`mapping(uint=>Struct) public data\` is it less gas intensive to read from it like: \` data\[1].name\` or \`Struct memory datatypes = data\[1]\`

When you read from a mapping, such as `data[1]`, the Solidity compiler generates an SLOAD opcode, which loads the value from storage into memory. This operation is relatively expensive in terms of gas.

On the other hand, when you use the second method, `Struct memory datatypes = data[1]`, you are copying the entire struct from storage to memory. This operation can also be relatively expensive, especially if the struct contains a lot of data.

In general, if you only need to read a single property of the struct, such as `data[1].name`, it is more gas-efficient to read directly from the mapping. This avoids the additional cost of copying the entire struct from storage to memory.

However, if you need to access multiple properties of the struct, or if you need to pass the struct as an argument to another function, it may be more efficient to copy the entire struct to memory first.

As with any gas optimization, it's important to consider the specific use case and measure the gas usage of different approaches to determine the most efficient option.

### QUESTION 2

when returning \`uint,uint,uint\` from a function is it cheaper to return 3 uint or a struct of 3 uints

In general, it is more gas-efficient to return a struct of three uints instead of returning three separate uint values.

When you return three separate uint values, the Solidity compiler generates three SSTORE opcodes, which store each uint value on the stack. This operation can be relatively expensive in terms of gas.

On the other hand, when you return a struct of three uints, the compiler generates a single SSTORE opcode, which stores the entire struct on the stack. This operation can be more gas-efficient than returning three separate uint values.

In addition, returning a struct can make your code more readable and maintainable, especially if you need to return multiple values from a function.

As with any gas optimization, it's important to measure the gas usage of different approaches in the specific context of your contract to determine the most efficient option.

### QUESTION 3

I have this input `function setValues(bytes memory data) public`, this struct: struct EncodedData { uint64 volatilityIndex; uint64 beta; uint64 alpha; }; and then I decode like this: (address \_asset, EncodedData memory decodedData) = abi.decode(data, (address, EncodedData)); Is this a good way to optimize gas or should I just pass an address and the struct?

In your case, the input data contains an address and a struct with three uint64 values. If you pass the address and struct directly as input parameters, the Solidity compiler generates separate memory copy operations for each member of the struct and the address, which can be relatively expensive in terms of gas cost.

On the other hand, if you encode the address and struct as a single `bytes` variable and then decode the data using `abi.decode()`, the Solidity compiler generates a single memory copy operation, which can be cheaper in terms of gas cost.

So, in general, encoding the data as a `bytes` variable and then decoding it using `abi.decode()` can be a good way to optimize gas usage, especially if your input data is relatively large or complex. However, as with any gas optimization, it's important to measure the gas usage of different approaches in the specific context of your contract to determine the most efficient option.

{% code overflow="wrap" %}
```solidity
    // function 2 is cheaper in this scenario

    function test_gasSetValues1() public {
        oracle.setValues(abi.encode(WETH,IVXOracle.EncodedData({volatilityIndex: 100, beta: 200, alpha: 300})));

    }

    function test_gasSetValues2() public {
        oracle.setValues(WETH,IVXOracle.EncodedData({volatilityIndex: 100, beta: 200, alpha: 300}));
    }
```
{% endcode %}
