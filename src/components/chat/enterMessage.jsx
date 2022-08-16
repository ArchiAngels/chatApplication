import React from "react";
import styled from "styled-components";


/*
*   enterMessage : props
*       setMessages = setState {React.useState}
*       messages = State [array]
*       YourName = {string}
*/



let w_chat = 60;
let h_chat = 80;

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

export default function enterMessage(props){

    const { Manager,setMessages,YourName,messages } = props;

    const socket = Manager.socket("/707");

    socket.on('answerForRoom707',(message)=>{

        // console.log(message);
        message = JSON.parse(message);
        
        let newMessage = [];

        if(message.who === YourName){
        }else{
            let tempArr = createObjMessage(message.msg,message.who);

            newMessage.push(tempArr);
        }

        setMessages([...messages, ...newMessage]);

        
    })


    function HadleSubmitMessage(e){
        if(e.key == 'Enter'){
            let msg = e.target.value;
            // console.log(msg);
            let newMessage = createObjMessage(msg,YourName,true);           

            // console.log(newMessage.time,Object.keys(newMessage.time));

            setMessages([...messages,newMessage]);

            newMessage = JSON.stringify(newMessage);

            // console.log(newMessage);

            socket.emit("messageInRomm707", newMessage);
            e.target.value = '';
        }else{
            return;
        }
    }

    function createObjMessage(mess,who,me = false){
        let curentTime = new Date();
        return {
            msg:mess,
            who:who,
            time:{
                h:curentTime.getHours(),
                m:curentTime.getMinutes(),
                day:curentTime.getUTCDate(),
                month:curentTime.getMonth(),
                year:curentTime.getFullYear(),
                ms:curentTime.getTime(),
            },
            me:me,
        }
    }
    

    return <>
        <TextArea_custom placeholder='Start messaging' onKeyUp={(e)=>{HadleSubmitMessage(e)}}/>
    </>
}