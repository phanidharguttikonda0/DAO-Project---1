import React, { useContext } from 'react';
import { addressContext } from '../../App';
import { CEOContext, CompanyContract, isOKContext } from './MainDashBoard';
import CEO from './RaiseFunds_vote/CEO';
import NotCEO from './RaiseFunds_vote/NotCEO';
import css from "./VoteRaiseFunds.module.css";

function RaiseFundorVote(props) {
    const CEOAddress = useContext(CEOContext) ;
    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext) ;
    const isok = useContext(isOKContext) ;


    return (
        <div className={css.main}>
            {
                CEOAddress === address ? <CEO /> : <NotCEO />
            }
        </div>
    );
}

export default RaiseFundorVote;