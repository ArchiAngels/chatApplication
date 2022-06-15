import React from "react";
import styled from "styled-components";

let WrapAlertBox = styled.div`
    width:500px;
    height:150px;
    display:flex;
    justify-content:center;
    background:#fff;
    position:absolute;
    top:50px;
    left:50px;
`;

let AlertsBox = styled.div`

`;

let Message = styled.h2`
    line-height:150px;
`;

export default function(props){
    let [messages,setMessages] = React.useState([]);
    let currentTime = Date.now();
    // if(messages.indexOf())
    // setMessages([...messages,{text:props.msg,timeExpire:currentTime + 5000}]);
    // props.delete();

    React.useEffect(()=>{
        if(messages.length == 0){
            console.log('no one alerts');
            return 0;
        }

        if(messages[0].timeExpire <= currentTime){
            messages.shift();
            setMessages([...messages]);
        }

    })
    return <>
        <WrapAlertBox>
            <AlertsBox>
                {messages.map((el,i)=>{
                    return <Message key={`mesId${currentTime}`}>msg::{el.text} <br /> will deleted::{el.timeExpire}</Message>
                })}                
            </AlertsBox>
        </WrapAlertBox>
    </>
}