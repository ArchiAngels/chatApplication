import React from "react";
import styled from "styled-components";

import Send from '../scripts/loginSender.js';
import InputsValues from '../scripts/getValuesFormInputs.js';


import InputForm from '../components/form/input.jsx';
import Alerts from '../components/alerts/error.jsx';


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
  border:1px solid #000;
  background:#fff;
  outline:none;
  transition:transform 0.15s;
  &:hover{
    cursor:pointer;
  }
  &:active{
    transform:translateY(10px);
  }

`;

// let ShowPasswordParagraph = styled.p`
//   text-align:center;
//   padding:1rem;
//   display:block;
//   border:1px solid #000;
//   transition:transform 0.15s;
//   &:hover{
//     cursor:pointer
//   }
//   &:active{
//     transform:translateY(10px);
//   }
// `;


export default function Welcome() {

  
  let [messages,setMessages] = React.useState([]);
  let orderStack = [];


  function HandleSubmit(e){
    e.preventDefault();

    let formDatas = e.target.attributes;
    let url = formDatas.action.value;
    let method = formDatas.method.value;

    // console.log(e);

   
    let values = InputsValues(e);

    
    orderStack.push(addToStack(method,values));
    orderStack.shift()();
    // console.log(values);

    // Send(method, url,values,()=>{
    //   console.log('SWEET WORK');
    // });

    
  }

  function addToStack(method,values){
    return ()=>{
      Send(method, "/api/createNewUser",values,(xhr)=>{
        console.warn('SWEET WORK 22',messages.length);
        let parsedResponse = JSON.parse(xhr.responseText);
        // console.log(parsedResponse);
        addErrorToStack(parsedResponse.value.why.why);  
      });
    }
  }
  

  function addErrorToStack(msg){
    let currentTime = Date.now();
    let timeExpires = 10000;
    setMessages([...messages,{text:msg,timeExpire:currentTime + timeExpires}]);
  }


  
    return <>
      <WrapContent>
        <h1>Nice to see you!</h1>
        <div className="formWrap">
          <form method="POST" action="/api/loginUser" onSubmit={e => {HandleSubmit(e)}}>
              <InputForm width={200} height ={30} id={'nickname'} labelValue={'Nick name'} dfv={`archiangels`}/>
              <InputForm width={200} height ={30} id={'password'} labelValue={'Password'} needIconChanger ={true}  dfv={`passwordMe`}/>

              <SendButton type="submit" value='Send' />
          </form>
        </div>
        <Alerts messages={messages} setMessages={setMessages}/>      
      </WrapContent>      
    </>
  }
  