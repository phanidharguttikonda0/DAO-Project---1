import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './pages/common-components/header';

export const addressContext = React.createContext() ;
export const changeAddressContext = React.createContext() ;
function App() {
  const [address , changeAddress] = useState("") ;
  useEffect(() => {}, [address]) ;
  return (
    <addressContext.Provider value={address} >
      <changeAddressContext.Provider value={changeAddress}>
        <div className="App">
          <Header />
        </div>
      </changeAddressContext.Provider>
    </addressContext.Provider>
  );
}

export default App;
