const ENV = require('dotenv').config();
const PATH = require('path');
const api = require('./backend/Routers/default-web-app.js');

const server = require('express');
const app = server();
const port = process.env.PORT || 3030;

app.listen(port,()=>{
    console.log(`\n\n\n\nServer start localhost:${port}`);
});

app.use(server.static(PATH.join(__dirname,'/client')))

app.get('/api',api);

app.get('*',(req,res)=>{
    let html = PATH.join(__dirname,'index.html');
    res.sendFile(html);
})