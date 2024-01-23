import { styled } from "styled-components"
import Logo from '../assets/google_icon.svg'
import { auth, signInWithPopup,  GoogleAuthProvider } from "../fBase"
import { useNavigate } from "react-router-dom"
const Button = styled.button`
    padding: 12px;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Img = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 8px;
`
export default function GooogleLogin() {

    const navigate = useNavigate();

    const onClick = () => {

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                credential?.accessToken;
                navigate('/')
                
            //     // This gives you a Google Access Token. You can use it to access the Google API.
            //     const credential = GoogleAuthProvider.credentialFromResult(result);
            //     const token = credential.accessToken;
            //     // The signed-in user info.
            //     const user = result.user;
            //     // IdP data available using getAdditionalUserInfo(result)
            //     // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(`${errorCode} / ${errorMessage} / ${email} / ${credential} `);
                // ...
            });
    }
    return <Button onClick={onClick}>
        <Img src={Logo}/>
    Google Login
    </Button>
}