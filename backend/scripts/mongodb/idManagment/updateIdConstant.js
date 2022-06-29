const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(newId){

    console.log('updateIdConstant:::start creating')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){


            const users = database.collection('users');           

            const filter = {TYPE:"CONSTANT"};

            const updateDoc = {

                $set: {

                    idUser: newId

                },

            };

            await users.updateOne(filter, updateDoc,(err,res)=>{
                stopTimeOut("updateIdConstant");

                if(err) return reject(err.message)
                console.log(`new id:: ${res} === ${newId}`);
                resolve(res);
            });

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}