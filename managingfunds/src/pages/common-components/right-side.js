import React, { useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import { addressContext, changeAddressContext } from '../../App';
import './right-side.css';

function RightSide(props) {
    const address = useContext(addressContext) ;
    const changeAddress = useContext(changeAddressContext) ;
    const [isconnected, connect] = useState(address.length !== 0 ? true : false) ;
    useEffect(() => {
        connect(address.length !== 0 ? true : false) ;
    }, [address]) ;

    const connected = () => {
        async function main(changeAddress) {
            if (window.ethereum) {
                // Requesting user's permission to connect
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    console.log(accounts) ;
                    changeAddress(accounts[0]) ; // takes the starting account
                } catch (error) {
                    console.error('Error connecting to MetaMask:', error);
                }
            } else {
                console.error('MetaMask not detected. Please install it to use this feature.');
            }
        }
        main(changeAddress) ;
    }

    return (
        <div className='right-side'>
            <button className={`${isconnected ? 'wallet-connect-1' : 'wallet-connect'}`} onClick={connected}>
                Connect Wallet
            </button>
        </div>
    );
}

export default RightSide;