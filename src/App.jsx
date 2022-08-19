import React from "react";
import styled from "styled-components";

import Message from './components/chat/message.jsx';
import EnterMessage from './components/chat/enterMessage.jsx';
import {PopUp,swap} from './components/chat/popUp.jsx';



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


export default function App(props) {

    console.log('app drawed')

    
    let [messages,setMessages] = React.useState(props.message || []);
    let [offset,setOffset] = React.useState([5,0]);
    let histroyMessRef = React.useRef(null);
    let downLoadMess = React.createRef();
    let newMessage = React.createRef();

    let YourName = props.nickname || 'You';
    let loading = false;

    const {Manager,ifOnTop} = props;


    React.useEffect(()=>{

        if(offset[0] === 5){
            histroyMessRef.current.scrollBy(0,histroyMessRef.current.offsetHeight);
        }
        // swap(loading);
        swap(downLoadMess,loading,'0%','-100%');
        swap(newMessage,false,'100%','-100%')
        if(histroyMessRef.current.scrollTop >= histroyMessRef.current.scrollTopMax -20){
            hideNewMess();
        }
        // swapDownLoadmess();
        
    })

    function hideNewMess(){
        setTimeout(()=>{
            swap(newMessage,true,'200%','-100%')
        },500)
    }


    function handleScroll(e){
        let offsetTop = e.target.scrollTop;
        let maxOffset = e.target.scrollTopMax;
        // console.log(offsetTop);

        if(offsetTop === 0 && !loading){
            loadAndPasteOldestMessages();
            loading = true;
            // swapDownLoadmess();
            swap(downLoadMess,loading,'0%','-100%');
        }

        if(offsetTop >= maxOffset - 20){
            hideNewMess();
        }

    }

    

    async function loadAndPasteOldestMessages(){
        console.log('Load old mes');
        offset[0] += 5;
        offset[1] += 5;
        let result = await ifOnTop(offset[0],offset[1]);
        let newMessages = [...messages,...result];
            newMessages.sort((a,b)=> a.time.ms - b.time.ms)
        setMessages(newMessages);
        setOffset(offset);
    }

    

    

    return <>
        <Wrapper>
            <ChatContainer>
                <PopUp text={'load oldest messages'} ref={downLoadMess}/>

                <HistoryChat onScroll={handleScroll} ref={histroyMessRef}>
                    {messages.map((e,i)=>{
                        return <Message who={e.who} msg={e.msg} time={e.time} me={YourName} key={i+'x'}/>
                    })}
                </HistoryChat>

                <PopUp text={'you have new message'} ref={newMessage}/>

                <EnterMessage setMessages = {setMessages} messages = {messages} YourName={YourName} Manager={Manager}/>
            </ChatContainer>
        </Wrapper>
        
    </>
}
  