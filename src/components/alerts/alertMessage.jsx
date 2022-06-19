import React from "react";
import styled from "styled-components";

let Message = styled.h4`
    line-height:30px;
`;



let AlertsBox = styled.div`

    // margin-bottom:50px;
    border:1px solid #000;
    padding:1rem;
`;

let colorSucces = 'lightgreen';
let colorError = 'lightcoral';

export default function AlertMessage(props){
    let {text,isOK,timeExpire} = props.el;

    let i = props.index;

    let now = Date.now();

    // console.log(text,isOK,timeExpire,timeExpire - now);

    let [timeFocused,setTimeFocused] = React.useState(0);
    let [isDeleted,setDelete] = React.useState(false);    
    let [time,setTime] = React.useState(timeExpire);
    let [step,setStep] = React.useState(10);
    
    

    if(isDeleted || timeExpire <= now) {
        return <></>
    }

    setTimeout(()=>{
    
        if(time <= now){
            setDelete(true);
        }
        else{
            setTime(time-step);
        }
        
    },step);
    




    return <>
        <AlertsBox
        
            onClick={()=>{setDelete(true)}}

            onMouseEnter = {()=>{
                setTimeFocused(Date.now());
                setStep(0);
            }}

            onMouseLeave = {()=>{
                let finishFocused = Date.now();
                let newTime = finishFocused - timeFocused + time;
                props.addTime(i,newTime);
                setStep(10);
            }}
        >
            <Message 
                style={{background: isOK ? colorSucces : colorError}}>
                    msg :: { text } <br /> 
                    ms :: { time - now } <br /> 
                    NUMER OF MESSAGE :: {i}
            </Message>                             
        </AlertsBox>
    </>
}