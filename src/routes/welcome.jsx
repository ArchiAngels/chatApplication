import React from "react";
import styled from "styled-components";


import InputForm from '../components/form/input.jsx';


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
  background:#fff;
  outline:none;

`;


export default function Welcome() {
  // let [answer,setAnswer] = React.useState(false);

  // if(answer === true){
  //   window.location.replace('/chat');
  // }

  function HandleSubmit(e){
    e.preventDefault();
    console.log(e);

    let formChildren = e.target.children;
    let values = [];

    for(let i = 0; i < formChildren.length ; i++){

      let currentElem = formChildren[i];

      if(isInput(currentElem) && i != formChildren.length -1){

        values.push({
          name:currentElem.id,
          value:currentElem.value
        })

      }

    } 

    console.log(values);
  }

  function isInput(element){
    return element.tagName === 'INPUT' ? true : false; 
  }


  
    return <>
      <WrapContent>
        <h1>Nice to see you!</h1>
        <div className="formWrap">
          <form method="POST" action="/api/createNewUser" onSubmit={e => {HandleSubmit(e)}}>
              <InputForm width={200} height ={30} id={'nickname'} labelValue={'Nick name'}/>
              <InputForm width={200} height ={30}id={'password'} labelValue={'Password'}/>

              <SendButton type="submit" value='Send' />
          </form>
        </div>
      </WrapContent>
      
    </>
  }
  