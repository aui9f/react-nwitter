import { styled } from "styled-components";
import PostTweetForm from "../components/PostTweetForm";
import Timeline from "../components/Timeline";

const Reporting = styled.div`

`
function Home(){
    return <>
        <PostTweetForm/>
        <Timeline/>
    </>
}
export default Home;