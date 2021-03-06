const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(collectionName){

    console.log('createNewCollection:::start creating')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            database.createCollection(collectionName,{},(err,res)=>{
                stopTimeOut("createNewCollection");

                if(err) return reject(err);

                console.log(res.s.namespace);
                resolve('Succesfully created new collection ',collectionName);
            })

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
