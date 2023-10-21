import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { addressContext } from '../../App';
import { CompanyContract, isOKContext } from './MainDashBoard';
import Funds from './RaiseFunds_vote/Funds';
import css from './Withdraw.module.css';
const web3 = new Web3('http://127.0.0.1:7545') ;
function WithDraw(props) {
    const address = useContext(addressContext) ;
    const contract = useContext(CompanyContract) ;
    const [withdrawFunds, changeWithdrawFunds] = useState([]) ;
    const [balance, changeBalance] = useState("") ;
    const isok = useContext(isOKContext) ;
    const [render, changerender] = useState(false) ;
    const [CEO, changeCEO] = useState("") ;

    useEffect(() => {
        async function main() {
            changeWithdrawFunds(await contract.methods.getSuccesfullFunds().call({from: address})) ;
            changeBalance(await contract.methods.getBalance().call({from: address})) ;
            changeCEO(await contract.methods.getCEO().call({from: address})) ;
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
        <div className={css.withdraw}>
            <div className={css.balance}>
                <h1> Remaining Funds are :: {web3.utils.fromWei(String(balance), 'ether')} ETH </h1>
            </div>
            <div className={css.funds}>
                {
                    render ? withdrawFunds.map((item,index) => {
                        return {
                            item: item, index: index
                        }
                    }).filter(item => !item.item.isused
                        ).map(
                        (item) => <Funds key={item.index} index = {item.index} item={item.item} isVote={true} isCEO={CEO}
                        address={address} />
                    ) : <div> Loading </div>
                }
            </div>
        </div>
    );
}

export default WithDraw;

// * WithDraw - Here we are going to display the remaining Balance in the Company 
//* and also the remaing SuccessFull Funds List to with draw