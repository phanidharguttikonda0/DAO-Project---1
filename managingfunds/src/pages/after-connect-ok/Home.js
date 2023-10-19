import React, { useContext, useEffect, useState } from 'react';
import { addressContext } from '../../App';
import { CompanyContract, isOKContext } from './MainDashBoard';
import Funds from './RaiseFunds_vote/Funds';

function Home(props) {
    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext) ;
    const [PendingFunds, changePendingFunds] = useState([]) ;
    const isok = useContext(isOKContext) ;
    const [render, changerender] = useState(false) ;


    useEffect(() => {
        async function main() {
            changePendingFunds(await contract.methods.getPendingRaiseFunds().call({from: address})) ;
        }
        if(isok) {
            main() ;
            changerender(true) ;
        } ;
    }, [isok]) ;
    useEffect(() => {
        console.log(`The response was ${render}`)
    }, [render]) ;

    return (
        <div>
            <h1> PendingFunds </h1>
            {
                render ? PendingFunds.length === 0 ? 
                <h1> No Pending Funds   </h1>
                : PendingFunds.map((item,index) => <Funds key={index} item={item} isVote={true} 
                address={address} index={index} />) : <div> loading
                    </div>
            }
        </div>
    );
}

export default Home;