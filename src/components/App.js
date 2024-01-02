
import { useState } from 'react';
import AppRouter from 'components/Router'
import Footer from 'components/Footer'
import {auth} from 'fbase'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return(<>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <Footer/>
  </>)
}

export default App;
