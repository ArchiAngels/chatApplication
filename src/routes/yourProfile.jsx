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
    let step = 50;

    if(user.redirect){
        return EXIT();
    }
    else{
        let SavedCookies = checkCookies(user,'USER');

        if(SavedCookies.isOK && !user.isOK){

            setUser({...SavedCookies.value});

        }else if(SavedCookies.isOK && user.isOK){
            
                

            setTimeout(()=>{
                user.timeCookies = UpdateCookieTime(parseInt(user.timeCookies) - step).timeCookies;

                SavedCookies = checkCookies(user,'USER');
                // console.log('need update');
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

    function addZeroIfIsLessThatTen(num){
        return num  < 10 ? '0' + num: num;
    }
    return <>
        <h3>Welcome</h3>
        <Name>{user.nickname}</Name>
        {user.admin ? <h5>{user.admin}</h5>:''}
        
        <h3>to your profile!</h3>
        <h4>Log out in {(user.timeCookies/1000).toFixed(2)} seconds</h4>

        <p onClick={()=>{
            deleteAllCookies();
            setUser({redirect:true});
        }}>Delete cookies</p>
    </>
}