import { styled } from "styled-components";
import { auth, ref, storage, uploadBytes, getDownloadURL, query, collection, orderBy, db, limit, getDocs } from "../fBase";
import { useEffect, useState } from "react";
import { where } from "firebase/firestore";
import Tweet from "../components/Tweet";

const Form = styled.form``;
const Header = styled.div`
    height: 48px;
    background-color: #eeeeee;
    display: flex;
    align-items: center;
    h2{
        flex: 1;
    }
    div{
        width: 48px;
        height: 48px;

    }
    button{
        background-color: rgb(15, 20, 25);
        padding: 8px 16px;
        border-radius: 24px ;
        color: #FFFFFF;
        margin: 0 12px;
    }
`;
const ProfileImg = styled.div`
    height: 160px;
    background-color: rgba(222,222,222,.2);
    position: relative;
    margin-bottom: 48px;
    label{
        position: absolute;
        bottom: -40px;
        left: 16px;
        width: 80px;
        height: 80px;
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: lightgray;
    }
    input{
        display: none;
    }
`;
const InputList = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    input, textarea{
        margin-bottom: 16px;
        border-radius: 4px;
        min-height: 48px;
        border: 1px solid #aaaaaa;
        &::placeholder{
            color: #aaaaaa;
        }
    }
    textarea{
        padding: 8px;
        height: 160px;
    };
`

const TweetList = styled.ul`
`


interface ITweet{
    id?: string;
    userId: string;
    image?: string[];
    like: number;
    createdAt: number;
    text: string;
}

export default function Profile(){

    const user = auth.currentUser;
    const [avatar, setAvatar] = useState('');
    const [userTweets, setUserTweets] = useState<ITweet[]>([])

    const fetchTweets = async () => {
        const user = auth.currentUser;
        if(user){
            const q = query(
                collection(db, "tweets"), 
                orderBy("createdAt", "desc"), 
                limit(10),
                where('userId','==', user?.uid)
            );
        
            const querySnapshot = await getDocs(q);
            const lists = querySnapshot.docs.map(x=>{
                    const {userId, image, like, createdAt, text} = x.data();
                    return {userId, image, like, createdAt, text, id: x.id}
            })
            setUserTweets(lists)
        }
        
    }
    
    const onImgChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        const { files } = e.target;
        if (files && files.length === 1) {
            const storageRef = ref(storage,  `profile/${user.uid}`);
            await uploadBytes(storageRef, files[0]);
            await getUserImg();
        }
    }
    const getUserImg = async () => {
        const user = auth.currentUser;
        const locationRef = `profile/${user.uid}`
        getDownloadURL(ref(storage,locationRef))
            .then((url) => {
                setAvatar(url)
            });
    }

    useEffect(()=>{
        getUserImg();
        fetchTweets();
    },[])

    return <>
        <Form>
            <Header>
                <div className="icon">@</div>
                <h2>프로필 수정</h2>
                <button>저장</button>
            </Header>
            <ProfileImg>
                <label htmlFor="avatar">
                    <img src={avatar || user?.photoURL || ''}/>
                </label>
                <input type="file" id="avatar" onChange={onImgChange}/>
                
            </ProfileImg>
            <InputList>
                <input type="text" placeholder="이름" />
                <textarea placeholder="자기소개"></textarea>
                <input type="text" placeholder="웹사이트" />
            </InputList>

        </Form>
        <hr />
        <TweetList>
            
            {userTweets.map(tweet=><Tweet key={tweet.createdAt} {...tweet}/>)}
        </TweetList>

    </>
}
