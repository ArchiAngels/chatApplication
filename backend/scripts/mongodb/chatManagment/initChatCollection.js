const createNewCollection = require('../collection/createNewCollection.js');

module.exports = function(){
    let name = 'publicChatRoom';

    return createNewCollection(name);
}