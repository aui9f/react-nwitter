import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./route/Home";
import Profile from "./route/Profile";
import Login from "./route/Login";
import Account from "./route/Account";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
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
