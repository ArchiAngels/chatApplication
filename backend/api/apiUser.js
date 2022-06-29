const express = require('express');
const router = express.Router();
const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

const TimeExpiresCookies = ()=>{
  return new Date(Date.now() + 10000);
}
router.post('/createNewUser',(req,res)=>{
  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    chunk = JSON.parse(chunk);
    let result = await MongoChanger.findUserByLogin(chunk.nickname,false);
    if(result.isOK){
      // create new user
      let new_user = await MongoChanger.createNewUser(chunk.nickname,chunk.password);
      if(new_user.isOK){
        res
          .status(200)
          .cookie('logged','true',{expires: TimeExpiresCookies()})
          .cookie('nickname',chunk.nickname,{expires: TimeExpiresCookies()})
          .json({isOK:true,value:{body:{msg:"Succesfully created"}}})
      }else{
        res.json({isOK:false,value:new_user});
      }
    }else{
      console.log(result);
      res.json({isOK:false,value:result});
    }
    
  })
  
});


router.post('/loginUser',(req,res)=>{
  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    chunk = JSON.parse(chunk);
    let result = await MongoChanger.findUserByLogin(chunk.nickname,true);
    if(result.isOK){
      // no find iuser
      res.json({isOK:false,value:{why:{messageAuthor:'no register account'}}});
    }else{
      let isPass = await MongoChanger.isPasswordAndLoginMatch(result.why.user,chunk.nickname,chunk.password);
      if(isPass.isOK){

        res
          .status(200)
          .cookie('logged','true',{expires: TimeExpiresCookies()})
          .cookie('nickname',chunk.nickname,{expires: TimeExpiresCookies()})
          .json({isOK:true,value:{body:isPass}});

      }else{
        res.json({isOK:false,value:{why:isPass}});
      }
      
    }
  })
  // res.json({isOK:false,value:{why:{messageAuthor:"none inPROGRESS"}}});
});

module.exports = router;