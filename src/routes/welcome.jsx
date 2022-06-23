import React from "react";
import styled from "styled-components";

import Form from "../components/form/form.jsx";

import AlertsContainer from '../components/alerts/alertsContainer.jsx';


let WrapContent = styled.div`
  width:100vw;
  height:100vh;
  overflow:hidden;
  padding:2rem;

  background:#f7e0dd;
  opacity:0.75;
  
  & > h1{
    text-align:center;
  }

  & > .formWrap{
    display:flex;
    padding:2rem;
    justify-content:center;
    & > form{

      background:#fff;
      border-radius:20px;
      padding:1rem;
    }
  }
`;


export default function Welcome() {

  // console.log("RENDER WELCOME");

  
  let [messages,setMessages] = React.useState([]);  

  function addNewMessage(msg,isOK){
    let timeExpires = 5000 + Date.now();
    setMessages([...messages,{text:msg,timeExpire:timeExpires}]);
  }




  
  return <>
    <WrapContent>
      <h1>Nice to see you!</h1>
      <div className="formWrap">
          <Form addMessage = {addNewMessage}/>
      </div>
      <AlertsContainer messages={messages} setMessages={setMessages}/>      
    </WrapContent>      
  </>
  }
  