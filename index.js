require('dotenv').config();
require("core-js");
const PATH = require('path');
const apiUser = require('./backend/api/apiUser.js');
const apiRoom = require('./backend/api/apiRoom.js');

const MongoChanger = require('./backend/scripts/mongodb/allMongoControllers.js');
// const WebSocket = require('./backend/scripts/websocket/websocket.js');

const server = require('express');
const app = server();
const port = process.env.PORT || 3030;
const ClientPath = PATH.join(__dirname,'index.html');

app.listen(port,()=>{
    console.log(`\n\n\n\nServer start localhost:${port}`);
});

app.use(server.static(PATH.join(__dirname,'/client')))

app.use('/apiUser',apiUser);
app.use('/apiRoom',apiRoom);

app.get('/chatRoom/:ID',(req,res)=>{
    let url = req.url;
    console.log(url,req.params.ID);
    // if(url === '/'){
    //     return res.redirect('/firstContact');
    // }

    // let html = ClientPath;
    return res
        .cookie('CR',req.params.ID)
        .redirect('/')
    // return res.sendFile(html);
})

app.get('*',(req,res)=>{
    let url = req.url;
    console.log(url);
    // if(url === '/'){
    //     return res.redirect('/firstContact');
    // }

    let html = ClientPath;
    return res.sendFile(html);
})


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