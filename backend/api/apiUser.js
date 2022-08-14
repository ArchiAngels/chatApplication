const sendResponse = require('../scripts/ServerScripts/AllRespnonsesController.js');

const me = 'apiUser';

const apiConstructor = require('./_mainApiConstructor.js');

let apiMethods = apiConstructor.getMethods('/users');


async function WhatNeedToDo(url,options = {isEmpty:true},req,res){
  if(!options.isEmpty){
    if(url === '' || url === me){
      res.end('Bad url');
    }
    else{
      return apiConstructor.apiConstructor(url,apiMethods,req,res).catch(err=>{
        console.log(err);
        let text = sendResponse.Bad({why:{message:err}});
        res.end(text);
      });
    }
  }else{
    res.end();
  }  
}

module.exports = {WhatNeedToDo};

