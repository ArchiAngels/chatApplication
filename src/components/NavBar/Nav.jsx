import React from "react";
import styled from "styled-components";
import IconEye from '../other/iconEye.jsx';
import Links from './links.jsx';

// import CookieChecker from '../other/cookieChecker.jsx';

let ContentWrap = styled.div`
    width:150px;
    height:100vh;
    background-color:#ffffffa8;
    text-align:center;
    position:absolute;
    top:0;
    left:0;
    z-index:6;
    transition:left 0.15s;

`;

export default function Nav(props){
    let [isVisible,setVisible] = React.useState(false);
    

    // console.log("NAV DRAWED",isVisible); 

    

    return <>
        <ContentWrap style={{left: isVisible? "0":"-150px"}}>

            <Links Manager={props.Manager}/>

            <IconEye initialState={isVisible} changeState={setVisible} style={{top:"0",left:"150px",width:'40px',height:'40px'}} />
            
        </ContentWrap>
        
    </>
}


