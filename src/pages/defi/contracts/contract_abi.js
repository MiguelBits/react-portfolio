export const contractAddress_AVAX_WETH = "0x726055059D1c94979Ac3f2cd6a4f641ad184C229"
export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountToken2",
				"type": "uint256"
			}
		],
		"name": "faucet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken2",
				"type": "uint256"
			}
		],
		"name": "getEquivalentToken1Estimate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reqToken1",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken1",
				"type": "uint256"
			}
		],
		"name": "getEquivalentToken2Estimate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reqToken2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyHoldings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountToken2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "myShare",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoolDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken1",
				"type": "uint256"
			}
		],
		"name": "getSwapToken1Estimate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken2",
				"type": "uint256"
			}
		],
		"name": "getSwapToken1EstimateGivenToken2",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken1",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken2",
				"type": "uint256"
			}
		],
		"name": "getSwapToken2Estimate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken1",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken1",
				"type": "uint256"
			}
		],
		"name": "getSwapToken2EstimateGivenToken1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_share",
				"type": "uint256"
			}
		],
		"name": "getWithdrawEstimate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountToken2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountToken2",
				"type": "uint256"
			}
		],
		"name": "provide",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "share",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken1",
				"type": "uint256"
			}
		],
		"name": "swapToken1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken2",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountToken2",
				"type": "uint256"
			}
		],
		"name": "swapToken2",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken1",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_share",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountToken1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountToken2",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]