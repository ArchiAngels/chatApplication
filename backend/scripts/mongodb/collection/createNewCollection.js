const mainMongoodb = require('../mainMongoodb.js');
const getCollectionNames = require('./getExistedCollections.js');

module.exports = async function(collectionName){

    console.log('start looking')    

    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise(async  function(myresolve,myreject){

            let existedCollectionNames = await getCollectionNames();
            existedCollectionNames = existedCollectionNames.body.collectionsNames;

            console.log('existedCollectionNames',existedCollectionNames);

            for(let i =0; i < existedCollectionNames.length; i++){
                let isEgual = findEgualWithLowerCase(existedCollectionNames[i],collectionName);
                console.log(existedCollectionNames[i],'::',collectionName,isEgual);
                if(isEgual){
                    resolve( {isOK:true,why:"AlreadyExisted"})
                }
            }

            resolve( {isOK:true,why:"NeedCreateNewCollection"})
        });
    }

    let result = await mainMongoodb(passFunction);
    return result;

}

function findEgualWithLowerCase(a = 'carrytomuch',b = 'unbelivetofind'){
    a = a.toLocaleLowerCase();
    b = b.toLocaleLowerCase();

    return a === b;
}