require('dotenv').config();
require("core-js");
const path = require('path');
const http = require('http');
const fs = require('fs');
const socket = require('./backend/socket/_mainSocket.js');
const routing = require('./backend/api/handlerRouting.js');
const apiManager = require('./backend/api/_mainApiConstructor.js');

const port = 3030;



let server = http.createServer((req,res)=>{
    let url = req.url;

    if(routing.isApiRoom(url)){
        let apiUrl = url.split('/');
        if(url.includes('?')){
            
            let parametrs = apiUrl[apiUrl.length-1].split('?');
            let objParametrs = {};

            apiUrl = parametrs[0]+'';

            parametrs = parametrs[1].split('&');            

            parametrs.map(e=>{
                let obj = {};
                    e = e.split('=');
                    objParametrs[e[0]] = parseInt(e[1]);
                return obj;
            });

            apiManager.automative('/rooms',apiUrl,{isEmpty:false,...objParametrs},req,res);
        }else{
            apiUrl = apiUrl[apiUrl.length - 1];
            apiManager.automative('/rooms',apiUrl,{isEmpty:false},req,res);
        }
        
        
            // console.log(parametrs,objParametrs);
    
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
                "Set-Cookie",[`CR=public;path=/`]
            );
            res.writeHead(301);
            res.end();
    }
    else {
        
        console.log(req.url);
        if(req.url === '/'){
            let html = fs.readFileSync(path.join(__dirname,'index.html'));
            res.end(html);
        }else{
            res.setHeader(
                "Location",'/'
            );
            res.writeHead(301);
            res.end();
        }

        
    }
})
.listen({port:port},()=>{
    console.log(`\n\n\nserver running on port:${port}\n\n`);
});


socket(server);