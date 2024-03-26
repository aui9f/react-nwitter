import styled from "styled-components"

interface IProp{
  label: string
}
const Line = styled.div`
  display: flex;
  align-item: center;
  margin: 40px 0;
  >div{
    border-top: 1px solid;
  }
  p{
    margin: 0 16px;
  }
`

export default function Divider({label}: IProp){
  return <Line>
    <div></div>
    <p>{label}</p>
    <div></div>
  </Line>

}