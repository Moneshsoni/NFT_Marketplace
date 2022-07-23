require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
projectId = "a2b1ca3050dc4027a33822b65b1e71d3"
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    hardhat:{
      chainId: 1337
    },
    goerli:{
      url:'https://goerli.infura.io/v3/${projectId}',
      accounts: []
    }
  },
  solidity: "0.8.9",
};
