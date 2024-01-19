import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function Layout(){
    return <>
        <Header/>
        <p>Layout</p>
        <Outlet/>
    </>
}
export default Layout