const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function getId(collectionName = 'REQUIRED'){

    if(collectionName === 'REQUIRED'){
        return Promise.reject('enter collection name');
    }

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){


            const selectedCollection = database.collection(collectionName);           

            const query = {TYPE:"CONSTANT"};
            await selectedCollection.findOne(query,async function(err,res){

                await client.close();

                stopTimeOut('getID')

                if(err) {
                    let messageToClient = `Server Database Error`;
                    
                    return reject({canSend:messageToClient,detailsError:err.message});
                } 

                resolve(res);

            });

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}