import React from 'react';
import css from './Main.module.css';
import MainBody from './MainBody';
import Footer from './footer';
function Main1(props) {
    return (
        <div className={css.Main}>
            <MainBody />
            <Footer />
        </div>
    );
}

export default Main1;