import React from "react";
import styled from "styled-components";

const TimeSent = styled.div`
    margin:0 auto;
    width:100px;
    height:50px;
    padding:10px;
    background-color:#000;
    border-radius:10px;
    text-align:center;
    & > span{
        line-height:30px;
        color:white;
        letter-spacing:2px;
    }
`;

export default function TimeMessage(props){

    const {day,month,year,paint} = props.date;
    if(!paint){
        return <></>
    }
    return <>
        <TimeSent>
            <span>{zero(day)}/</span>
            <span>{zero(month)}/</span>
            <span>{zero(year)}</span>
        </TimeSent>
    </>
}

function zero(text){
    text = parseInt(text);
    return text < 10 ? `0${text}` : text;
}