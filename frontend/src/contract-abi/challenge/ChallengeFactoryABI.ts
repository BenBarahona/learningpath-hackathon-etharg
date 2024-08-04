export const challengeAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pathToken",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_challengeID",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "ChallengeCompleted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_challengeID",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_challengeCreator",
        type: "address"
      }
    ],
    name: "ChallengeCreated",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "firebaseId",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "tokenAmountRequired",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "totalReward",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "totalQuestions",
        type: "uint256"
      }
    ],
    name: "CreateMultipleChoiceChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "challengeId",
        type: "string"
      }
    ],
    name: "getChallengeReward",
    outputs: [
      {
        internalType: "uint256",
        name: "challenge",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "challengeId",
        type: "string"
      }
    ],
    name: "getRequiredTokensForChallenge",
    outputs: [
      {
        internalType: "uint256",
        name: "requiredTokens",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pathToken",
    outputs: [
      {
        internalType: "contract PathToken",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        internalType: "string",
        name: "challengeId",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "correctAnswers",
        type: "uint256"
      }
    ],
    name: "userCompletedChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        internalType: "string",
        name: "challengeId",
        type: "string"
      }
    ],
    name: "userHasCompletedChallenge",
    outputs: [
      {
        internalType: "bool",
        name: "hasCompleted",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
]
