import { db, doc, deleteDoc,collection,  query } from "../fBase";
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
        console.log('Detete: ', userId);
        // const q = query(collection(db, "tweets"), );÷
        if(confirm('삭제하시겠습니까?')){
            await deleteDoc(doc(db, "tweets", id ));
        }
        
        
    }
    return <TweetBox >
        <div className="header">
            <p className="nickname">{userId}</p>
            <p >{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className="body">
            <p>{text}</p>
            <ImgList></ImgList>
        </div>
        <div className="footer">
            <Button onClick={()=>{onDelete(userId)}}>Delete</Button>
            <Button/>
        </div>
    </TweetBox>
}