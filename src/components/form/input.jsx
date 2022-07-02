import React from "react";
import styled from "styled-components";

// InputForm : props
//  width & height : {number}
//  id = htmlFor : {string}
//  labelValue : {string}
//  type : {string} default 'text' DEPRECATED
//  needIconChanger : {bool} default 'false' - add svg icons to change {type} of input
// 
// 

import Hidden from '../../../client/assets/svg/hidden.svg';
import Showed from '../../../client/assets/svg/showed.svg';


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

let WrapIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    // border:1px solid #000;
    position:absolute;
    display:flex;
    justify-content:center;
    margin-top:-3rem;
    margin-left:17rem;
    background:#fff;
    transition:transform 0.15s;
    &:hover{
        cursor:pointer;
    }
    &:active{
        transform:translateY(10px);
    }
`;

function IconChanger(props){

    return <>
        <WrapIcon onClick = {()=>{props.change(!props.currentIcon)}}>
            <img alt="eye icon" src={props.currentIcon ? Hidden: Showed} />
        </WrapIcon>
        
    </>
}

export default function Input(props){

    let [isVisible,setVisible] = React.useState(false);

    props.needIconChanger ? props.needIconChanger : false;

    let conditionTypeInput = props.needIconChanger 
                                ? isVisible 
                                    ? 'text' : 'password'
                                : 'text';

    return <>
        <LabelForm htmlFor={props.id} >{props.labelValue}</LabelForm>

        <InputForm 
         width={props.width}
         height={props.height} 
         id={props.id} 
         type={conditionTypeInput} 
         defaultValue={props.dfv}
         autoComplete='off'
        />
        
        {props.needIconChanger ? <IconChanger change={setVisible} currentIcon={isVisible}/> :""}
    </>
}