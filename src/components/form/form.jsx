import React from "react";
import styled from "styled-components";

import Send from '../../scripts/loginSender.js';
import InputsValues from '../../scripts/getValuesFormInputs.js';

import Login from "./login.jsx";
import Register from "./register.jsx";

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

let urlLogin = "/api/loginUser";
let urlRegister = "/api/createNewUser";


export default function Form(props){

    let [isLogin,setLogin] = React.useState(true);

    let [isLoading,setLoading] = React.useState(false);

    function HandleSubmit(e){
        e.preventDefault();
    
        let formDatas = e.target.attributes;

        let url = formDatas.action.value;
        let method = formDatas.method.value;
       
        let values = InputsValues(e);
        
        addToStack(method,url,values);
    
        
    }
    
    async function addToStack(method,url,values){
        setLoading(true);
    
        await Send(method, url,values,(xhr)=>{

          console.warn(xhr);


          let value,reason,result,parsedResponse,condition;

          if(xhr.isOK){
            // get answer from server
            parsedResponse = JSON.parse(xhr.value.responseText);
            let bodyAnswer;

            if(parsedResponse.isOK){
              bodyAnswer = parsedResponse.value.body;
              condition = true;
            }else{
              bodyAnswer = parsedResponse.value.why;
              condition = false;
            }
            
            // console.log(parsedResponse)
            let msg = ``;
            for(let item in bodyAnswer){
              msg += `   ${item} -> ${bodyAnswer[item]} `;
            }
            value = msg;

          }else{
            reason = xhr.error || xhr.why || 'Unexpected error';
          }

          result = xhr.isOK ? value : reason;

          setLoading(false);
          props.addMessage(result,condition);   
          
    
        });
    
        
    
    }

    function ChangeFormRegisterLogin(){
        setLogin( !isLogin );
    }

    return <>
         <form method="POST" action={isLogin ? urlLogin : urlRegister} onSubmit={e => {HandleSubmit(e)}}>

            <p onClick={()=>{
                ChangeFormRegisterLogin();
            }}>
                {isLogin ? 'Login' : 'Register'}
            </p>

            {isLogin ? <Login/> : <Register/>}

            <SendButton type="submit" value='Send' disabled={isLoading}/>
        </form>
    </>

}