import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import {auth, createUserWithEmailAndPassword} from '../fBase'
import { useNavigate } from "react-router-dom"
interface IForm {
    email: string
    pw: string
    pw2: string
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
const Title = styled.div``
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

export default function Account(){
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<IForm>({});
    
    const onSubmit = (data:IForm) => {
        
        const {email, pw} = data;
        try {
            createUserWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User: ', user);
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error: ', errorCode, errorMessage);
                // ..
            });
        } catch (error) {
            
        } finally{
            navigate("/");
        }
        
    }
    return <>
        <Wrapper>
            <Title>
                <h2>Title</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
            </Title>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('email', {
                        required: '이메일은 필수값입니다.'})
                    } placeholder="Email"
                />
                <Input  {...register('pw', {required: true})} type="password" placeholder="Password"/>
                <Input  {...register('pw2', {required: true})} type="password" placeholder="Check Password"/>
                <Button>회원가입</Button>
                <p></p>
            </Form>
            
            <hr />

            <Button></Button>
            <Button></Button>
            
            <p></p>
        </Wrapper>
    </>
}