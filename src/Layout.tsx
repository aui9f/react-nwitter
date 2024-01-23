import { Outlet } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import { styled } from "styled-components"

const Wrapper=styled.div`
    display: flex;
    width: 100%;
`

const Page = styled.div`
    margin-left: 88px;
    flex: 1;
    height: 100vh;
`

function Layout(){
    return <>
        <Wrapper>
            
            <NavigationBar/>
            <Page><Outlet/></Page>
        </Wrapper>
    </>
}
export default Layout