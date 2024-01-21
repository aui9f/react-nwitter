import { styled } from "styled-components"

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    p{
        color: #aaaaaa;
    }
`

function Loding(){
    return <Wrapper><p>Loding..</p></Wrapper>
}

export default Loding