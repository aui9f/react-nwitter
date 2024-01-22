
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { auth, db, collection, addDoc, storage, ref, uploadBytes, uploadBytesResumable } from "../fBase";
import { useEffect } from "react";
const Wrapper = styled.div`
    padding: 16px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: gray;
  background-color: lightgray;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

interface Tweets{
    text: string
    image?: []
}

export default function PostTweetForm(){
    const {register, handleSubmit, reset, watch, resetField} = useForm<Tweets>();
    
    const updateImages = watch('image');
    useEffect(()=>{
        /**
            1024 = 1KB
            1024 * 1024 = 1MB
            1024 * 1024 * 1024 = 1GB
            1024 * 1024 * 1024 * 1024 = 1TB
         */
        if (updateImages && updateImages.length > 0) {
            const {size} = updateImages[0];
            if(size>(1024 * 1024 * 1024)){
                alert('사이즈조절필요(1GB)');
                resetField("image")
            }
        }else{
            console.log("???")
        }
        
        // if(updateImages[0].size>(1024 * 1024 * 1024)){
        //     alert('사이즈조절필요(1GB)');
        // }

    }, [updateImages])
    
    const onSubmit = async (data: Tweets) => {
        try {
            //이미지
            // console.log(data.image)
            // return false;
            let imagePath = '';
            if(data.image){
                const img = data?.image?.[0];
                const storageRef = ref(storage, `images/${auth.currentUser?.uid}/${new Date().getTime()}-${img.name}`);
                // 'file' comes from the Blob or File API
                const snapshot = await uploadBytes(storageRef, data.image);
                imagePath = snapshot.ref.fullPath;
            }
            // Create a reference to 'mountains.jpg'
            // const mountainsRef = ref(storage, 'mountains.jpg');

            // // Create a reference to 'images/mountains.jpg'
            // const mountainImagesRef = ref(storage, 'images/mountains.jpg');

            //저장
            const docRef = await addDoc(collection(db, "tweets"), {
                text: data.text,
                createdAt: new Date().getTime(),
                userId: auth.currentUser?.uid,
                image: [imagePath],
                like: 0
            });
            console.log("Document written with ID: ", docRef.id);
            reset();
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        
        
    }

    return <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextArea {...register('text', {required: '필수입력사항입니다.',maxLength: 160})}/>
                <AttachFileButton htmlFor="file">Add Photo</AttachFileButton>
                <AttachFileInput {...register('image')} type="file" id="file" accept="image/*"/>

                <SubmitBtn type="submit" />
            </Form>
    </Wrapper>
    
}