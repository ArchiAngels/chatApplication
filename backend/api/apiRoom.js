const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');
const Response = require('../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../scripts/ServerScripts/isAdmin.js');

const api = {
  createPublic:function(req,res){
    return createPublic(req,res);
  },
  createNewRoom:function(req,res){
    return createNewRoom(req,res);
  },
  me:'apiRoom'
}
let timeInMs = 900000;

const TimeExpiresCookies = ()=>{
  return new Date(Date.now() + timeInMs);
}

function WhatNeedToDo (url,options= {isEmpty:true},req,res){
  console.log(`url __${url}__`)
  if(!options.isEmpty){
    if(url === ''){
      res.end();
    }else if(url === api.me){
      res.end();
    }else{
      return api[url](req,res);
    }
  }else{
    res.end();
  }
}

function createPublic(req,res){
  return MongoChanger.initPublicChatCollection().then(value=>{
      res.end(Response.Good({message:"created"}));
    }).catch(reason=>{
      res.end(Response.Bad({message:reason}))
    })
}

function createNewRoom(req,res){
  let responseText = Response.Good({You:'The best',YourDream:"Will come"});
  return res.end(responseText);
}

module.exports = {WhatNeedToDo};