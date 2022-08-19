const MongoChanger = require('../../scripts/mongodb/allMongoControllers.js');
const Response = require('../../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../../scripts/ServerScripts/isAdmin.js');
const createNewChat = require('../../scripts/mongodb/chatManagment/createNewChat.js');


function createNewRoom(nameRoom,req,res){
    let responseText;
    createNewChat(nameRoom).then(v=>{
        if(v.isOK){
            responseText = Response.Good({You:'The best',YourDream:"Will come"});
        }else{
            responseText = Response.Bad({value:{why:v.value}});
        }
    })
    return res.end(responseText);
}

module.exports = {createNewRoom};