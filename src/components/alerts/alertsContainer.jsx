import React from "react";
import styled from "styled-components";

import AlertMessage from './alertMessage.jsx';

let WrapAlertBox = styled.div`
    width:500px;
    height:150px;
    // display:flex;
    // justify-content:center;
    // flex-direction:column;
    background:#fff;
    position:absolute;
    top:50px;
    left:50px;
`;

export default function AlertsContainer(props){
    // console.log("RENDER ALERT BOX WITH MESSAGES",props.messages.length);
    let currentTime = Date.now();


    function deleteMessage(index){
        props.messages.splice(index,1);
        props.setMessages([...props.messages]);
    }
    return <>
        <WrapAlertBox>
            {props.messages.map((el,i)=>{
                return <AlertMessage el={el} index={i} key ={`${currentTime + i}`} delete = {deleteMessage}/>
            })}   
            
        </WrapAlertBox>
    </>
}