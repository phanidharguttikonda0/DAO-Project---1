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
            await props.contract.methods.withdrawRaisedFund(props.index, address).send({from: props.address}) ;
            props.close(false) ;
        }
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