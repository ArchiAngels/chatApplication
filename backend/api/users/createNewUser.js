const Response = require('../../scripts/ServerScripts/AllRespnonsesController.js');
const MongoChanger = require('../../scripts/mongodb/allMongoControllers.js');
const sendResponseWithCookies = require('../../scripts/ServerScripts/sendResponse.js').sendResponseWithCookies;

let timeInMs = 30 * 60 * 1000;

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
          
          return sendResponseWithCookies(res,responseText,200,Cookies);
    
  
        }else{        
          responseText = Response.Bad({new_user:new_user});
          return sendResponseWithCookies(res,responseText,500);
        }
      }else{
        console.log(result);
        responseText = Response.Bad({result:result});
        return sendResponseWithCookies(res,responseTex,500);
      }
      
    })
}

module.exports = {createNewUser};