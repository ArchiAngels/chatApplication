const createChat = require('./createNewChat.js');

module.exports = function(){
    let name = 'publicChatRoom';

    return createChat(name);
}