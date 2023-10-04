require("@nomicfoundation/hardhat-toolbox");
//* Using STUDENT QUIZ DAPP MAIN WOrkSpace in ganache
require("dotenv").config() ;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  settings: {
    optimizer: {
      enabled: false,
      runs: 100, // Number of optimization runs
    },
  },
    /* 
  
  Increase the runs of the optimizer can increase the size of the bytecode by decreasing the 
  gas cost, making the contract gas efficient, But there is a problem between the contract size and the 
  size of the contract's byte code, so keep the optimizer at low runs to better byte code size, else the 
  sie of the byte code get's increased by decreasing the contract's size
  
  */

  networks: {
    development: {
      url: process.env.PROVIDER_URL, // URL where Ganache is running
      chainId: 1337, // Ganache's default chain ID
      accounts:[`${process.env.PRIVATE_KEY}`]
    },
  },
};
//* npm install dotenv --save-dev