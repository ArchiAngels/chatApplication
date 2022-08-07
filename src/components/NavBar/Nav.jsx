import React from "react";
import styled from "styled-components";
import IconEye from '../other/iconEye.jsx';

// import CookieChecker from '../other/cookieChecker.jsx';

let ContentWrap = styled.div`
    width:150px;
    height:100vh;
    background-color:#00000040;
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
            <p>welcome to Nav</p>

            <IconEye initialState={isVisible} changeState={setVisible} style={{top:"40%",left:"150px"}}/>
        </ContentWrap>
        
    </>
}


