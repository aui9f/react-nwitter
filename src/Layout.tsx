import { Outlet } from "react-router-dom"

function Layout(){
    return <>
        <header>Header</header>
        <p>Layout</p>
        <Outlet/>
    </>
}
export default Layout