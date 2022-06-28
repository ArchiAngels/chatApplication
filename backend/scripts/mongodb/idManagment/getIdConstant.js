const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(){

    console.log('getIdConstant:::start creating')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){


            const users = database.collection('users');           

            const query = {TYPE:"CONSTANT"};
            await users.findOne(query,async function(err,res){

                await client.close();

                stopTimeOut("getIdConstant")

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