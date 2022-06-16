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

let Message = styled.h4`
    line-height:30px;
    background:lightcoral;
`;

export default function(props){
    let currentTime = Date.now();
    let TickMS = 500;

    let Tick = setTimeout(() => {
        // checkAlerts();
    }, TickMS);

    function checkAlerts(){
        // console.log('Verifying');
        currentTime = Date.now();

        if(props.messages.length == 0){
            // console.log('no one alerts');
            clearTimeout(Tick);
            return 0;

        }else if(props.messages[0].timeExpire <= currentTime){
            props.messages.shift();
            props.setMessages([...props.messages]);
        }else{
            setTimeout(()=>{
                checkAlerts();
            },TickMS)
        }
    }
    
    function DeleteClickedMessage(event){
        let elementToDelete = event.target;
        let childrenOfThisParent = event.target.parentNode.children;
        let newMessages = [];
        for(let i =0; i < childrenOfThisParent.length;i++){
            if(childrenOfThisParent[i] != elementToDelete){
                newMessages.push(props.messages[i]);
            }
        }
        props.setMessages(newMessages);
        // console.log(event);
    }
    return <>
        <WrapAlertBox>
            <AlertsBox>
                {props.messages.map((el,i)=>{
                    return <Message key={ i + el.text } onClick={(e)=>{DeleteClickedMessage(e)}} >msg::{ el.text } <br /> will deleted::{ el.timeExpire } <br /> NUMER OF MESSAGE:{i}</Message>
                })}                
            </AlertsBox>
        </WrapAlertBox>
    </>
}