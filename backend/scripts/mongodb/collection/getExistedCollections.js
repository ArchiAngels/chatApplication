const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(){
    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise( function(myresolve,myreject){

            database.collections((err,result)=>{

                stopTimeOut();

                if(err){
                    
                   return reject({canSend:{err:err,status:502}});
                }

                // console.log(Object.keys(result));

                let collectionsNames = [];

                for(let item in result){
                    let name = result[item].s.namespace.collection;
                    // console.log(item,name);
                    collectionsNames.push(name)
                }

                // console.log(`collectionsNames::${collectionsNames}`);

                return resolve({collectionsNames:collectionsNames,status:200});

                // return collectionsNames
            });
        });
    }

    let result = await mainMongoodb(passFunction);
    return result;

}