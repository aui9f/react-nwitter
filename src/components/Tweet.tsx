import { 
    db, doc, deleteDoc,collection,  query, 
    storage, ref, deleteObject, updateDoc
} from "../fBase";

import { styled } from "styled-components";

interface ITweet{
    id?: string;
    userId: string;
    image?: string[];
    like: number;
    createdAt: number;
    text: string;
}
const TweetBox = styled.li`
    border: 1px solid lightgray;
    margin-bottom: 16px;
    >div{
        padding: 8px;
    }
`;

const ImgList = styled.div`
`;

const Button = styled.div`
background-color: lightcyan;
padding: 8px;
display: inline-block;
border-radius: 8px;
margin-left: 8px;
`;

export default function Tweet({id, text, userId, image, like, createdAt}: ITweet){
    const onDelete = async (userId:string) => {

        
        if(confirm('삭제하시겠습니까?')){
            const imgPath = image[0];
            await deleteDoc(doc(db, "tweets", id ));
            if(imgPath){
                
                // Create a reference to the file to delete
                const desertRef = ref(storage, imgPath);

                // Delete the file
                await deleteObject(desertRef).then(() => {
                // File deleted successfully
                console.log('삭제', desertRef)
                }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log('유지: ', error)
                });

            }
        }
        
        
    }
    const onUpdate = async () => {
        //Todo 수정모달
        // const washingtonRef = doc(db, "tweets", id);
        // // Set the "capital" field of the city 'DC'
        // await updateDoc(washingtonRef, {
        //     text: '숫자만 잇었음'
        // });
    }
    return <TweetBox >
        <div className="header">
            <p className="nickname">{userId}</p>
            <p >{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className="body">
            <p>{text}</p>
            <ImgList>
            {image[0]}
            </ImgList>
        </div>
        <div className="footer">
            <Button onClick={()=>{onDelete(userId)}}>Delete</Button>
            <Button onClick={onUpdate}>Update</Button>
        </div>
    </TweetBox>
}