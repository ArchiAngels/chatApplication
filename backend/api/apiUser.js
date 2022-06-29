const express = require('express');
const router = express.Router();
const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.post('/createNewUser',(req,res)=>{
  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    chunk = JSON.parse(chunk);
    let result = await MongoChanger.findUserByLogin(chunk.nickname);
    if(result.isOK){
      // create new user
      let new_user = await MongoChanger.createNewUser(chunk.nickname,chunk.password);
      if(new_user.isOK){
        res.json({isOK:true,value:{body:{msg:"Succesfully created"}}});
      }else{
        res.json({isOK:false,value:new_user});
      }
    }else{
      res.json({isOK:false,value:result});
    }
    
  })
  
});


router.post('/loginUser',(req,res)=>{
  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    chunk = JSON.parse(chunk);
    let result = await MongoChanger.findUserByLogin(chunk.nickname);
    if(result.isOK){
      // no find iuser
      res.json({isOK:false,value:{why:{messageAuthor:'no register account'}}});
    }else{
      res.json({isOK:true,value:{body:{messageAuthor:"LOGGED"}}});
    }
  })
  // res.json({isOK:false,value:{why:{messageAuthor:"none inPROGRESS"}}});
});

module.exports = router;