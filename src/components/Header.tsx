import { styled } from "styled-components"
import { auth, signOut } from "../fBase"
import { useNavigate } from "react-router-dom"
const TopHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px;
`
const User = styled.div`

`

const Button = styled.button`
    margin: 0 8px;    
`

export default function Header () {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth).then(() => {
        console.log('== Sign-out successful.==');
        navigate('/login');
        }).catch((error) => {
            console.log('An error happened.')
        });
    }
    return <TopHeader>
            <User>
                <p>이름</p>
            </User>
            <Button>USER</Button>
            <Button onClick={logout}>LOGOUT</Button>

        </TopHeader>
    
    
}