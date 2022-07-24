const express = require('express');
const router = express.Router();
const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');
const Response = require('../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../scripts/ServerScripts/isAdmin.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

let timeInMs = 30 * 60 * 1000 ;

// let timeInMs = 10*1000 ;

const TimeExpiresCookies = ()=>{
  return new Date(Date.now() + timeInMs);
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
          .cookie('logged','true')
          .cookie('nickname',chunk.nickname)
          .cookie('timeCookies',timeInMs)
          .json(Response.Good({msg:"Succesfully created"}))
          // .json({isOK:true,value:{body:{}})
      }else{
        res.json(Response.Bad(new_user))
        // res.json({isOK:false,value:new_user});
      }
    }else{
      console.log(result);
      res.json(Response.Bad(result))
      // res.json({isOK:false,value:result});
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
        if(isAdmin(chunk.nickname).isOK){
          return res
          .status(200)
          .cookie('logged','true')
          .cookie('nickname',chunk.nickname)
          .cookie('admin','YesButNeedToVerify')
          .cookie('timeCookies',timeInMs)
          .json(Response.Good(isPass))
          // .json({isOK:true,value:{body:isPass}});
        }
        return res
          .status(200)
          .cookie('logged','true')
          .cookie('nickname',chunk.nickname)
          .cookie('timeCookies',timeInMs)
          .json(Response.Good(isPass))
          // .json({isOK:true,value:{body:isPass}});

      }else{
        res.json(Response.Bad({why:isPass}))
        // res.json({isOK:false,value:{why:isPass}});
      }
      
    }
  })
  // res.json({isOK:false,value:{why:{messageAuthor:"none inPROGRESS"}}});
});

module.exports = router;