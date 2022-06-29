const express = require('express');
const router = express.Router();
const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.post('/createNewUser',(req,res)=>{
  let result;
  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    chunk = JSON.parse(chunk);
    let result = await MongoChanger.findUserByLogin(chunk.nickname);
    // result = await MongoChanger.createNewUser(chunk.nickname);
    res.json({isOK:true,value:result});
  })
  
});


router.post('/loginUser',(req,res)=>{
  req.on('data',(chunk)=>{
    console.log(chunk+'');
  })
  res.json({isOK:false,value:{body:{messageAuthor:"none inPROGRESS"}}});
});

module.exports = router;