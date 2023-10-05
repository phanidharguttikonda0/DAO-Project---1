// we can use this address to connect to ManagingCompanyFunds : 0x25d0CAB56BB8a640E7dc2346B11955AbCbD83852

const Web3 = require("web3") ;

const ManagingCompany =  require("C:/Users/phani/One-Drive/BlockChainDeveloper/hardhat/ManagingCompanyFunds/artifacts/contracts/ManagingCompanyFunds.sol/ManagingCompanies.json") ;
const Company = require("../artifacts/contracts/Company.sol/Company.json") ;

// describe("Testing the Projects", function(){
//   let ManagingCompanyAddress = "0x38969408962346C9a18d8aF17097b16D51C0321f" ;
//   let web3 = new Web3.Web3("HTTP://127.0.0.1:7545") ;
//   const contract = new web3.eth.Contract(ManagingCompany.abi, ManagingCompanyAddress) ;
//   const acc = web3.eth.getAccounts() ;
//   let accounts = [] ;
//   it("getting the accounts", async function(){
//   accounts = await acc.then(res => res) ;
//   }) ;
//   function createTransaction(from, to, gas, gasPrice, data, value) {
//     return {
//       from: from,
//       to: to,
//       gas: gas,
//       gasPrice:gasPrice,
//       data:data,
//       value:value
//     } ;
//   } //* note for signing and sending the transactions there is no need of using await 
//   it("set a new Company Contract", async function(){
//     let privateKey = "0x0a00c9c84d16c6f9fef1f348f85780944e1720b45e887766c2ce7d29ae9efd53" ; // account[2]
//     let encoded = contract.methods.setCompany(accounts.slice(3, 13), accounts[15], 70).encodeABI() ;
//     let transaction = createTransaction(
//       accounts[2],ManagingCompanyAddress, '5480905', '2000000000', encoded, web3.utils.toWei('2', 'ether')
//       ) ;
//     web3.eth.signTransaction(transaction, privateKey).then( signedTransaction => {
//         web3.eth.sendSignedTransaction(signedTransaction.raw)
//       .on('receipt', (receipt) => {
//         console.log('Transaction receipt:', receipt);
//       })
//       .on('error', (error) => {
//         console.error('Transaction error:', error);
//       });
//     }) ;
//       console.log("Calling the get Contract address Function") ;
//       let CompanyAddress = await contract.methods.getCompanyAddress(accounts[3]).call() ;
//       console.log(CompanyAddress) ;
//   }) ;
// }) // 0xd488e5811802AFe9B90D6BD1BF420F94bF2FF1d6

describe("testing the  Company Function", function(){
  const CompanyContractAddress = "0xd488e5811802AFe9B90D6BD1BF420F94bF2FF1d6" ;
  const web3 = new Web3.Web3("http://127.0.0.1:7545") ;
  const contract = new web3.eth.Contract(Company.abi, CompanyContractAddress) ;
  const acc = web3.eth.getAccounts() ;
  let accounts = [] ;
  it("getting the accounts", async function(){
    accounts = await acc.then(res => res).catch(err => console.log(err)) ;
  })
    function createTransaction(from, to, gas, gasPrice, data, value) {
      return {
        from: from,
        to: to,
        gas: gas,
        gasPrice:gasPrice,
        data:data,
        value:value
      } ;
  }
  it("connecting to the Company Contract and start doing testing", async function(){
    let boardMembers = await contract.methods.listofBoardMembers().call({from: accounts[3]}) ;
    console.log(`The board Members are ${boardMembers}`)
    let CEO = await contract.methods.getCEO().call() ;
    console.log(`The CEO was ${CEO}`) ;
    const encodeRaiseFunds = contract.methods.raiseFund("kavya's birthday", web3.utils.toWei('0.1','ether')).encodeABI() ;
    const transaction = createTransaction(
      CEO, CompanyContractAddress, '5480905', '2000000000', encodeRaiseFunds, web3.utils.toWei('0', 'ether')
    ) ; 
    delete transaction.value ;
    web3.eth.signTransaction(transaction, "0xeae67082fd4ac840b831443d9bbff929c7b4f2e9793cf6fca3ea209c0a425144").then( signedTransaction => {
              web3.eth.sendSignedTransaction(signedTransaction.raw)
            .on('receipt', (receipt) => {
              console.log('Transaction receipt:', receipt);
            })
            .on('error', (error) => {
              console.error('Transaction error:', error);
            });
          }) ;
    const pendingFunctions = await contract.methods.getPendingRaiseFunds().call({from: CEO}) ;
    console.log(`The Pending Funds are ${pendingFunctions[0]}`) ;
    console.log(`Total board members are ${boardMembers.length}`) ; // seven Members has to vote for a successful vote
    // await contract.methods.voteRaiseFund(pendingFunctions[0].timestamp,0,true).send({
    //   from: accounts[9], // change here statically, only vote one time[ run from 3rd account to 13th account]
    //   gas: '5480905',
    //   gasPrice: '2000000000',
    //   to: CompanyContractAddress
    // }) ;
    const successfulFunds = await contract.methods.getSuccesfullFunds().call({from: CEO}) ;
    console.log(`The Pending Funds are ${successfulFunds[0].votedMembers}`) ; // this was successfully achieved
  })
})