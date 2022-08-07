import React from "react";
import styled from "styled-components";

let MessContainer = styled.div`

    min-width:40px;
    min-height:20px;
`;

let MessageText = styled.span`
    color:#000;
    margin:0 10px;
    display:inline-block;
    max-width:300px;
    word-wrap: break-word
`;

let MessBorder = styled.div`
    display:block;
    padding:10px;
    border-radius:5px;

    min-width:40px;
    min-height:20px;
    max-width:340px;


    

`;

let TextRight = styled.div`
    margin:10px 0 0 0;
    text-align:right;
`;

let Name = styled.span`
    background-color:#000;
    color:white;
    padding:2px;
    box-sizing:border-box;

`;

export default function message(props){

    const { me, msg, who, time} = props;

    MessBorder = styled(MessBorder)`
        margin-left:${me ? 'auto' : '0px'};
        background:${me ? 'lightcoral' : 'lavender'};
    `;

    function timeLessThatTen(num){
        return num < 10 ? '0'+num:num;
    }
    return <>
        
        <MessContainer>

            <MessBorder>
                <MessageText>{msg}</MessageText>

                <TextRight>

                    <MessageText><Name>{who}</Name></MessageText>

                    <MessageText> {timeLessThatTen(time.h)} : {timeLessThatTen(time.m)}</MessageText>

                </TextRight>
            </MessBorder>

        </MessContainer>
    
    </>
}