const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');
const Response = require('../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../scripts/ServerScripts/isAdmin.js');

const rulesCookies = ";Path=/;SameSite=Lax;Secure";

const api = {
  loginUser:function(req,res){
    return loginUser(req,res);
  },
  createNewUser:function(req,res){
    return createNewUser(req,res);
  },
  me:'apiUser'

}

let timeInMs = 30 * 60 * 1000 ;

const TimeExpiresCookies = ()=>{
  return new Date(Date.now() + timeInMs);
}

function WhatNeedToDo(url,options = {isEmpty:true},req,res){
  console.log(url,options);

  if(!options.isEmpty){
    if(url === ''){
      res.end();
    }else if(url === api.me){
      res.end();
    }
    else{
      return api[url](req,res);
    }
  }else{
    res.end();
  }
  
}

function loginUser(req,res){
  let responseText,Cookies;
  req.on('data',async (data)=>{

    data += '';
    data = JSON.parse(data);

    let result = await MongoChanger.findUserByLogin(data.nickname,true);

    if(result.isOK){
      responseText = Response.Bad({value:{why:{messageAuthor:'no register account'}}});
      return sendResponseWithCookies(res,responseText);  
      
    }else{

      let isPass = await MongoChanger.isPasswordAndLoginMatch(result.why.user,data.nickname,data.password);

      if(isPass.isOK){

        responseText = Response.Good(isPass);

        Cookies = [
          'logged=true',
          `nickname=${data.nickname}`,
          `timeCookies=${timeInMs}`,
        ];

        if(isAdmin(data.nickname).isOK){
          Cookies.push(
            'admin=YesButNeedToVerify'
          )
        }

        return sendResponseWithCookies(res,responseText,Cookies);

      }else{
        responseText = Response.Bad({why:isPass});
        return sendResponseWithCookies(res,responseText);        
      }
    }
  });
}

function createNewUser(req,res){
  let responseText,Cookies;

  req.on('data',async (chunk)=>{
    chunk = chunk+'';
    chunk = JSON.parse(chunk);

    let result = await MongoChanger.findUserByLogin(chunk.nickname,false);

    if(result.isOK){

      let new_user = await MongoChanger.createNewUser(chunk.nickname,chunk.password);

      if(new_user.isOK){

        responseText = Response.Good({msg:"Succesfully created"});

        Cookies = [
          'logged=true',
          `nickname=${chunk.nickname}`,
          `timeCookies=${timeInMs}`,
        ];
        
        return sendResponseWithCookies(res,responseText,Cookies);
  

      }else{        
        responseText = Response.Bad({new_user:new_user});
        return sendResponseWithCookies(res,responseText);
      }
    }else{
      console.log(result);
      responseText = Response.Bad({result:result});
      return sendResponseWithCookies(res,responseText);
    }
    
  })
}


function sendResponseWithCookies(res,resText,cookie = 'NOREGUIRED'){
  
  cookie = cookie === 'NOREGUIRED' ? [] : cookie;
  
  cookie = cookie.map(e => {return e+rulesCookies});

  res.setHeader('Set-Cookie',cookie);
  res.writeHead(200,{
    'Content-Type': 'text/html;charset=UTF-8',
  });
  return res.end(resText)
};


module.exports = {WhatNeedToDo};

