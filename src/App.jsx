import React from "react";
import styled from "styled-components";

import Message from './components/chat/message.jsx';
import EnterMessage from './components/chat/enterMessage.jsx';



let w_chat = 60;
let h_chat = 80;

const Wrapper = styled.section`
    width:100vw;
    position:fixed;
    height:100vh;
    padding:${(100 - h_chat) *0.5}vh 0;
    
//   padding: 4em;
  background: papayawhip;
`;



const ChatContainer = styled.div`
    width:${w_chat}vw;
    height:${h_chat}vh;
    margin:0vh auto;
    background:#f6f6f6;
    position:relative;

    border-radius:20px;

    overflow:hidden;
`;

const HistoryChat = styled.div`
    width:${w_chat}vw;
    height:${h_chat * 0.9}vh;
    background:#fff;
    overflow-y:scroll;

    // -ms-overflow-style: none;  /* Internet Explorer 10+ */
    // scrollbar-width: none;  /* Firefox */

    // &::-webkit-scrollbar { 
    //     display: none;  /* Safari and Chrome */
    // }

    & > div{
        margin:30px;
    }


`;

const GetMoreMessages = styled.div`
    width:50px;
    height:50px;
    background-color:#000;
    position:absolute;
`;

export default function App(props) {

    console.log('app drawed')

    
    let [messages,setMessages] = React.useState(props.message || []);
    let [offset,setOffset] = React.useState([5,0]);

    let YourName = props.nickname || 'You';

    const {Manager,ifOnTop} = props;

    

    

    return <>
        <Wrapper>
            <ChatContainer>
            <GetMoreMessages onClick={async ()=>{
                offset[0] += 5;
                offset[1] += 5;
                let result = await ifOnTop(offset[0],offset[1]);
                // console.log("result");
                // console.log(result);
                let newMessages = [...messages,...result];
                    newMessages.sort((a,b)=> a.time.ms - b.time.ms)
                setMessages(newMessages);
                setOffset(offset);
            }}>
                <p>load oldest message</p>
            </GetMoreMessages>
                <HistoryChat>
                    {messages.map((e,i)=>{
                        return <Message who={e.who} msg={e.msg} time={e.time} me={YourName} key={i+'x'}/>
                    })}
                </HistoryChat>
                    <EnterMessage setMessages = {setMessages} messages = {messages} YourName={YourName} Manager={Manager}/>
            </ChatContainer>
        </Wrapper>
    </>
}
  