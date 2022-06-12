import React from "react";
import styled from "styled-components";

import Message from './components/chat/message.jsx';

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

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }

    & > div{
        margin:30px;
    }


`;



const TextArea_custom = styled.textarea`

    width:${w_chat}vw;
    height:${h_chat * 0.1}vh;
    background:#f9f9f9;

    padding:5px 20px 0 20px;

    border:none;
    resize:none;
    transition:background 0.15s;

    &:focus{
        outline:none;
        border:none;
        background:#f1f1f1;
    }

`;


export default function App() {

    let [messages,setMessages] = React.useState([])

    let YourName = 'You';


    function HadleSubmitMessage(e){
        if(e.key == 'Enter'){
            let msg = e.target.value;
            // console.log(msg);
            let newMess = CreateObjMess(msg,YourName,true);
            setMessages([...messages,newMess]);
            e.target.value = '';
        }else{
            return;
        }
    }

    function CreateObjMess(mess,who,MySelf = false){
        let DATE = new Date();
        return {
            msg:mess,
            who:who,
            time:{h:DATE.getHours(),m:DATE.getMinutes()},
            myself:MySelf,
        }
    }

    return <>
        <Wrapper>
            {/* <Title> */}
                <Chat_container>
                    <HistoryOfChat_custom>
                        {messages.map((e,i)=>{
                            return <Message who={e.who} msg={e.msg} time={e.time} myself={e.myself} key={i+'x'}/>
                        })}
                    </HistoryOfChat_custom>
                    <TextArea_custom placeholder='Start messaging' onKeyUp={(e)=>{HadleSubmitMessage(e)}}/>
                </Chat_container>
            {/* </Title> */}
        </Wrapper>
    </>
}
  