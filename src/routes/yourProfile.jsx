import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import deleteAllCookies from '../scripts/deleteAllCookies.js';
import checkCookies from '../scripts/checkCookies.js';
import EXIT from "../components/other/exit.jsx";

import ModalWindow from "../components/ModalPopup/createNewChatRomm.jsx";
import Timer from "../components/other/timer.jsx";
import AdminPanel from '../components/admin/admin.jsx';

import TEST from '../../client/assets/avatar.jpeg';

let ContentWrapper = styled.div`
    width:70vw;
    height:70vh;
    display:flex;
    justify-content:center;
    // background-color:#00000070;
    position:relavtive;
    margin-left:15vw;
    margin-top:15vh;
`;

let ContentPart = styled.div`
    width:50%;
    height:100%;
    // background-color:#ffffff30;
    position:relative;
    padding:0 1rem;
`;

let AvatarWrap = styled.div`
    &::after{
        
        width:200px;
        height:200px;
        top:1rem;
        left:calc(50% - 100px);
        z-index:5;
        border-radius:50%;
        position:absolute;
        text-align:center;
        color:#fff;
        box-sizing:border-box;
        padding-top:100px;
        transition:background-color 0.15s;
    }
    &:hover{
        cursor:pointer;
        &::after{
            content:"change avatar";
            background-color:#00000070;
        }

    }
`;

let AvatarUser = styled.img`
    background-color:#000;
    border-radius:50%;
    width:200px;
    height:200px;
    display:block;
    margin-left:calc(50% - 100px);   
`;

let UserWrap = styled.div`
    width:100%;
    background-color:#f8c2c287;
    text-align:center;
    padding:1rem;
    
    border-radius: 1rem;
`;

let Paragraph = styled.p`
    padding:1rem;
`;

let Button = styled.p`
    margin: 0 0 1rem 0;
    padding:1rem;
    display:inline-block;
    border-radius:1rem;
    color:#fff;
    background-color:rgba(122, 81, 164, 0.53);
    user-select:none;
    &:hover{
        text-decoration:underline;
        cursor:pointer;
    }


`;

export default function yourProfile(props){

    let [user,setUser] = React.useState({isOK:false});
    let [isModalVisible,setModalVisible] = React.useState(false);
    let [serverMessages,setServerMessages] = React.useState([]);
    let randomRoom = parseInt(Math.random()* 999) + 1;


    props.socket.emit('1234','5678');
    props.socket.on('1234',(arg)=>{
        setServerMessages([...serverMessages,arg]);
    })

    if(user.redirect){
        return EXIT();
    }
    else{
        let SavedCookies = checkCookies(user,'USER');

        if(SavedCookies.isOK && !user.isOK){

            setUser({...SavedCookies.value});

        }else if(SavedCookies.isOK && user.isOK){

            // console.log('all is ok');

        }else{
            return EXIT();    
        }
    }

    
    return <>
        

        {isModalVisible ? <ModalWindow isVisible={isModalVisible} changeState = {setModalVisible}/> : ''}

        <ContentWrapper>
            <ContentPart>
                <UserWrap>
                    <AvatarWrap onClick={()=>{
                        console.log("CHANGE AVATAR IN PROGRESS");
                    }}>
                        <AvatarUser alt={user.nickname + ' avatar'} src={TEST ? TEST : ""}></AvatarUser>
                    </AvatarWrap>
                    
                    <Paragraph>{user.nickname}</Paragraph>
                </UserWrap>

                
                {user.admin ? <AdminPanel />:''}

                
            </ContentPart>
            <ContentPart style={{backgroundColor:"#5195a487"}}>
                <Paragraph>
                    Log out in  
                        <Timer time={user.timeCookies} exit = {EXIT}></Timer> 
                     min
                </Paragraph>

                <Button onClick={()=>{

                    deleteAllCookies();
                    setUser({redirect:true});

                }}>Delete cookies</Button>

                <br/>

                <Button onClick={()=>{
                    console.log("Create new chat room");
                    setModalVisible(!isModalVisible);
                }}>Create New Chat Room</Button>

                <Link to={'/chatRoom/'+randomRoom}> join to room {randomRoom}</Link>

                <Paragraph>Message from server:</Paragraph>
                {serverMessages.map((e,i)=>{
                    return <Paragraph key={e+i}>{e}</Paragraph>
                })}
            </ContentPart>
        </ContentWrapper>
    </>
}