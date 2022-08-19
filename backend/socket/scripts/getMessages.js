let getMessages = require('../../scripts/mongodb/collection/getCollection.js');

async function getMessage(limit,skip){
    let room = 'publicChatRoom';
    let messages = await getMessages(room,limit,skip);
    messages = messages.body.filter(e => {return e.userID});
    messages = messages.map(e=>{
        return {
            who:e.userID,
            msg:e.message,
            time:e.date
        }
    })
    // console.log(messages);
    return messages;
    // myRoom.emit('messageList',JSON.stringify(messages));
}

module.exports = {getMessage};