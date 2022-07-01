import React from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";

import deleteAllCookies from '../scripts/deleteAllCookies.js';
import UpdateCookieTime from "../scripts/UpdateCookieTime.js";
import checkCookies from '../scripts/checkCookies.js';

let Name = styled.h2`
    padding:10px;
    background-color:#000;
    color:#fff;
    letter-spacing:1px;
`;

export default function yourProfile(props){

    let [user,setUser] = React.useState({isOK:false});
    let step = 15;

    if(user.redirect){
        return EXIT();
    }
    else{
        let SavedCookies = checkCookies(user,'USER');

        if(SavedCookies.isOK && !user.isOK){

            setUser({...SavedCookies.value});

        }else if(SavedCookies.isOK && user.isOK){

            user.timeCookies = UpdateCookieTime(parseInt(user.timeCookies) - step).timeCookies;

            SavedCookies = checkCookies(user,'USER');

            setTimeout(()=>{
                setUser({...SavedCookies.value,timeCookies:user.timeCookies});
            },step);

        }else{
            return EXIT();    
        }
    }
    
    function EXIT(){
        return <>
            <Navigate to='/firstContact' replace={true}/>
        </>
    }

    function addExtraTime(num){
        user.timeCookies = UpdateCookieTime(parseInt(user.timeCookies) + num).timeCookies;
        setTimeout(()=>{
            setUser({...user,timeCookies:user.timeCookies});
        },step);
    }

    return <>
        <h3>Welcome</h3>
        <Name>{user.nickname}</Name>
        <h3>to your profile!</h3>
        <h4>Log out in {user.timeCookies} ms</h4>

        <p onClick={()=>{
            deleteAllCookies();
            setUser({redirect:true});
        }}>Delete cookies</p>

        <p onClick={()=>{
            addExtraTime(10000);
        }}>
            add time +10 sec
        </p>
    </>
}