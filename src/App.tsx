
import { RouterProvider } from 'react-router-dom'
import Router from './Router'

import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'
import { useEffect, useState } from 'react';
import Loding from './components/Loding';
import {auth, onAuthStateChanged} from './fBase'

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
  box-sizing: border-box;
  }
  body {
    background-color: black;
    color: #eeeeee;
    font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

`;

function App() {
  const [isLoading, setIsLogding] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  
  const init = async() => {
    
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogding(false);
        console.log('로그인 사용자: ', user)
      } else {
        setIsLogding(true);
        console.log('User is signed out');
      }
      setIsLogding(false)
    });
  };

  useEffect(()=>{
    init();
  },[])
  return<>
    <GlobalStyles/>
    
    {isLoading?<Loding/>:<RouterProvider router={Router} />}
    
      
  </>

}

export default App
