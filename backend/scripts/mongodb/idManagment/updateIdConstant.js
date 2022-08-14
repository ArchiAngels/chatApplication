const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(collectionName = 'REQUIRED',newId = -1,forceWrite = false){

    console.log('updateIdConstant:::start creating')    

    if(newId === -1){
        return Promise.reject('enter id');
    }
    else if(collectionName === 'REQUIRED'){
        return Promise.reject('enter collectionName');
    }

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async function(myresolve,myreject){


            const selectedCollection = database.collection(collectionName);           

            const filter = {TYPE:"CONSTANT"};

            const options = {
                upsert:forceWrite,
            }

            let id = `id${collectionName.split('collection').join('')}`;

            let setValue = {};
                setValue[id] = newId;

            const updateDoc = {

                $set: {

                    ...setValue 

                },


            };

            await selectedCollection.updateOne(filter, updateDoc,options,(err,res)=>{
                stopTimeOut("updateIdConstant");

                if(err) return reject(err.message);
                console.log(`new id:: ${res} === ${newId}`);
                resolve(res);
            });

        });
    }
    let result =  await mainMongoodb(passFunction);
    return result;

}