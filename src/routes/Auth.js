import { useState } from "react";

const Auth = () =>{
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

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
        console.log(email, pw)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={email} name="email" placeholder="Email" required onChange={onChange}/>
                <input type="password" value={pw} name="password" placeholder="Password" required onChange={onChange}/>
                <input type="submit" value="Log In"/>
            </form>
            <div>
                <button type="button">Google</button>
                <button type="button">Naver</button>
            </div>
        </div>
    )
}
export default Auth;