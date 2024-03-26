import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import {auth, createUserWithEmailAndPassword} from '../fBase'
import { useNavigate } from "react-router-dom"
import Divider from "../components/StyleUi/Divider"
import { CollectionInsert } from "../api/firestore"
import { FirebaseError } from "firebase/app"

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
background-color: #a1cfe2;
`
const Title = styled.div`
    margin-bottom: 24px;
    width: 320px;
`
const Form = styled.form`
    width: 320px;
    display: flex;
    flex-direction: column;
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
    width: 320px;
    background-color: #4d9ee8;
    color: #FFFFFF;
`

const Hr = styled.hr`
    border-top: 1px solid #eeeeee;
    margin: 16px 0;
    width: 320px;
`

interface IError {
   code: number
   message: string
    
}
export default function Account(){
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, watch} = useForm<IForm>({});
    
    const onSubmit = async (data:IForm) => {
        
        const {email, pw} = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
            const uid = userCredential.user.uid;
            CollectionInsert('user', {
                uid, email,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                nickname: email.split('@')[0],
                photo: '',
                self: ''
            });
        } catch (error) {
            const err = error instanceof FirebaseError
            if(err){
                console.log(error.code, error.message);
              }
            
            // const errorMessage = err.message;
            // console.log('error: ', errorCode, errorMessage);
        } finally{
            navigate("/");
        }
        
    }

    const onClick = () => {
        navigate('/login')
    }



    return <>
        <Wrapper>
            <Title>
                <h2>Title</h2>
                <Divider label={'ACCOUNT'}/>
            </Title>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('email', {
                        required: '이메일은 필수값입니다.'})
                    } placeholder="Email"
                />
                <p>{errors?.email?.message}</p>
                <Input  {...register('pw', {
                    required: '비밀번호는 필수값입니다.', 
                    minLength: {
                        value: 6, message: '6글자 이상'
                    }
                })} type="password" placeholder="Password"/>
                <p>{errors?.pw?.message}</p>
                <Input  {...register('pw2', {
                        required: true, 
                        validate: (inputData: string) => {
                            if(watch('pw')!==inputData){
                                return 'your Password do no match'
                            }
                        }
                    })
                } type="password" placeholder="Check Password"/>

                <p>{errors?.pw2?.message}</p>
                <Button>회원가입</Button>
                
            </Form>
            

            {/* <Button onClick={onClick}>LOGIN</Button> */}
            
            <p></p>
        </Wrapper>
    </>
}