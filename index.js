require('dotenv').config();
require("core-js");
const PATH = require('path');
const apiUser = require('./backend/api/apiUser.js');
const apiRoom = require('./backend/api/apiRoom.js');
const socket = require('./backend/socket/_mainSocket.js');

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


socket();