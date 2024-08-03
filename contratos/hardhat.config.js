require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

console.log("URL", process.env.SCROLL_SEPOLIA_RPC_URL)
console.log("KEY", process.env.PRIVATE_KEY)
module.exports = {
  solidity: "0.8.24",
  networks: {
    scrollSepolia: {
      url: process.env.SCROLL_SEPOLIA_RPC_URL,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  }
};
