import React, { useContext, useState } from 'react';
import { addressContext } from '../../../App';
import { CompanyContract } from '../MainDashBoard';

function NotCEO(props) {
    const contract = useContext(CompanyContract) ;
    const address = useContext(addressContext) ;
    const [pendingFundsList, changePendingFundsList] = useState([]) ;
    return (
        <div>
            list of all pending Raised Funds
        </div>
    );
}

export default NotCEO;