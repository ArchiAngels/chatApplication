const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(collectionName){
    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise( async function(myresolve,myreject){

            let collection = database.collection(collectionName);

            const cursor = collection.find({});
            const allValues = await cursor.toArray();
            stopTimeOut('gC');
            allValues.forEach(element => {
                // console.log(element);
            });

            resolve(allValues);
        });
    }

    let result = await mainMongoodb(passFunction);
    return result;

}