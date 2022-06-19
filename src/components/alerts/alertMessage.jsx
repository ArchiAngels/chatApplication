import React from "react";
import styled from "styled-components";

let Message = styled.h4`
    line-height:30px;
`;



let AlertsBox = styled.div`

    // margin-bottom:50px;
    padding:1rem;
`;

let colorSucces = 'lightgreen';
let colorError = 'lightcoral';

export default function AlertMessage(props){
    let [isDeleted,setDelete] = React.useState(false);
    let {text,isOK,timeExpire} = props.el; 
    let [time,setTime] = React.useState(timeExpire - Date.now());
    let i = props.index;

    if(isDeleted){
        setTimeout(()=>{
            props.delete(i);
        },10)
    }
    setTimeout(()=>{
        if(time <= 0){
            setDelete(true);
        }else{
            setTime(time-10);
        }
    },10);



    return <>
        <AlertsBox>
            <Message 
                onClick={()=>{setDelete(true)}}
                style={{background: isOK ? colorSucces : colorError}}>
                    msg::{ text } <br /> will deleted::{ time } <br /> NUMER OF MESSAGE:{i}
            </Message>                             
        </AlertsBox>
    </>
}