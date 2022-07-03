import React from "react";
import styled from "styled-components";

let DarkWindow = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    background-color:#00000060;
    color:#fff;
    top:0;
    left:0;
    text-align:center;
    position:absolute;
    z-index:6;

`;

export default function modalWindow(props){

    console.log('create new modal ::',props.isVisible);

    if(!props.isVisible){
        return <></>
    }

    function closeModalWindow(){
        props.changeState(!props.isVisible);
        console.log(`show or hide ;:${!props.isVisible}`);
    }

    return <>
        <DarkWindow onClick={()=>{
            closeModalWindow();
        }}>
            <p>modalWindow</p>
        </DarkWindow>
        
    </>
}