import React from "react";
import { Navigate } from "react-router-dom";
import checkCookiesInterval from '../scripts/checkCookiesInterval.js';


export default function Auth(props) {
  let [user,setUser] = React.useState({isOK:false});
  let [isLoading,setLoading] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(()=>{
      // console.log(user,'auth');
      
      if(user.isOK === true){
        // console.log(user,'auth');
        setLoading(false);
      }else{
        let myOwnCookies = checkCookiesInterval(user,setUser,false,'auth');
        console.log(myOwnCookies);
        if(myOwnCookies.isOK){
          // console.log('have cookies and change state');
          setUser({...myOwnCookies.value})
        }else{
          setUser({...user});
        }
        
      }
      
      
    },1500)  
  })

  if(isLoading){
    return <>
      <p>loading...</p>
    </>
  }  
  return <>
    {<Navigate to={'/yourProfile' || `/404`} replace={true} />}    
  </>
  }
  