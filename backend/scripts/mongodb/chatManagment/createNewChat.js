const mainMongoodb = require('../mainMongoodb.js');
const setID = require('../idManagment/updateIdConstant.js');
const createCollection = require('../collection/createNewCollection.js');


module.exports = async function(nameChat){

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            createCollection(nameChat).then(value=>{
                if(value.isOK){
                    setID(nameChat,0,true);
                    resolve('ok');
                }
            }).catch(e=>{
                console.log(`CnC ${e}`);
                reject(e)
            })
            

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}