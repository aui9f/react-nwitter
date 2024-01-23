import { styled } from "styled-components"
import { auth, signOut } from "../fBase"
import { Link, useNavigate } from "react-router-dom"

import home from '../assets/home.png'
import user from '../assets/user.png'
import out from '../assets/out.png'

const Menu = styled.ul`
    width: 88px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ededed;
`

const MenuItem = styled.li`
    
    margin: 8px 0;
    width: 48px;
    height: 48px;
    border: 1px solid gray;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 20px;
    }

`


export default function NavigationBar () {
    const navigate = useNavigate();
    const logout = () => {
        if(confirm('로그아웃하시겠습니까?')){
            signOut(auth).then(() => {
                navigate('/login');
            }).catch((error) => {
                console.log('An error happened.', error)
            });
        }
        
    }
    return <>
        <Menu>
            
                <Link to={'/'}> 
                <MenuItem>
                    <img src={home}/>
            </MenuItem>    
                </Link>
            

            <Link to={`/profile`}>
            <MenuItem>
                 
                <img src={user}/>
            </MenuItem>
                </Link>
            


            <MenuItem onClick={logout}>
            <img src={out}/>

            </MenuItem>


        </Menu>
    </>
    
    
}