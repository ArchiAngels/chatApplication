import React from "react";
import styled from "styled-components";

// InputForm : props
//  width & height : {number}
//  id = htmlFor : {string}
//  labelValue : {string}
// 
// 
// 
// 



let InputForm = styled.input`
    display:block;
    border:2px solid transparent;
    outline:none;
    transition: border 0.15s;
    margin:1rem;
    border-radius:20px;
    &:focus{
        border:2px solid lightcoral;
    }
    &:hover{
        border:2ps solid pink;
    }

    padding:1rem;
    box-sizing:border-box;
    background:#e0e0e0;
    width: ${props => props.width || 150}px;
    height: ${props => props.height || 50}px;
`;
let LabelForm = styled.label`
    font-size:20px;
    font-weight:bold;
`;

export default function Input(props){

    return <>
        <LabelForm htmlFor={props.id} >{props.labelValue}</LabelForm>
        <InputForm width={props.width} height={props.height} id={props.id}/>
    </>
}