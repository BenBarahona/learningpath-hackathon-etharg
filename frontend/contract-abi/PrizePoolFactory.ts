const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_poolPrizeAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_poolPrizeCreator",
          "type": "address"
        }
      ],
      "name": "PoolPrizeCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_pathToken",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_poolFirebaseId",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_tokenRequired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_prizePerUser",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokenToBurn",
          "type": "uint256"
        }
      ],
      "name": "createPoolPrize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]