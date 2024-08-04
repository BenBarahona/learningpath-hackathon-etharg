require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

console.log("URL", process.env.SCROLL_SEPOLIA_RPC_URL)
module.exports = {
  solidity: "0.8.24",
  networks: {
    scrollSepolia: {
      url: process.env.SCROLL_SEPOLIA_RPC_URL,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.SCROLL_ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
};
