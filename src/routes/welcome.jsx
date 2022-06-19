import React from "react";
import styled from "styled-components";

import Send from '../scripts/loginSender.js';
import InputsValues from '../scripts/getValuesFormInputs.js';


import InputForm from '../components/form/input.jsx';
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

let SendButton = styled.input`
  width:100px;
  height:50px;
  padding:1rem;
  border-radius:10px;
  border:1px solid transparent;
  background:#fff;
  outline:none;
  transition:transform 0.15s;
 
  &:disabled{
    // background:#00000055;
    cursor:not-allowed;
    border:1px dashed #000;
  }
  &:not([disabled]){
    border:1px solid #000;
    &:hover{
      cursor:pointer;
    }
    &:active{
      transform:translateY(10px);
    }
  }

`;


export default function Welcome() {

  // console.log("RENDER WELCOME");

  
  let [messages,setMessages] = React.useState([]);
  let [isLoading,setLoading] = React.useState(false);


  function HandleSubmit(e){
    e.preventDefault();

    let formDatas = e.target.attributes;
    let url = formDatas.action.value;
    let method = formDatas.method.value;
   
    let values = InputsValues(e);
    
    addToStack(method,values);

    
  }

  function addToStack(method,values){
    setLoading(true);

    Send(method, "/api/createNewUser",values,(xhr)=>{

      let parsedResponse = JSON.parse(xhr.responseText);
      console.log('parsedResponse',parsedResponse);

      // let condition = Math.random() > 0.5? true: false;

      let condition = parsedResponse.value.isOK;
      let value,reason,result;

      if(condition){
        value = `id: ${parsedResponse.value.body.idUser} \n TYPE: ${parsedResponse.value.body.TYPE}`;
      }else{
        reason = parsedResponse.value.why;
      }

      result = condition ? value : reason;

      setLoading(false);
      addErrorToStack(result,condition);
    });

    

  }
  

  function addErrorToStack(msg,isOK){
    let currentTime = Date.now();
    let timeExpires = 5000;
    setMessages([...messages,{text:msg,timeExpire:currentTime + timeExpires,isOK:isOK}]);
  }


  
    return <>
      <WrapContent>
        <h1>Nice to see you!</h1>
        <div className="formWrap">
          <form method="POST" action="/api/loginUser" onSubmit={e => {HandleSubmit(e)}}>
              <InputForm width={200} height ={30} id={'nickname'} labelValue={'Nick name'} dfv={`archiangels`}/>
              <InputForm width={200} height ={30} id={'password'} labelValue={'Password'} needIconChanger ={true}  dfv={`passwordMe`}/>

              <SendButton type="submit" value='Send' disabled={isLoading}/>
          </form>
        </div>
        <AlertsContainer messages={messages} setMessages={setMessages}/>      
      </WrapContent>      
    </>
  }
  