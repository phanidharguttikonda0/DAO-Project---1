import React from 'react';
import Body from './Body';
import NavBar from './NavBar';

function Main(props) {
    return (
        <div>
            <NavBar />
            <Body />
        </div>
    );
}

export default Main;

//* This is where we will connect to the contract and we will do the list of things