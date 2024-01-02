import { Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import Auth from 'routes/Auth'

const Router = ({isLoggedIn}) => {
  
  return (
    <Routes>
      {isLoggedIn ? <Route path="/" element={<Home />} />: <Route path="/" element={<Auth />} />}
    </Routes>
  );
};

export default Router;