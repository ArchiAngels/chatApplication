const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(collectionName){

    console.log('daleteCollection:::start deleting')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            database.dropCollection(collectionName,{},(err,res)=>{
                stopTimeOut('daleteCollection');

                if(err) return reject(err);

                let msg = `Succesfully deleted new collection ',${collectionName}`;

                console.log(msg)
                resolve(msg);
            })

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
