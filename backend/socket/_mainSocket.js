module.exports = function socket(){
    const { Server } = require("socket.io");

    const io = new Server(8080, { 
        cors:{
            "Access-Control-Allow-Origin":"*"
        }
    });

    const myRoom = io.of('/707');




    // myRoom.to('/707').emit('1234','hello new friend');

    myRoom.on("create-room", (room) => {
        console.log(`room ${room} was created`);
    });

    myRoom.on("join-room", (room, id) => {
        console.log(`socket ${id} has joined room ${room}`);
    });

    myRoom.on('connection',(socket)=>{
        myRoom.socketsJoin('room1');

        console.log(socket.rooms);

        socket.on('messageInRomm707',(data)=>{
            console.log('new message');
            myRoom.emit('answerForRoom707',data);
        })
    });
}