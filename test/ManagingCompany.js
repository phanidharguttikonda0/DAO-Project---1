// we can use this address to connect to ManagingCompanyFunds : 0x1DC1cb67d3206708A35e38303a2952D37Cd90d18

const Web3 = require("web3") ;

const ManagingCompany =  require("C:/Users/phani/One-Drive/BlockChainDeveloper/hardhat/ManagingCompanyFunds/artifacts/contracts/ManagingCompanyFunds.sol/ManagingCompanies.json") ;
describe("Connecting to the Contract", function(){
  const web3 =  new Web3.Web3("HTTP://127.0.0.1:7545") ; 
  const newWeb3 = new web3.eth.Contract(ManagingCompany.abi, "0x1DC1cb67d3206708A35e38303a2952D37Cd90d18") ;
  console.log(newWeb3) ; // we got the contract instance
}) ;