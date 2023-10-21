import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import css from './withdrawDone.module.css';

function WithDrawDone(props) {
    const [address, changeAddress] = useState("") ;
    const addressChange = (event) => {
        changeAddress(event.target.value) ;
    }
    const submit = () => {
        async function main() {
            try{
                await props.contract.methods.withdrawRaisedFund(Number(props.index), address).send({from: props.address,
                gas: '5480905',
                gasPrice: '2000000000'
            }) ;
                props.close(false) ;
            }catch(err){
                alert("Only The CEO can With-draw the funds") ;
                props.close(false) ;
                console.log(err) ;
                console.log(props.index)
            }
        }
        console.log(`The address was ${props.address}`)
        main() ;
    }
    return ReactDOM.createPortal((
        <div className={css.done}>
            <input type='text' value={address} onChange={addressChange} placeholder='Enter the address where to share the Funds'/>
            <button onClick={submit}> continue </button>
            <button onClick={() => {
                props.close(false) ;
            }}> close </button>
        </div>
    ), document.getElementById('with-draw'));
}

export default WithDrawDone;