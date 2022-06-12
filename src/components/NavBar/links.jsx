import React from "react";
import { Link } from "react-router-dom"; 
import styled from "styled-components";

const LINKS = [
    {to:"/expenses",name:"expenses"},
    {to:"/invoices",name:"invoices"},
    {to:"/",name:"home"},
];

function handleClick(){
    console.log('clicked');
}

let height_nav = `50px`;

let Nav_custom = styled.nav`
    width:100vw;
    height:${height_nav};

    box-shadow: 0px 2px 10px #000; 
    z-index:5;
    position:relative;

    font-weight:400;

    & > a:not(:nth-child(1)){
        margin-left:20px;
    }

    // & > a:nth-child(${GetIndexOfCurrentLink(window.location.pathname) || 1}){
    //     font-weight:600;
    // }
    & > a:nth-child( 1){
        font-weight:600;
    }

`;


let Link_custom = styled.span`
    font-size:18px;
    letter-spacing:2px;
    
    line-height:${height_nav};
    height:${height_nav};
    display:inline-block;
    padding:0 5px;
    font-weight:400;
    color:#000;
    &:hover{
        // color:#c25943;
        background:#d4b2ab;
    }
`;

function GetIndexOfCurrentLink(pathname){
    for(let i =0; i < LINKS.length;i++){
        if(LINKS[i].name == pathname){
            return i+1;
        }        
    }
    return -1;
}

export default function links(){
    return <>
        <Nav_custom>

           {LINKS.map((e,i)=>{
                return <Link to={e.to} key={i} onClick={handleClick}>
                    <Link_custom>{e.name}</Link_custom>                
                </Link>
           })}

        </Nav_custom>
    </>
}