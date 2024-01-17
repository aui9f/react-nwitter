import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form"
import { styled } from "styled-components";
import { auth } from "../fBase";
import { useNavigate } from "react-router-dom";

interface IForm {
    email: string
    pw: string
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
`
const Form = styled.form`
    width: 320px;
    display: flex;
    flex-direction: column;
    padding: 12px;
`
const Input = styled.input`
    padding: 12px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    margin-bottom: 8px;
`
const Button = styled.button`
    padding: 12px;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
`

export default function Login(){
    const {register, handleSubmit} = useForm<IForm>();
    const navigator = useNavigate();
    const onSubmit = async(data: IForm) => {
        const {email, pw} = data;
        await signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigator('/')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('[ERROR]', errorCode,errorMessage );
            }
        );

    }
    return <>
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('email', {required: true})}/>
                <Input {...register('pw', {required: true})}/>
                <Button>LOGIN</Button>
            </Form>
        </Wrapper>
    </>
}