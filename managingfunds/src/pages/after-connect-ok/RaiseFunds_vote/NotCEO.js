import React, { useContext, useEffect, useState } from 'react';
import { addressContext } from '../../../App';
import { CompanyContract, isOKContext } from '../MainDashBoard';
import Funds from './Funds';

function NotCEO(props) {
    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext) ;
    const [FailedFunds, changeFailedFundsList] = useState([]) ;
    const isok = useContext(isOKContext) ;
    const [render, changerender] = useState(false) ;
    const [SucessfullFunds, changeSuccessfullFundsList] = useState([]) ;
    useEffect(() => {
        async function main() {
            changeFailedFundsList(await contract.methods.getFailedFunds().call({from: address})) ;
            changeSuccessfullFundsList(await contract.methods.getSuccesfullFunds().call({from: address})) ;
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
        <div>
            <div>
            list of all Failed Funds
            {
                render ? FailedFunds.map((item,index) => <Funds key={index} item={item} isVote={false} />) : <div> loading
                    </div>
            }
            </div>
            <div>
                List of all Sucessfull Funds
                {
                    render ? SucessfullFunds.map((item,index) => <Funds key={index} item={item} isVote={false} /> ) : <div> loading </div>
                }
            </div>
        </div>
    );
}

export default NotCEO;