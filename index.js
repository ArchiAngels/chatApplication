require('dotenv').config();
require("core-js");
const path = require('path');
const http = require('http');
const fs = require('fs');
const socket = require('./backend/socket/_mainSocket.js');
const routing = require('./backend/api/handlerRouting.js');
const apiManager = require('./backend/api/_mainApiConstructor.js');

const port = process.env.PORT || 3030;



http.createServer((req,res)=>{
    let url = req.url;

    if(routing.isApiRoom(url)){
        let apiUrl = url.split('/');     
            apiUrl = apiUrl[apiUrl.length - 1];
        apiManager.automative('/rooms',apiUrl,{isEmpty:false},req,res);
    }else if(routing.isApiUser(url)){        
        let apiUrl = url.split('/');     
            apiUrl = apiUrl[apiUrl.length - 1];
        apiManager.automative('/users',apiUrl,{isEmpty:false},req,res);
    }
    else if(routing.isPublicDirectory(url)){
        let file = fs.readFileSync(path.join(__dirname,url));
        res.write(file);
        res.end();
    }else if(routing.isChatRoom(url)){
        let id = url.split('/');     
            id = id[id.length - 1];
        
            res.setHeader(
                "Location",'/'
            );
            res.setHeader(
                "Set-Cookie",[`CR=${id};path=/`]
            );
            res.writeHead(301);
            res.end();
    }
    else {
        let html = fs.readFileSync(path.join(__dirname,'index.html'));
        res.write(html);
        res.end();
    }
})
.listen({port:port},()=>{
    console.log(`\n\n\nserver running on port:${port}\n\n`);
});

// socket();