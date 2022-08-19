import React from "react";

import { useParams } from "react-router-dom";

import styled from "styled-components";

import Chat from '../App.jsx';

import EXIT from '../components/other/exit.jsx';

import CheckCookies from '../scripts/checkCookies.js';

const getMessageList = require('../scripts/getMessages.js');


let InfoAboutChatRoomContainer = styled.div`
    position:absolute;
    z-index:5;
    right:0;
    top:0;
    text-align:right;
    width:100vw;
    box-sizing:border-box;
    padding:1rem;
    & > div{
        position:absolute;
        z-index:5;
        right:10px;
    }
`;

let UserContainer = styled.div`
    

    & > p{
        padding:10px;
        border-radius:5px;
        background-color:#000;
        margin:10px 0;
        color:#fff;
    }
`;



export default function ChatRoom(props){

    console.log('chatroom drawed');

    let [user,setUser] = React.useState(3);
    let [userList,setUserList] = React.useState([]);
    let [listMessages,setlistMessages] = React.useState(false);
    const {Manager} = props;

    let socket = Manager.socket('/707');

    let YourName = user.nickname || -1;
    let userExistOnList = -2;

    function getHistory(howMuch = 0,skip = 0){
        let result = getMessageList('GET',`../apiRoom/getMessages?limit=${howMuch}&skip=${skip}`).then(v=>{
            // console.log(v);
            v = JSON.parse(v.value);
            v = v.sort((a,b)=> a.time.ms - b.time.ms);
            console.log(v);
            return v || [];
        }).catch(e=>{
            // console.log(e)
        })

        return result;
    }

    if(YourName !== -1 && userList.length === 0){
        socket.emit('getUsersList');
        // socket.emit('getMessages');
    }

    

    socket.on('freshUserList',(freshUserList)=>{
        userExistOnList = freshUserList.filter(e => e.name === YourName);

        let onlyUserNames = freshUserList.map(e => {
            return e.name;
        })

        // console.log(userList,userExistOnList,YourName);

        if(userExistOnList.length === 0 && YourName !== -1){
            socket.emit('userConnected',YourName);

            

            onlyUserNames.push(YourName);
            userList = onlyUserNames;
            setUserList(userList);
        }else if(userExistOnList.length !== 0 && YourName !== -1){
            
            setUserList(onlyUserNames);
        }else{
            console.log("err exist",YourName);
        }
    })

    React.useEffect(()=>{
        if(user <= 0){
            return <EXIT/>
        }else{
            if(user.nickname === undefined){
                let cookies = CheckCookies();
                if(cookies.isOK){
                    setUser(cookies.value);
                    getData();
                    async function getData(){
                        let result = await getHistory(5,0);
                        // console.log(result);
                        setlistMessages(result);
                    }

                    
                }else{
                    setTimeout(()=>{
                        user -= 1;
                        setUser(user);
    
                    },500)
                }
            }
        }
        
    })

    let {id} = useParams();

    return <>
        <InfoAboutChatRoomContainer>

            <p>Current room </p>
            <p>ID :: {id}</p>


            <UserContainer>
                {userList.map( e =>{
                    return <p key={e}>{e}</p>
                })}
            </UserContainer>

        </InfoAboutChatRoomContainer>

       {listMessages === false? '':  <Chat nickname={user.nickname} Manager={Manager} message={listMessages} ifOnTop={getHistory}/>}
    </>
}