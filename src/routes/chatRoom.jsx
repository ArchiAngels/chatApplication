import React from "react";

import { useParams } from "react-router-dom";

import styled from "styled-components";

import Chat from '../App.jsx';

import EXIT from '../components/other/exit.jsx';

import CheckCookies from '../scripts/checkCookies.js';
// import checkUserCookies from '../scripts/checkUserHaveSomeCookies.js';


let InfoAboutChatRoomContainer = styled.div`
    position:absolute;
    z-index:5;
    rigth:0;
    top:0;
    text-align:right;
    width:100vw;
    box-sizing:border-box;
    padding:1rem;
`;



export default function ChatRoom(props){

    let [user,setUser] = React.useState(3);
    const {socket} = props;

    React.useEffect(()=>{
        if(user <= 0){
            return <EXIT/>
        }else{
            if(user.nickname === undefined){
                let cookies = CheckCookies();
                if(cookies.isOK){
                    setUser(cookies.value);
                }else{
                    setTimeout(()=>{
                        user -= 1;
                        setUser(user);
    
                    },500)
                }
            }
        }
        
    })

    let {id} = useParams();

    return <>
        <InfoAboutChatRoomContainer>

            <p>Current room </p>
            <p>ID :: {id}</p>

        </InfoAboutChatRoomContainer>

        <Chat nickname={user.nickname} socket={socket}/>
    </>
}