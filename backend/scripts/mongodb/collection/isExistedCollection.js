const mainMongoodb = require('../mainMongoodb.js');
const getCollectionNames = require('./getExistedCollections.js');

module.exports = async function me(collectionName){

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async  function(myresolve,myreject){

            let existedCollectionNames = await getCollectionNames();
            existedCollectionNames = existedCollectionNames.body.collectionsNames;

            console.log('existedCollectionNames',existedCollectionNames);
            stopTimeOut("isExistedCollection");

            for(let i =0; i < existedCollectionNames.length; i++){
                let isEgual = findEgualWithLowerCase(existedCollectionNames[i],collectionName);
                console.log(existedCollectionNames[i],'::',collectionName,isEgual);
                if(isEgual){
                    return reject( {isOK:false,why:"AlreadyExisted"})
                }
            }
            
            return resolve( {isOK:true,why:"NeedCreateNewCollection"})
        });
    }

    // let result = 
    return await mainMongoodb(passFunction);
    // return {value:result,status:'non'};

}

function findEgualWithLowerCase(a = 'carrytomuch',b = 'UNBELIVEBLE'){
    a = a.toLocaleLowerCase();
    b = b.toLocaleLowerCase();

    return a === b;
}