import React from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";

import deleteAllCookies from '../scripts/deleteAllCookies.js';
import UpdateCookieTime from "../scripts/UpdateCookieTime.js";
import checkCookiesInterval from '../scripts/checkCookiesInterval.js';

let Name = styled.h2`
    padding:10px;
    background-color:#000;
    color:#fff;
    letter-spacing:1px;
`;

export default function yourProfile(props){

    // console.log('YourProfile')

    let [user,setUser] = React.useState({isOK:false});
    let step = 1000;



    if(user.redirect === true){
        return <>
            <Navigate to="/firstContact" replace={true}/>
        </>
    }
    // console.log(user.isOK,user,'USER');
    React.useEffect(()=>{
        setTimeout(()=>{
    
            // console.log(user.isOK,user,'USER');
            let myOwnCookies = checkCookiesInterval(user,setUser,false,'USER');
            console.warn('get cookies',myOwnCookies)

            if(myOwnCookies.isOK !== user.isOK){
                console.log('have cookies and change state','USER');
                setUser({...myOwnCookies.value});
            }else{
                console.warn('myOwnCookies',myOwnCookies);
                
                user.timeCookies = UpdateCookieTime(parseInt(user.timeCookies) - step).timeCookies;
                setUser({...user});
            }
            
        },step)
    })
    // console.log(user);
    return <>
        <h3>Welcome</h3>
        <Name>{user.nickname}</Name>
        <h3>to your profile!</h3>
        <h4>Log out in {user.timeCookies} ms</h4>

        <p onClick={()=>{
            deleteAllCookies();
            setUser({redirect:true});
        }}>Delete cookies</p>
    </>
}