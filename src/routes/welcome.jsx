import React from "react";
import styled from "styled-components";

import Form from "../components/form/form.jsx";
import { Navigate } from "react-router-dom";

import AlertsContainer from '../components/alerts/alertsContainer.jsx';
import checkUserHaveSomeCookies from '../scripts/checkUserHaveSomeCookies.js';



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
  let [messages,setMessages] = React.useState([]);  

  function addNewMessage(msg,isOK){
    let timeExpires = 5000 + Date.now();
    setMessages([...messages,{text:msg,timeExpire:timeExpires,isOK:isOK}]);
  }

  if(checkUserHaveSomeCookies().isOK){
    return <>
      <Navigate to='/auth' replace={true}/>
    </>
  }
  
  return <>
    <WrapContent>
      <h1>Nice to see you!</h1>
      <div className="formWrap">
          <Form addMessage = {addNewMessage}/>
      </div>
      <AlertsContainer messages={messages} setMessages={setMessages} />      
    </WrapContent>      
  </>
  }
  