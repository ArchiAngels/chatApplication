import React from "react";
import { Navigate } from "react-router-dom";
import checkCookies from '../scripts/checkCookies.js';
import deleteAllCookies from "../scripts/deleteAllCookies.js";


export default function Auth(props) {
  let [user,setUser] = React.useState({isOK:false});
  let [times,setTimes] = React.useState(5);
  let [isLoading,setLoading] = React.useState(true);
  let step = 510;

  console.log(`Current Try:: ${times}`);
  if(user.redirect){
    console.log(user);
    return EXIT();
  }

  if(user.isOK === true && isLoading){
    setLoading(false);
  }

  if(times <= 0){
    // alert(`No more times ::${times} and you need login again`);
    deleteAllCookies();
    return <>
      <RedirectToAuthorization/>
    </>
  }else{
    let SavedCookies = checkCookies(user,'auth');
    console.log(SavedCookies,document.cookie,SavedCookies === document.cookie);
    // let SavedCookies = {value:{isOK:false}};

    if(!SavedCookies.isOK){
      return <>
        <RedirectToAuthorization/>
        <br/>
        <p>You dont have any cookies</p>
        <p>Your cookies __"{document.cookie}"__</p>
      </>
    }else{
      setTimeout(()=>{
        setUser({...SavedCookies.value});
        setTimes(times - 1);
      },step);  
    }

    
  }

  if(isLoading){
    let points = times % 2 === 0? '.':'...';

    return <>
      <p>loading {points}</p>
    </>
  }  

  function EXIT(){
    console.log(`FORCE redirect to firstContatct`);
    return <Navigate to={'/firstContact'} replace={true} />
  }

  function RedirectToAuthorization(){
    return <>
       <p>Repeat your authorization</p>

        <p
          onClick={
            ()=>{
              setUser({redirect:true})
            }
          }
        >Ok let's do it</p>
    </>
  }

  return <>
    <Navigate to={'/yourProfile' || `/404`} replace={true} />
  </>
  
  
}
  