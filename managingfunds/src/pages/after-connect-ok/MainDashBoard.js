import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';
import { addressContext, companyContractContext, contractInstance } from '../../App';
import abi from '../../Company.json';
import BoardMembers from './BoardMembers';
import History from './History';
import Home from './Home';
import css from './MainDashBoard.module.css';
import RaiseFundorVote from './RaiseFund-or-Vote';
import WithDraw from './WithDraw';

export const CompanyContract = React.createContext() ;
export const isOKContext = React.createContext() ;
export const CEOContext = React.createContext() ;
function MainDashBoard(props) {

    const contract = useContext(contractInstance) ;
    const address = useContext(addressContext) ;
    const [companyContract, changecompanyContract] = useState({}) ;
    const companyAddress = useContext(companyContractContext) ;
    const [isOK , change] = useState(false) ;
    const [CEOAddress, changeCEO] = useState("") ;
    useEffect(() => {
        async function main() {
            const web3 = new Web3("HTTP://127.0.0.1:7545") ;
            changecompanyContract(new web3.eth.Contract(abi.abi, companyAddress)) ;
        }
        main() ;
        change(true) ;
    }, [contract, address, companyAddress]) ;

    useEffect(() => {
      async function main() {
        console.log(companyContract) ;
        changeCEO(await companyContract.methods.getCEO().call()) ;
      }
      if(isOK) main()
    }, [isOK]) ;

    return (

          <CEOContext.Provider value={CEOAddress}>
            <isOKContext.Provider value={isOK} >
            <CompanyContract.Provider value={companyContract}>
            <div className={css.main}>
            <div className={css.right}>
            <nav>
              <ul>
                <li>
                  <Link to="/" className={css.link}>Home</Link>
                </li>
                <li>
                  <Link to="/boardmembers" className={css.link}>Board Members</Link>
                </li>
                <li>
                  <Link to="/history" className={css.link}>History</Link>
                </li>
                <li>
                  <Link to="/RaiseFundorVote" className={css.link}>Raise-Fund/Vote</Link>
                </li>
                <li>
                  <Link to="/WithDrawReleasedFunds" className={css.link}>With-Draw</Link>
                </li>
              </ul>
            </nav>
            </div>
                    <Routes>
                    <Route path="/boardmembers" element={<BoardMembers />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/RaiseFundorVote" element={<RaiseFundorVote />}/>
                    <Route path="/WithDrawReleasedFunds" element={<WithDraw />}/>
                    <Route path="/" element={<Home/>}/>
                    </Routes>
            </div>
          </CompanyContract.Provider>
          </isOKContext.Provider>
          </CEOContext.Provider>
                    
      );
}

export default MainDashBoard;