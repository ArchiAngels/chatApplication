const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(){
    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise( function(myresolve,myreject){

            database.collections((err,result)=>{

                stopTimeOut("getExistedCollections");

                if(err){
                    
                   return reject({canSend:{err:err,status:502}});
                }

                let collectionsNames = [];

                for(let item in result){
                    let name = result[item].s.namespace.collection;
                    collectionsNames.push(name)
                }

                return resolve({collectionsNames:collectionsNames,status:200});
            });
        });
    }

    let result = await mainMongoodb(passFunction);
    return result;

}