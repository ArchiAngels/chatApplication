import React from "react";
import styled from "styled-components";

import DefaultEyeHidden from '../../../client/assets/svg/hidden.svg';
import DefaultEyeShowed from '../../../client/assets/svg/showed.svg';

let WrapIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    // border:1px solid #000;
    position:absolute;
    display:flex;
    justify-content:center;
    background:#fff;
    transition:transform 0.15s;
    &:hover{
        cursor:pointer;
    }
    &:active{
        transform:translateY(10px);
    }
`;

export default function IconChanger(props){

    let [isVisible,setVisible] = React.useState(props.initialState ?? true);

    function HandleClick(){
        setVisible(!isVisible);
        props.changeState(!isVisible);
    }

    return <>
        <WrapIcon onClick = {HandleClick} style={{...props.style}}>
            <img alt="eye icon" src={isVisible ? DefaultEyeHidden : DefaultEyeShowed}/>
        </WrapIcon>
        
    </>
}