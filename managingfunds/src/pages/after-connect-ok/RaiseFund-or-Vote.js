import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addressContext } from '../../App';
import { CEOContext, isOKContext } from './MainDashBoard';
import CEO from './RaiseFunds_vote/CEO';
import css from "./VoteRaiseFunds.module.css";

function RaiseFundorVote(props) {
    const CEOAddress = useContext(CEOContext) ;
    const address = useContext(addressContext) ;
    const isok = useContext(isOKContext) ;
    const [bool, changebool] = useState(false) ;
    useEffect(() => {
        if(isok){
            changebool(true) ;
        }
    }, [isok]) ;
    return (
        <div className={CEOAddress === address ? css.main1 : css.main}>
            {
                isok ? CEOAddress === address ? <CEO /> : <h1> 
                    Only CEO can call the function 
                    Go-to <Link to="/" className={css.link}>Home</Link>
                </h1>: <div> Loading </div>
            }
        </div>
    );
}

export default RaiseFundorVote;