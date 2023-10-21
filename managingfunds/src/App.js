import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import ABI from './ManagingCompanies.json';
import Main from './pages/after-connect-not/Main';
import MainDashBoard from './pages/after-connect-ok/MainDashBoard';
import Main1 from './pages/before-connect/Main';
import Header from './pages/common-components/header';
export const addressContext = React.createContext() ;
export const changeAddressContext = React.createContext() ;
const contractAddress = "0xfF1b622f6dC4089014D5903Caf370f3E03551bd0" ; // ManagingCompanyFunds Contract Address
export const contractInstance = React.createContext() ;
export const companyContractContext = React.createContext() ;

function App() {
  const [address , changeAddress] = useState("") ;
  const [contract, changecontract] = useState({}) ;
  const [hasAccount, changehasAccount] = useState(false) ;
  const [companyContract, changeCompanyContract] = useState("") ;

  useEffect(() => {
    // once address is connected we will check whether he was in a company or not
    async function check() {
      let value = await contract.methods.getCompanyAddress(address).call() ;
      console.log(value) ;
      changeCompanyContract(value) ;
      if(value !== "0x0000000000000000000000000000000000000000" ){
        changehasAccount(true) ;
      }
    }
    if(address.length !== 0 && Object.keys(contract) !== 0){
      check() ;
    }
  }, [address]) ; // occurs when the address was changed
  useEffect(() => { // occurs only once when page reloads for getting the instance of the contract
    //here we will get the instance of the contract
    let web3 = new Web3("http://127.0.0.1:7545") ;
    let contractInstance = new web3.eth.Contract(ABI.abi, contractAddress) ;
    changecontract(contractInstance) ;
  }, []) ;

  return (
    <companyContractContext.Provider value={companyContract}>
      <contractInstance.Provider value={contract}>
      <addressContext.Provider value={address} >
      <changeAddressContext.Provider value={changeAddress}>
        <div className="App">
          <Header className="nav-bar"/>
          {
            hasAccount ?  <MainDashBoard /> : address.length === 0 ? <Main1 /> : <Main />
          }
        </div>
      </changeAddressContext.Provider>
    </addressContext.Provider>
    </contractInstance.Provider>
    </companyContractContext.Provider>
  );
}

export default App;

//* we are going to connect to the ManagingCompanyFunds contract
