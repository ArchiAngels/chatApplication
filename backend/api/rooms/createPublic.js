const MongoChanger = require('../../scripts/mongodb/allMongoControllers.js');
const Response = require('../../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../../scripts/ServerScripts/isAdmin.js');


function createPublic(req,res){
    return MongoChanger.initPublicChatCollection().then(value=>{
        res.end(Response.Good({message:"created"}));
    }).catch(reason=>{
        res.end(Response.Bad({message:reason}))
    })
}

module.exports = {createPublic};