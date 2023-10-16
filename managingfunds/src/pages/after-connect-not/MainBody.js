import React, { useContext, useState } from 'react';
import { addressContext, contractInstance } from '../../App';
import EachMember from './EachMember';
import { ObjectContext, RefreshContext } from './Main';
import css from "./MainBody.module.css";


const regex = /^(0x|0X)?[0-9a-fA-F]{40}$/ ;

function MainBody(props) {
    const mainObject = useContext(ObjectContext) ;
    const contract = useContext(contractInstance) ;
    const address = useContext(addressContext) ;
    const refresh = useContext(RefreshContext) ;
    let [membersList, changeMembersList] = useState([]) ;
    const renderComponents = (count) => {
        let components = [] ;
        for(let i = 0 ; i < count; i++){
            components.push(<EachMember key={i} index={i} changeMembersList={changeMembersList}
                membersList={membersList}/>) ;
        }
        return components ;
    }
    const submit = () => {
        // we are going to check whether all the addresses are correct or not
        for(let i = 0 ; i < membersList.length ; i++){
            console.log(membersList) ;
            if(!regex.test(membersList[i])){
                alert(`The ${i+1} address is invalid`) ;
                return;
            }
        }
        // if all the address are in correct format then
        // we are going to call the createCompany Function
        async function createCompany() {
            console.log(await contract.methods.setCompany(membersList,mainObject[0], mainObject[1]).send({
                from: address,
                gas: '5480905', // Gas limit
                gasPrice: '2000000000', // Gas price in Gwei
                value: mainObject[3]}) );
        }
        createCompany() ;
        console.log("Called Successfully") ;
        alert("Successfully Created an Company") ;
        refresh(true) ;
    }

    return (
        <div className={css.listcontainer}>
                {renderComponents(props.count)}
                <button onClick={submit} className={css.button}> Create Company </button>
        </div>
    );
}

export default MainBody;