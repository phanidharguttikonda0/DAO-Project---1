import React, { useContext, useState } from 'react';
import css from "./Body.module.css";
import { mainObjectContext, membersContext } from './Main';

function Body(props) {

    const ismembers = useContext(membersContext) ;
    const mainObject = useContext(mainObjectContext) ;

    const [CEOAdress, changeCEOAddress] = useState("") ;
    const [acceptance, changeAcceptance] = useState("") ;
    const [boardMembers, changeboardMembers] = useState("") ;
    const [value, changeValue] = useState("") ;


    const CEOChange = (event) => {
        changeCEOAddress(event.target.value) ;
    }
    const Acceptance = (event) => {
        if(Number(event.target.value) > 100){
            alert("The acceptance rate must be with in 100% only") ;
        }else
        changeAcceptance(event.target.value) ;
    }
    const NoOfMembers = (event) => {
        if(Number(event.target.value) <= 25)
            changeboardMembers(event.target.value) ;
        else alert("The board members can be maximum of only 25") ;
    }
    const valueChange = (event) => {
        if(Number(event.target.value) < 2) {
            alert("Minimum Funds Deposit Should be 2 ether") ;
            changeValue("") ;
        }else{
            changeValue(event.target.value) ;
        }
    }

    const check = () => {
        console.log("Check Called Off", CEOAdress.length) ;
        //* we are going check whether all the fields are correct or not
        if (CEOAdress.length === 42 && Number(acceptance) >= 40 && Number(boardMembers) >= 5){
            console.log("Condition Satisfied")
            mainObject([CEOAdress,acceptance,boardMembers,String(Number(value)*1000000000000000000)]) ;
            ismembers(true) ;
        }else{
            let string = `
            Check whether address has 40 characters or not,
            and acceptance should be min of 40,
            board-Members should be minimum of 5
            `
            alert(string) ;
        }
    }// 0xb21b58d830053167def917c99540C7EE2d4567f5

    return (
        <div className={css.body}>
            <form onSubmit={
                (event) => {
                    event.preventDefault(); // This prevents the default form submission behavior
                    // Your form submission logic here
                }
            }>
                <input type='text' placeholder='CEO address' className={css.input}
                value={CEOAdress} onChange={CEOChange}/>
                <input type='number' placeholder='acceptance' className={css.input} 
                value={acceptance} onChange={Acceptance}/>
                <input type='number' placeholder='Number of Board Members' className={css.input} 
                value={boardMembers} onChange={NoOfMembers}/>
                <input type='number' placeholder='Intial funds Deposit in ether' className={css.input} 
                value={value} onChange={valueChange}/>
                <button onClick={check}> Continue </button>
                
            </form>
        </div>
    );
}

export default Body;

//* when this page opens an pop will open asking about how many Board members, if you give it correctly
//* then it will make the page ready with those many inputs

//* we have to check for the acceptance rate should be less than or equal to 100

//* board members can be any number of members