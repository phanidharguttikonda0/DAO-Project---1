import React, { useState } from 'react';
import css from "./EachMember.module.css";



function EachMember(props) {
    const [address, changeaddress] = useState("") ;

    return (
        <div>
            <input type='text' value={address} placeholder='Address' onChange={(event) => {
                if(event.target.value.length > 42){
                    alert("invalid address") ;
                    changeaddress("") ;
                }else{
                    const newArray = [...props.membersList] ;
                    newArray[props.index] = event.target.value ;
                    props.changeMembersList(newArray) ;
                    changeaddress(event.target.value) ;
                }
            }} className={css.input}/>
        </div>
    );
}

export default EachMember;