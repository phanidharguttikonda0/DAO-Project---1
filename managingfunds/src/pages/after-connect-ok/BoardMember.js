import React from 'react';
import css from "./BoardMember.module.css";
function BoardMember(props) {
    return (
        <div className={css.member}>
            {
                props.address
            }
        </div>
    );
}

export default BoardMember;