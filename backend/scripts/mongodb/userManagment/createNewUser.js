const getId = require('../idManagment/getIdConstant.js');
const setId = require('../idManagment/updateIdConstant.js');

    
const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(login,password){

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            let id = await getId('users');
        
            if(id.isOK){
                let users = database.collection('users')
                let ID = id.body.idusers;

                const doc = {

                    login: login,
              
                    password: password,

                    id:ID
              
                }

                console.log(doc,id);
              
                await users.insertOne(doc,{},async (err,res)=>{
                    stopTimeOut('CU');

                    if(err) return reject(err)
                    await setId('users',++ID);

                    resolve(res);
                
                });
            }else{
                return reject({why:'already register',idUser:"busy",value:res});
            }

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
