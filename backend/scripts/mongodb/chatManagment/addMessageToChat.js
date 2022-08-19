const getId = require('../idManagment/getIdConstant.js');
const setId = require('../idManagment/updateIdConstant.js');

const mainMongoodb = require('../mainMongoodb.js');


module.exports = async function(collectionName = 'REQUIRED',message = '',userName = -1,date = {}){

    function Problem(reason){
        return Promise.reject(reason);
    }

    if(collectionName === 'REQUIRED'){
        return Problem('enter collection name');
    }else if(message === ''){
        return Problem('enter message');
    }else if(userName === -1){
        return Problem('enter userName');
    }else if(Object.keys(date).length !== 6){
        return Problem('enter date {hh,mm,dd,mm,yyyy}');
    }

    console.log('saveMessage:::start creating')    

    let id = await getId(collectionName);

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){


            const selectedCollection = database.collection(collectionName);  

            let ID = id.body.idpublicChatRoom;

            
            const doc = {
          
                userID: userName,
                message:message,
                date:date,
                id:ID
          
              }
            await selectedCollection.insertOne(doc,async function(err,res){

                await client.close();

                stopTimeOut("saveMessage");

                if(err) {
                    let messageToClient = `Server Database Error`;
                    
                    return reject({canSend:messageToClient,detailsError:err.message});
                } 

                resolve(res);

            });

            await setId(collectionName,++ID);

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}