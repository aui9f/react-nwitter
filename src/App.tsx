
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
    font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

.h1, h1 {
  font-size: 2rem;
}

.h2, h2 {
  font-size: 1.8rem;
}

.h3, h3 {
  font-size: 1.6rem;
}

.h4, h4 {
  font-size: 1.4rem;
}

.h5, h5 {
  font-size: 1.2rem;
}

.h6, h6 {
  font-size: 1rem;
}

hr {
   display:block;
   height:1px;
   border:0;  
   border-top:1px solid #cccccc;
   margin:1em 0;
   padding:0;
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
