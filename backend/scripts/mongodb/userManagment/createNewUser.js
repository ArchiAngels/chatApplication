const getId = require('../idManagment/getIdConstant.js');
const setId = require('../idManagment/updateIdConstant.js');

    
const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(login){

    let msg = `Passed data in CreatenewUser :: ${datauser}`;
    console.log(msg);

    console.log('CreatenewUser:::start searching')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            let result = await getId();
        
            if(result.isOK){
                return resolve({TYPE:'free to register',idUser:"free"});
            }else{
                return reject({why:'already register',idUser:"busy",value:res});
            }

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
