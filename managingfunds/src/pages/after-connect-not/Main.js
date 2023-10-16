import React, { useEffect, useState } from 'react';
import Body from './Body';
import css from "./Main.module.css";
import MainBody from './MainBody';
import RefreshPage from './RefreshPage';

export const membersContext = React.createContext() ;
export const mainObjectContext = React.createContext() ;
export const RefreshContext = React.createContext() ;
export const ObjectContext = React.createContext() ;
function Main(props) {
    const [ismembers, addmembers] = useState(false) ;
    const [mainObject, changeMainObject] = useState([]) ;
    const [refresh, changeRefresh] = useState(false) ;
    useEffect(() => {},[ismembers]) ;
    useEffect(()=>{},[refresh]) ;
    return (
        <ObjectContext.Provider value={mainObject}>
            <RefreshContext.Provider value={changeRefresh}>
            <mainObjectContext.Provider value={changeMainObject} >
                <membersContext.Provider value={addmembers}>
                    <div className={css.Main}>
                        <div className={css.description}>
                            Join Us make you'r company Funds Safer and take decisions in a clean and transparent
                            way with out any trouble
                        </div>
                        {
                            ismembers ? refresh ? <RefreshPage />: <MainBody count={mainObject[2]} className={css.mainbody}/> :
                            <Body className={css.body}/>
                        }
                        
                    </div>
            </membersContext.Provider>
        </mainObjectContext.Provider>
        </RefreshContext.Provider>
        </ObjectContext.Provider>
    );
}

export default Main;

//* this file manages the whole content when the user was not part of any company