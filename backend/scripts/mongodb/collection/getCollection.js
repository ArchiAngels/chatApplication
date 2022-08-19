const mainMongoodb = require('../mainMongoodb.js');

module.exports = async function(collectionName,limit_,skip_){
    function passFunction(client,database,resolve,reject,stopTimeOut){

        return new Promise( async function(myresolve,myreject){

            let collection = database.collection(collectionName);

            let projection = {
                id:1,
                _id:0,
                userID:1,
                message:1,
                date:1
            };
            let limit = limit_ || 25;
            let skip = skip_ || 0;
            let sort = {id:-1}

            const cursor = collection.find().project(projection).limit(limit).skip(skip).sort(sort);
            const allValues = await cursor.toArray();

            stopTimeOut('gC');
            // allValues.forEach(element => {
            //     console.log(element);
            // });

            resolve(allValues);
        });
    }

    let result = await mainMongoodb(passFunction);
    return result;

}