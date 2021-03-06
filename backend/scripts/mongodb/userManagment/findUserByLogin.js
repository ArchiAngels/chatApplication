const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(login,dataUserIsNeed = false){

    console.log('findUser:::start searching')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){

            let query = {
                login:login
            }

            let users = database.collection('users');
            
            users.findOne(query,async (err,res)=>{
                stopTimeOut('findUser');

                if(err) return reject(err);

                if(res === null){
                    console.log('no find any user with that login');
                    return resolve({TYPE:'free to register'});

                }else{
                    console.log('find user with that login');
                    let data = dataUserIsNeed? {user:res} : {};
                    return reject({why:'already register',...data});
                }

                

            })

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}
