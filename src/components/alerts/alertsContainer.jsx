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


    

    function AddStaticVariablesIfNotExisted(index){

        setTimeout(()=>{
            let passedVariables = {...arguments[0]};
            let UpdateExistedMessage = props.messages.splice(index,1)[0];
            console.log(UpdateExistedMessage);

            

            let id = props.messages.length === 0 ? 0 : props.messages[props.messages.length - 1].ID + 1;
            
            
            let idMessage = passedVariables.ID || id;

            console.log(passedVariables.ID,id)
            let statusCodeMessage = passedVariables.isOK || 'neutral';
            let statusDeleteMessage = false;
    
    
            UpdateExistedMessage = {...UpdateExistedMessage,
                isOK : statusCodeMessage,
                isDeleted : statusDeleteMessage,
                ID : idMessage
            };
            props.setMessages([...props.messages,UpdateExistedMessage]);
        },1)
        // isOK:isOK,isDeleted:false,ID:newId
    }



    let nonDeletedMessages = props.messages.filter( element => !element.isDeleted);


    function deleteMessage(id){
        setTimeout(()=>{
            props.messages.splice(id,1);
            props.setMessages([...props.messages]);
        },1)
    }
    function giveMoreTimeBecauseFocused(id,newTime){
        // setTimeout(()=>{
            props.messages[id].timeExpire = newTime;
            props.messages[id].isDeleted = false;
            props.setMessages([...props.messages]);
        // },1)
    }
    function setDelete(id){
        
        setTimeout(()=>{
            console.log('deleted',id);
            props.messages[id].isDeleted = true;
            props.setMessages([...props.messages]);
        },1)
    }

    function setPauseTimeout(id,bool){

        
        let alreadyOnPause = props.messages[id].isPaused.condtition;

        if(alreadyOnPause){

        }else{
            props.messages[id].isPaused = {
                condtition: false,
                startPauseTime:null,
                difference:null,
            };
            
        }

        if(bool && !alreadyOnPause){
            props.messages[id].isPaused.startPauseTime = Date.now();
            props.setMessages([...props.messages]);
        }else{
            props.messages[id].isPaused.difference = Date.now() - props.messages[id].isPaused.startPauseTime;
            giveMoreTimeBecauseFocused(id,props.messages[id].isPaused.difference);
        }

        
        // props.setMessages([...props.messages]);
        
    }
    return <>
        <WrapAlertBox>
            {nonDeletedMessages.map((el,i)=>{
                return <AlertMessage 
                            el={el} 
                            index={i}
                            key ={`${currentTime + i}`} 
                            delete = {deleteMessage} 
                            addTime = {giveMoreTimeBecauseFocused}
                            tryHide = {setDelete}
                            trySetPause = {setPauseTimeout}
                            tryUpdateIfNoStaticVariables = {AddStaticVariablesIfNotExisted}
                        />
            })}   
            
        </WrapAlertBox>
    </>
}