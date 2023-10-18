import React, { useContext, useEffect, useState } from 'react';
import { addressContext } from '../../App';
import BoardMember from './BoardMember';
import { CompanyContract, isOKContext } from './MainDashBoard';
import css from "./members.module.css";
function BoardMembers(props) {
    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext)
    const [BoardMembers, changeBoardmembers] = useState([]) ;
    const isOK = useContext(isOKContext) ;
    useEffect(() => {
        async function main(){
            console.log(`The props.contract was ${await contract.methods.listofBoardMembers().call({from: address})}`) ;
            changeBoardmembers(await contract.methods.listofBoardMembers().call({from: address})) // CompanyContract
        }
        if(isOK) main() ;
    }, [isOK])
    return (
        <div className={css.members}>
            {
                BoardMembers.map(item => <BoardMember address={item} />)
            }
        </div>
    );
}

export default BoardMembers;