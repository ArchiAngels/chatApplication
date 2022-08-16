const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(login,dataUserIsNeed = false){

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            let query = {
                login:login
            }

            let users = database.collection('users');
            
            users.findOne(query,async (err,res)=>{
                stopTimeOut('FU');

                if(err) return reject(err);

                if(res === null){
                    return resolve({TYPE:'free to register'});

                }else{
                    let data = dataUserIsNeed? {user:res} : {};
                    return reject({why:'already register',...data});
                }

                

            })

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
