const saveMessage = require('../scripts/mongodb/chatManagment/addMessageToChat.js');
const onLeave = require('./scripts/leave.js').leavePublicRoom;
const askMsg = require('./scripts/getMessages.js').getMessage;

module.exports = function socket(server){
    const { Server } = require("socket.io");

    let usersInRoom = [];

    const io = new Server(server, { 
        cors:{
            "Access-Control-Allow-Origin":"*"
        },
        path:"/ws"
    });

    const myRoom = io.of('/707');

    

    myRoom.on('connection',(socket)=>{
        myRoom.socketsJoin('room1');

        // console.log(socket.rooms,myRoom.rooms);

        socket.on('messageInRomm707',async (data)=>{
            
            let parsed = JSON.parse(data);
            console.log(parsed.time,Object.keys(parsed.time));
            saveMessage('publicChatRoom',parsed.msg,parsed.who,parsed.time).then(value=>{
                console.log(value);
                myRoom.emit('answerForRoom707',data);
            }).catch(err =>{
                console.log(err);
                myRoom.emit('answerForRoom707',`${JSON.stringify({err:err})}`);
            })
            

        })

        socket.on('userConnected',(name)=>{
            let isUserActive = usersInRoom.filter(e => e.name === name);

            if(isUserActive.length === 0){
                usersInRoom.push({name:name,id:socket.id});
                myRoom.emit('freshUserList',usersInRoom);
            }else{

            }
            
            
        })

        socket.on('getUsersList',()=>{
            myRoom.emit('freshUserList',usersInRoom);
        })

        socket.on('disconnect',(reason)=>{
            onLeave(usersInRoom,myRoom,socket.id);
        })

        socket.on('userLeaveRoom',()=>{
            onLeave(usersInRoom,myRoom,socket.id);
        })

        socket.on('getMessages',()=>{
            askMsg(myRoom);
        })


    });
}