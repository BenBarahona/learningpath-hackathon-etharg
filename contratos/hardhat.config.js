// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    scrollTestnet: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [process.env.PRIVATE_KEY] // MetaMask
    }
  }
};
