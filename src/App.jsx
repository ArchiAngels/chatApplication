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



const Chat_container = styled.div`
    width:${w_chat}vw;
    height:${h_chat}vh;
    margin:0vh auto;
    background:#f6f6f6;
    position:relative;

    border-radius:20px;

    overflow:hidden;
`;

const HistoryOfChat_custom = styled.div`
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

export default function App(props) {

    let [messages,setMessages] = React.useState([])

    let YourName = props.nickname || 'You';

    const {Manager} = props;
      
    // WS.on('message', function message(data) {
    //     console.log('received: %s', data);
    // });


    

    

    return <>
        <Wrapper>
            {/* <Title> */}
                <Chat_container>
                    <HistoryOfChat_custom>
                        {messages.map((e,i)=>{
                            return <Message who={e.who} msg={e.msg} time={e.time} me={e.me} key={i+'x'}/>
                        })}
                    </HistoryOfChat_custom>
                        <EnterMessage setMessages = {setMessages} messages = {messages} YourName={YourName} Manager={Manager}/>
                </Chat_container>
            {/* </Title> */}
        </Wrapper>
    </>
}
  