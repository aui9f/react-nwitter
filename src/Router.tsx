import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./route/Home";
import Profile from "./route/Profile";
import Login from "./route/Login";
import Account from "./route/Account";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoutes><Layout/></ProtectedRoutes>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'profile',
                element: <Profile/>
            },
        ]
    },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/account',
                element: <Account/>
            },
])

export default Router;
