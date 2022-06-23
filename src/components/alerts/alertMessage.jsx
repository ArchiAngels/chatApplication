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
let colorNeutral = 'gold';

export default function AlertMessage(props){

    

    // console.log(`DRAW MESSAGE with props::`);
    // console.log(props.el);
    
    let {text,isOK,timeExpire,ID,isDeleted,tickUpdateMessage} = props.el;
    let i = props.index;


    let ifSomeVaraiblesIsNotWrited = isOK === undefined  || ID === undefined || isDeleted === undefined;
    if(ifSomeVaraiblesIsNotWrited){
        console.log(`isOK::${isOK}\n ID::${ID}n isDeleted::${isDeleted}`);
        return props.tryUpdateIfNoStaticVariables(i,{
            isOK:isOK,
            ID:ID,
            isDeleted:isDeleted,
        })
    }

    

    let now = Date.now();

    // console.log(text,isOK,timeExpire,timeExpire - now);

    // let [timeFocused,setTimeFocused] = React.useState(0);
    let [isDeletedState,setDeleteState] = React.useState(false);    
    let [time,setTime] = React.useState(timeExpire);

    console.log('current Step::',tickUpdateMessage);


    if(isDeletedState || timeExpire <= now) {
        return props.tryHide(ID);
    }

    setTimeout(()=>{
    
        if(time <= now){
            setDeleteState(true);
        }
        else{
            setTime(time-tickUpdateMessage);
        }
        
    },tickUpdateMessage);

    let colorCondition;

    if(isOK === undefined){
        colorCondition = colorNeutral;
    }else if(isOK !== 'neutral'){
        colorCondition = isOK ? colorSucces : colorError;
    }else{
        colorCondition = colorNeutral;
    }

    




    return <>
        <AlertsBox
        
            onClick={()=>{setDeleteState(true)}}

            onMouseEnter = {()=>{
                // setTimeFocused(Date.now());
                // let newTime = time + 30;
                // props.addTime(ID,newTime);
                props.trySetPause(ID,true,0);
            }}

            onMouseLeave = {()=>{
                // let finishFocused = Date.now();
                // let newTime = finishFocused - timeFocused + time + 500;
                // props.addTime(ID,newTime);
                props.trySetPause(ID,false,10);
            }}
        >
            <Message 
                style={{background: colorCondition}}>
                    msg :: { text } <br /> 
                    ms :: { time - now } <br />
                    id of message :: {ID} 
            </Message>                             
        </AlertsBox>
    </>
}