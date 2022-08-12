import React from "react";
import { Link } from "react-router-dom"; 
import styled from "styled-components";

const LINKS = [
    {to:"/yourProfile",name:"me"}
];

function handleClick(){
    console.log('clicked');
}

function GetIndexOfCurrentLink(pathname){
    for(let i =0; i < LINKS.length;i++){
        if(LINKS[i].name == pathname){
            return i+1;
        }        
    }
    return -1;
}

let Navigator = styled.nav`
    z-index:5;
    position:relative;

    font-weight:400;

    & > a:not(:nth-child(1)){
        margin-left:20px;
    }

    // & > a:nth-child(${GetIndexOfCurrentLink(window.location.pathname) || 1}){
    //     font-weight:600;
    // }
    & > a:nth-child(1){
        font-weight:600;
    }

`;


let LinkNav = styled.span`
    width:100%;
    padding:10px;
    font-size:18px;
    letter-spacing:2px;
    display:inline-block;
    font-weight:400;
    color:#000;
    &:hover{
        // color:#c25943;
        background:#d4b2ab;
    }
`;



export default function links(){
    return <>
        <Navigator>

           {LINKS.map((e,i)=>{
                return <Link to={e.to} key={i} onClick={handleClick}>
                    <LinkNav>{e.name}</LinkNav>                
                </Link>
           })}

        </Navigator>
    </>
}