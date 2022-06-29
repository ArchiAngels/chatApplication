import React from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";

import deleteAllCookies from '../scripts/deleteAllCookies.js';
import checkCookieInterval from '../scripts/checkCookiesInterval.js';

let Name = styled.h2`
    padding:10px;
    background-color:#000;
    color:#fff;
    letter-spacing:1px;
`;

export default function yourProfile(props){

    let [user,setUser] = React.useState({isOK:false});
    // console.log(user);

    React.useEffect(()=>{
        checkCookieInterval(user,setUser,true);
    })
    // console.log(user);
    return <>
        {user.redirect === true && <Navigate to="/firstContact" replace={true}/>}
        <h3>Welcome</h3>
        <Name>{user.nickname}</Name>
        <h3>to your profile!</h3>

        <p onClick={()=>{
            deleteAllCookies();
            setUser({redirect:true});
        }}>Delete cookies</p>
    </>
}