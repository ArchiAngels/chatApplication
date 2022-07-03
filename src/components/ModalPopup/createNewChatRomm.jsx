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

`;

export default function modalWindow(props){

    let [isVisible,setVisible] = React.useState(false || props.isVisible);

    console.log('create new modal ::',isVisible,props.isVisible);

    if(!isVisible){
        return <></>
    }

    function closeModalWindow(){
        setVisible(!isVisible);
        props.setModalVisible(!isVisible);
        console.log(`show or hide ;:${isVisible}`);
    }

    return <>
        <DarkWindow onClick={()=>{
            closeModalWindow();
        }}>
            <p>modalWindow</p>
        </DarkWindow>
        
    </>
}