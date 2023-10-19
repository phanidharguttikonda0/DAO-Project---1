import React, { useContext } from 'react';
import { CompanyContract } from '../MainDashBoard';
import css from './pending.module.css';
function Funds(props) {
    const contract = useContext(CompanyContract) ;
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
            props.isVote ? <div className={css.submit}>
            <button onClick={() => {Vote(true)}}> Up-Vote </button>
            <button onClick={() => {Vote(false)}}> Down-Vote </button>
            </div> : undefined
            }
        </div>
    );
}

export default Funds;