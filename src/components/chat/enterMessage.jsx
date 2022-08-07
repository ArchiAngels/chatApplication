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

    const {socket} = props;


    function HadleSubmitMessage(e){
        if(e.key == 'Enter'){
            let msg = e.target.value;
            // console.log(msg);
            let newMess = CreateObjMess(msg,props.YourName,true);
            // setMessages([...messages,newMess]);
            // props.WS.on('open', function open() {
                
            // });

            props.setMessages([...props.messages,newMess]);
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
        <TextArea_custom placeholder='Start messaging' onKeyUp={(e)=>{HadleSubmitMessage(e)}}/>
    </>
}