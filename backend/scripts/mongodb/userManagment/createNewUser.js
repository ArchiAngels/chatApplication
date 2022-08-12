const getId = require('../idManagment/getIdConstant.js');
const setId = require('../idManagment/updateIdConstant.js');

    
const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(login,password){

    console.log('CreatenewUser:::start searching')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            let id = await getId('users');
        
            if(id.isOK){
                let users = database.collection('users')

                const doc = {

                    login: login,
              
                    password: password,

                    id:id.body.idUser
              
                  }
              
                  await users.insertOne(doc,{},async (err,res)=>{
                    stopTimeOut('createUser');

                    if(err) return reject(err)

                    console.log("new user",res);
                    await setId('users',++id.body.idUser);

                    resolve(res);
                    
                  });
                // return resolve({TYPE:'free to register',idUser:"free"});
            }else{
                return reject({why:'already register',idUser:"busy",value:res});
            }

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
