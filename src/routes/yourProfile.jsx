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

let userSize = {
    weight:150,
    height:150
}

let ContentWrapper = styled.div`
    width:70vw;
    height:70vh;
    display:flex;
    justify-content:space-evenly;
    // background-color:#00000070;
    position:relavtive;
    margin-left:15vw;
    margin-top:15vh;
`;

let ContentPart = styled.div`
    width:49%;
    height:100%;
    // background-color:#ffffff30;
    position:relative;
    padding:1rem;
`;

let AvatarWrap = styled.div`
    position:relative;
    &::after{
        
        width:${userSize.weight}px;
        height:${userSize.height}px;
        top:0;
        z-index:5;
        border-radius:50%;
        text-align:center;
        color:#fff;
        box-sizing:border-box;
        padding-top:100px;
        transition:background-color 0.15s;
        left:calc(50% - ${userSize.weight*0.5}px);
        position:absolute;
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
    width:${userSize.weight}px;
    height:${userSize.height}px;
    display:block;
    margin:auto;
`;

let UserWrap = styled.div`
    width:100%;
    text-align:center;
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
    // let randomRoom = parseInt(Math.random()* 999) + 1;

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

    function ButtonAdmin(){
        return <Button onClick={()=>{
                console.log("Create new chat room");
                setModalVisible(!isModalVisible);
            }}>Create New Chat Room
        </Button>
    }

    
    return <>
        

        {isModalVisible ? <ModalWindow isVisible={isModalVisible} changeState = {setModalVisible}/> : ''}

        <ContentWrapper>
            <ContentPart style={{backgroundColor:"#f8c2c287",borderRadius:'1rem'}}>
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

                <Button onClick={()=>{

                    deleteAllCookies();
                    setUser({redirect:true});

                }}>Exit</Button>

                <br/>


                {user.admin ? <ButtonAdmin/> :''}
                
                <br/>
                <Link to={'/chatRoom/public'}>
                    <Button>
                        join to public room
                    </Button>
                </Link>
            </ContentPart>
        </ContentWrapper>
    </>
}