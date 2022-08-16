let getMessages = require('../../scripts/mongodb/collection/getCollection.js');

async function getMessage(myRoom){
    let room = 'publicChatRoom';
    let messages = await getMessages(room);
    messages = messages.body.filter(e => {return e.userID});
    messages = messages.map(e=>{
        return {
            nickname:e.userID,
            message:e.message,
            date:e.date
        }
    })
    console.log(messages);
    myRoom.emit('messageList',JSON.stringify(messages));
}

module.exports = {getMessage};