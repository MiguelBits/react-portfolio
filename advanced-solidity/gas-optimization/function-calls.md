# Function Calls

### when paying gas for a function, will the gas cost of that function calculate the gas of all lines of code, or just the ones it interacted with. For example if there is a condition called if amount > 0 then deposit, if amount is not > 0 the code inside that if statement will not execute and therefore not be accountable for gas costs?

When you pay gas for a function call, the gas cost includes all the operations performed by the function, including the lines of code that were not executed due to a conditional statement.

In your example, even if the condition `if amount > 0` evaluates to `false` and the code inside the if statement is not executed, the gas cost for that code is still included in the total gas cost of the function call. This is because the Solidity compiler generates _bytecode_ for all the lines of code in the function, regardless of whether they are executed or not.

Therefore, it's important to be mindful of the gas cost of all the operations in your function, even if they are conditional or not always executed. You can use tools such as gas analyzers to estimate the gas cost of your functions and identify areas for optimization.
