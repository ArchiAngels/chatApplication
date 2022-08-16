const getMessagePublicRoom = require('../../socket/scripts/getMessages.js').getMessage;

async function getMessages(options,req,res){

    const {limit,skip} = options;

    return getMessagePublicRoom(limit,skip).then(e=>{
        e = JSON.stringify(e);   
        // console.log(e);
        return res.end(e);
    });

    

}

module.exports = {getMessages};