import React from 'react';
import css from "./header.module.css";
import LeftSide from './left-side';
import RightSide from './right-side';

function Header(props) {
    return (
        <div className={css.header}>
            <LeftSide className={css.leftcomponent}/>
            <RightSide className={css.rightcomponent}/>
        </div>
    );
}

export default Header;