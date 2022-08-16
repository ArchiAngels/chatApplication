const getCollection = require('../../scripts/mongodb/collection/getCollection.js');

function getMessages(req,res){
    let collection = 'publicChatRoom'
    getCollection(collection).then(messages=>{
        messages = JSON.stringify(messages);
        res.end(messages)
    }).catch(e=>{
        res.end(e);
    })
}

module.exports = {getMessages};