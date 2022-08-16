const Response = require('../../scripts/ServerScripts/AllRespnonsesController.js');
const MongoChanger = require('../../scripts/mongodb/allMongoControllers.js');
const isAdmin = require('../../scripts/ServerScripts/isAdmin.js');
const sendResponseWithCookies = require('../../scripts/ServerScripts/sendResponse.js').sendResponseWithCookies;

console.log(sendResponseWithCookies);
let timeInMs = 30 * 60 * 1000;

function loginUser(options ={},req,res){
    let responseText,Cookies;
    req.on('data',async (data)=>{
  
      data += '';
      data = JSON.parse(data);
  
      let result = await MongoChanger.findUserByLogin(data.nickname,true);
  
      if(result.isOK){
        responseText = Response.Bad({value:{why:{messageAuthor:'no register account'}}});
        return sendResponseWithCookies(res,responseText,500);  
        
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
  
          return sendResponseWithCookies(res,responseText,200,Cookies);
  
        }else{
          responseText = Response.Bad({why:isPass});
          return sendResponseWithCookies(res,responseText,500);        
        }
      }
    });
}

module.exports = {loginUser};