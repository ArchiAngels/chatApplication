require('dotenv').config();
require("core-js");
const path = require('path');
const http = require('http');
const fs = require('fs');

const apiUser = require('./backend/api/apiUser.js');
const apiRoom = require('./backend/api/apiRoom.js');
const socket = require('./backend/socket/_mainSocket.js');
const routing = require('./backend/api/handlerRouting.js');

// const server = require('express');
// const app = server();
const port = process.env.PORT || 3030;
const clientPath = path.join(__dirname,'index.html');

const apiUserTrue = require('./backend/api/apiUser.js');

http.createServer((req,res)=>{
    let url = req.url;
    console.log(url);
    if(routing.isApiRoom(url)){

    }else if(routing.isApiUser(url)){        
        let match = url.split('/');     
        apiUserTrue.WhatNeedToDo(match[match.length - 1],{isEmpty:false},req,res);
        // res.write('ididnahui');
        // res.end();

    }else if(routing.isPublicDirectory(url)){
        let file = fs.readFileSync(path.join(__dirname,url));
        res.write(file);
        res.end();
    }else {
        let html = fs.readFileSync(path.join(__dirname,'index.html'));
        res.write(html);
        res.end();
    }
}).listen(5000);

// app.listen(port,()=>{
//     console.log(`\n\n\n\nServer start localhost:${port}`);
// });

// app.use(server.static(path.join(__dirname,'/client')))



// app.get('/chatRoom/:ID',(req,res)=>{
//     let url = req.url;
//     console.log(url,req.params.ID);
//     // if(url === '/'){
//     //     return res.redirect('/firstContact');
//     // }

//     // let html = ClientPath;
//     return res
//         .cookie('CR',req.params.ID)
//         .redirect('/')
//     // return res.sendFile(html);
// })

// app.get('*',(req,res)=>{
//     console.log("CATCHE HER in * ");
//     let url = req.url;
//     console.log(url);
//     // if(url === '/'){
//     //     return res.redirect('/firstContact');
//     // }

//     let html = clientPath;
//     return res.sendFile(html);
// })

// app.use('/apiUser',apiUser);
// app.use('/apiRoom',apiRoom);

// socket();