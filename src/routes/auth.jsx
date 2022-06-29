import React from "react";
import { Navigate } from "react-router-dom";
import checkCookiesInterval from '../scripts/checkCookiesInterval.js';


export default function Auth(props) {
  let [user,setUser] = React.useState({isOK:false});
  let [isLoading,setLoading] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(()=>{
      checkCookiesInterval(user,setUser,true);
      if(user.isOK === false){
        setLoading(false);
      }
    },1500)  
  })

  if(isLoading){
    return <>
      <p>loading...</p>
    </>
  }  
  return <>
    {<Navigate to={props.url || `/404`} replace={true} />}    
  </>
  }
  