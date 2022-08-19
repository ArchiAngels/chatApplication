module.exports = function(fn){   
    return new Promise(function(resolve,reject){

        const { MongoClient } = require("mongodb");
        
        let timeOver = setTimeout(()=>{
            console.warn('time out')
            let messageToClient = `Server timeOUT Error`;
            let errDetails = 'Time out 5.0s create user';
            reject({canSend:messageToClient,detailsError:errDetails});
            
        },5000);

        function stopTimeOut(fromWhere = 'not passed :('){
            console.warn('timeout has been stoped by::',fromWhere);
            clearTimeout(timeOver);
        }

        const uri = process.env.MongoDb_URL;

        const client = new MongoClient(uri);

        async function run() {
            try {
                await client.connect();

                const database = client.db('Chat');

                await fn(client,database,resolve,reject,stopTimeOut);

            } finally {
                await client.close();                
            }
        }
        return run().catch(console.dir);
    }).then(
        function(value){
            return {isOK:true,body:value};
        },
        function(error){;
            return {isOK:false,why:error};
        }
    )
}