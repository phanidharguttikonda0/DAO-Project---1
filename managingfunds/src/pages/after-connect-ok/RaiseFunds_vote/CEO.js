import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { addressContext } from '../../../App';
import { CompanyContract } from '../MainDashBoard';
import css from "./CEO.module.css";
function CEO(props) {
    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext) ;
    const [why, changeWhy] = useState("") ;
    const [value,  changeValue] = useState(1) ;
    const [onsubmit, changeonSubmit] = useState(false) ;
    const changewhy = (event) => {
        if(event.target.value.length > 30){
            alert("Give a reason with in 30 characters") ;
        }else
        changeWhy(event.target.value) ;
    }
    const changevalue = (event) => {
        if(Number(event.target.value) <= 0){
            alert("Minimum one ether to rise funds")
        }else
        changeValue(event.target.value) ;
    }

    const submitFund = async () => {
        if(why.length < 12){
            alert("Please Provide a reason of min 12 characters") ;
        }else{
            async function main() {
                await contract.methods.raiseFund(why, value).send({from: address, gas: '5480905',
            gasPrice: '2000000000'}) ;
            }
            main() ;
            changeonSubmit(true) ;
        }
    }
    return (
        <div className={css.ceo}>
            <input type='text' placeholder='Enter Why to raise Funds' onChange={changewhy} value={why}/>
            <input type='Intial Funds' placeholder='Required Funds' onChange={changevalue} value={value} />
            <button onClick={ submitFund
            } > <div>
                <Link to="/" className={css.link} >Raise-Funds</Link>
                </div> </button>
        </div>
    );
}

export default CEO;

//* Creates an Vote and after submissions redirect to the home-page