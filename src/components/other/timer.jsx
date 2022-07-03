import React from "react";
import UpdateCookieTime from "../../scripts/UpdateCookieTime.js";
import deleteAllCookies from "../../scripts/deleteAllCookies.js";

export default function Timer(props){

    let [timer,setTimer] = React.useState(props.time || 0);

    let step = 50;

    setTimeout(()=>{
        timer =  UpdateCookieTime(parseInt(timer) - step).timeCookies;
        setTimer(timer);
    },step)

    function addZeroIfIsLessThatTen(num){
        return num  < 10 ? '0' + num: num;
    }

    function secondsDraw(num){
        return addZeroIfIsLessThatTen((num/1000).toFixed(2))
    }

    if(timer <= 0){
        deleteAllCookies();
        return props.exit();
    }

    return <>
        Log out in {secondsDraw(timer)} seconds
    </>
} 