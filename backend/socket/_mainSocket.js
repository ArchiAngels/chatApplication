module.exports = function socket(){
    const { Server } = require("socket.io");

    let usersInRoom = [];

    const io = new Server(8080, { 
        cors:{
            "Access-Control-Allow-Origin":"*"
        }
    });

    const myRoom = io.of('/707');

    

    myRoom.on('connection',(socket)=>{
        myRoom.socketsJoin('room1');

        console.log(socket.rooms);

        socket.on('messageInRomm707',(data)=>{
            myRoom.emit('answerForRoom707',data);
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
            let activeUsers = usersInRoom.filter(e => e.id !== socket.id);
            usersInRoom = activeUsers;
            myRoom.emit('freshUserList',usersInRoom);
        })


    });

    // myRoom.on('disconection')

    setInterval(()=>{
        console.log(usersInRoom,'\n');
    },1000);
}