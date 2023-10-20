import React, { useContext, useEffect, useState } from 'react';
import { addressContext } from '../../App';
import css from "./History.module.css";
import { CompanyContract, isOKContext } from './MainDashBoard';
import Funds from './RaiseFunds_vote/Funds';
function History(props) {

    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext) ;
    const [FailedFunds, changeFailedFunds] = useState([]) ;
    const [successfullFunds, changeSucessFullFunds] = useState([]) ;
    const isok = useContext(isOKContext) ;
    const [render, changerender] = useState(false) ;

    useEffect(() => {
        async function main() {
            changeFailedFunds(await contract.methods.getFailedFunds().call({from: address})) ;
            changeSucessFullFunds(await contract.methods.getSuccesfullFunds().call({from: address})) ;
        }
        if(isok) {
            main() ;
            changerender(true) ;
        } ;
    }, [isok]) ;
    useEffect(() => {
        console.log(`The response was ${render}`)
    }, [render]) ;

    return (
        <div className={css.history}>
            <div className={css.successfull}>
            <h1> SuccessFull Funds </h1>
                {
                    render ? successfullFunds.map((item,index) => <div> 
                        <Funds key={index} item={item} isVote={false} 
                    address={address} index={index}/>
                    </div>) : <div> Loading </div>
                }
            </div>
            <div className={css.failed}>
            <h1> Failed Funds </h1>
                {
                    render ? FailedFunds.map((item, index) =>  <div> 
                        <Funds key={index} item={item} isVote={false} 
                    address={address} index={index}/>
                    </div>) : <div> Loading </div>
                }
            </div>
        </div>
    );
}

export default History;