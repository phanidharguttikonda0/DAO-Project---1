import React, { useContext, useEffect, useState } from 'react';
import { addressContext } from '../../../App';
import { CompanyContract } from '../MainDashBoard';
import WithDrawDone from '../WithDrawDone';
import css from './pending.module.css';
function Funds(props) {
    const contract = useContext(CompanyContract) ;
    const [withdrawClicked, changeWithdrawClicked] = useState(false) ;
    const address = useContext(addressContext) ;
    useEffect(() => {}, [withdrawClicked]) ;
    const Vote = async (value) => {
        try{
            console.log("-----------------------------------") ;
            console.log(contract) ;
            await contract.methods.voteRaiseFund(String(props.item.timestamp), props.index, value).send({
                from: props.address,
                gas: '5480905',
                gasPrice: '2000000000'
            }) ;
        }catch(err){
            console.log(err) ;
            alert('Voted Already Only one Vote Once') ;
        }
    }
    return (
        <div className={css.pending}>
            <div className={css.data}>
            <h3> Reason :: {props.item.reason} </h3>
            <h5> Raised-Funds {String(props.item.amount)} ETH</h5>
            <h5> Time {String(props.item.timestamp)}</h5>
            <h5> Voted Members {String(props.item.votedMembers)} </h5>
            </div>
            {
                withdrawClicked ? <WithDrawDone contract={contract} index={props.index} address={address} close={changeWithdrawClicked}/> : undefined
            }
            {
            props.isVote ? props.isCEO !== undefined? <div className={css.withdraw}>
                <button onClick={() => {
                    //* we will check whether the address is CEO or not
                    async function main() {
                        try{
                            //await contract.methods.withdraw
                            console.log("CEO Called successfully")
                            changeWithdrawClicked(true) ;
                        }catch(err){
                            alert("may be already with-drawed please refresh the page") ;
                            console.log(err) ;
                        }
                    }
                    main() ;
                }} > with-draw </button>
            </div>: <div className={css.submit}>
            <button onClick={() => {Vote(true)}}> Up-Vote </button>
            <button onClick={() => {Vote(false)}}> Down-Vote </button>
            </div> : undefined
            }
        </div>
    );
}

export default Funds;