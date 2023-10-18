import React from 'react';
import css from "./MainBody.module.css";

function MainBody(props) {
    return (
        <div className={css.body}>
            <h1 className={css.h1}>
                Managing the Company Funds
            </h1>
            <p className={css.paragraph}>
                Managing the Funds and the decisions of the board members in a clear and transparent way
                by making the data more secure . Any CEO can create an Vote for any thing and can pass the 
                vote to the board members and according to the acceptance of the vote , the bill can be 
                passed and accepted , the CEO will take the decisions and the board-members can up-vote or
                down-vote for the CEO decision, And you can also keep your funds safer and managable . Every
                one get's the qual importance over here
            </p>
            <h3>
                Please Connect to Wallet !!!
            </h3>
        </div>
    );
}

export default MainBody;