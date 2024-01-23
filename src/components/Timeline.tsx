import { 
    db, getDocs, collection, query, orderBy, limit,
    database, doc, onSnapshot, Unsubscribe, deleteDocㄴ
  } from "../fBase";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";


interface ITweet{
    id?: string;
    userId: string;
    image?: string[];
    like: number;
    createdAt: number;
    text: string;
}

export default function Timeline(){
    const [tweets, setTweet] = useState<ITweet[]>([]);

    
    useEffect(()=>{
        const unsubscribe: Unsubscribe | null = null;
        
        const fetchTweets = async () => {
            const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"), limit(10));
            
            const querySnapshot = await getDocs(q);
            const result = querySnapshot.docs.map(x=>{
                const {userId, image, like, createdAt, text} = x.data();
                return {userId, image, like, createdAt, text}
            })
            setTweet(result);
            //실시간
            // unsubscribe = await onSnapshot(q, (doc) => {
            //     const result = doc.docs.map((x)=>{
            //         const {userId, image, like, createdAt, text} = x.data();
            //         return {userId, image, like, createdAt, text, id: x.id}
            //     })
            //     setTweet(result);
            // });
            
        }
        fetchTweets()
        return () => {
            unsubscribe && unsubscribe();
        };
    },[])
    return <>
        <hr/> 
        <ul>
            {/* {tweets.map((tweet: ITweet) => (<li  key={tweet.createdAt}>{tweet.text}</li>))} */}
            {tweets.map((tweet)=><Tweet key={tweet.createdAt} {...tweet}/>)}
        </ul>
        
    </>
}