import { useState } from "react";

const Auth = () =>{
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name==='email'){
            setEmail(value)
        }else if(name==='password'){
            setPw(value)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(newAccount){}else{}
    }
    

    return (
        <div>
            <form onSubmit={onSubmit}>
                {/* <p>{isIn?'로그인':'회워가입'}</p> */}
                <input type="text" value={email} name="email" placeholder="Email" required onChange={onChange}/>
                <input type="password" value={pw} name="password" placeholder="Password" required onChange={onChange}/>
                <input type="submit" value={newAccount?'Create Account':'Login'}/>
            </form>
            <div>
                <button type="button">Google</button>
                <button type="button">Naver</button>
            </div>
        </div>
    )
}
export default Auth;