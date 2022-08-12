const express = require('express');
const router = express.Router();
const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');
const Response = require('../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../scripts/ServerScripts/isAdmin.js');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

let timeInMs = 900000;

const TimeExpiresCookies = ()=>{
  return new Date(Date.now() + timeInMs);
}

router.post('/createNewRoom',(req,res)=>{
    res.json(Response.Good({You:'The best',YourDream:"Will come"}))
    // res.json({isOK:true,body})
})

router.post('/createPublic',(req,res)=>{
  console.log("CATCHE HER in apiRooms ");
  MongoChanger.initPublicChatCollection().then(value=>{
    res.json(Response.Good({message:"created"}));
  }).catch(reason=>{
    res.json(Response.Bad({message:reason}))
  })
  // res.json({isOK:true,body})
})

module.exports = router;