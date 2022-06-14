require('dotenv').config();
const PATH = require('path');
const api = require('./backend/api/apiUser.js');

const server = require('express');
const app = server();
const port = process.env.PORT || 3030;

app.listen(port,()=>{
    console.log(`\n\n\n\nServer start localhost:${port}`);
});

app.use(server.static(PATH.join(__dirname,'/client')))

app.use('/api',api);

app.get('*',(req,res)=>{
    let url = req.url;
    if(url === '/'){
        return res.redirect('/firstContact');
    }

    let html = PATH.join(__dirname,'index.html');
    return res.sendFile(html);
})