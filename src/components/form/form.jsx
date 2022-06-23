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
let urlRegister = "/api/loginUser";


export default function Form(props){

    let [isLogin,setLogin] = React.useState(true);

    let [isLoading,setLoading] = React.useState(false);

    function HandleSubmit(e){
        e.preventDefault();
    
        let formDatas = e.target.attributes;

        let url = formDatas.action.value;
        let method = formDatas.method.value;
       
        let values = InputsValues(e);
        
        addToStack(method,values);
    
        
    }
    
    async function addToStack(method,values){
        setLoading(true);
    
        let request = await Send(method, "/api/createNewUser",values,(xhr)=>{
    
          let parsedResponse = JSON.parse(xhr.responseText);
          console.log('parsedResponse',parsedResponse);
    
          let condition = Math.random() > 0.5? true: false;
    
          // let condition = parsedResponse.value.isOK;
          let value,reason,result;
    
          if(condition){
            value = `id: ${parsedResponse.value.body.idUser} \n TYPE: ${parsedResponse.value.body.TYPE}`;
          }else{
            reason = parsedResponse.value.why || 'Not expected error';
          }
    
          result = condition ? value : reason;
    
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