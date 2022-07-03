import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

// import deleteAllCookies from '../../scripts/deleteAllCookies.js';
import EXIT from "../other/exit.jsx";
import checkCookies from '../../scripts/checkCookies.js';
import IconEye from '../other/iconEye.jsx';

let ContentWrap = styled.div`
    width:150px;
    height:100vh;
    background-color:#00000040;
    text-align:center;
    position:absolute;
    top:0;
    left:0;
    z-index:6;
    transition:left 0.15s;

`;

export default function Nav(props){

    // console.log("NAV DRAWED");    
    let step = 1000;
    let timeConstant = 60000;
    let location = useLocation();
    let [timer,setTimer] = React.useState({time:timeConstant,redirect:false});
    let [isVisible,setVisible] = React.useState(true);
    let isFirstContact = location.pathname === '/firstContact';
    let isAuth = location.pathname === '/auth';

    if(isAuth || isFirstContact){
        // console.log("SKIP");
    }else{
        callMySetTimeout();
    }

    
    

    if(isFirstContact && timer.redirect){
        setTimer({...timer,time:timeConstant,redirect:false});
    }else if(timer.redirect){
        return EXIT();
    }else{
        // console.log('nothing',timer.time);
        
    }
        
    
    

    function CheckAndRedirectCookies(){

        if(isFirstContact){
            // console.log("nothing FC");
        }else{
            let SavedCookies = checkCookies({isOK:true});

            console.warn(SavedCookies);

            if(!SavedCookies.isOK){
                // console.log('REDIRECT')
                setTimer({redirect:true});
            }else{
                // console.log('NextTIme',SavedCookies);     
                setTimer({...timer,time:timeConstant});           
            }
        }        
        
    }

    function callMySetTimeout(){
        return setTimeout(()=>{
            // console.log('timer tic tac',timer);
            if(timer.time <= 0){
                CheckAndRedirectCookies();          
            }else{            
                setTimer({...timer,time:timer.time - step});
            }
            
        },step);
    }


    return <>
        <ContentWrap style={{left: isVisible? "0":"-150px"}}>
            <p>welcome to Nav</p>

            <IconEye initialState={isVisible} changeState={setVisible} style={{top:"40%",left:"150px"}}/>
        </ContentWrap>
        
    </>
}


