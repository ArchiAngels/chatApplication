import React from "react";
import { Navigate } from "react-router-dom";
import checkCookies from '../scripts/checkCookies.js';


export default function Auth(props) {
  let [user,setUser] = React.useState({isOK:false});
  let [isLoading,setLoading] = React.useState(true);
  let step = 10;

  if(user.isOK === true && isLoading){
    setLoading(false);
  }else{

    let SavedCookies = checkCookies(user,'auth');  

    setTimeout(()=>{
      setUser({...SavedCookies.value});
    },step + 1000);    
  }

  if(isLoading){
    return <>
      <p>loading...</p>
    </>
  }

  return <>
    <Navigate to={'/yourProfile' || `/404`} replace={true} />
  </>
  
  
}
  