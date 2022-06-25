module.exports = function(fn){   
    return new Promise(function(resolve,reject){

        const { MongoClient } = require("mongodb");
        
        let timeOver = setTimeout(()=>{
            console.log('time out')
            let messageToClient = `Server timeOUT Error`;
            let errDetails = 'Time out 5.0s create user';
            reject({canSend:messageToClient,detailsError:errDetails});
            
        },5000);

        function stopTimeOut(){
            console.log('timeout has been stoped');
            clearTimeout(timeOver);
        }

        const uri = process.env.MongoDb_URL;

        const client = new MongoClient(uri);

        async function run() {
            try {
                await client.connect();

                const database = client.db('Chat');

                await fn(client,database,resolve,reject,stopTimeOut);

                // const users = database.collection('users');           

                // const query = {TYPE:"CONSTANT"};
                // await users.findOne(query,async function(err,res){

                //     await client.close();

                //     clearTimeout(timeOver);

                //     if(err) {
                //         let messageToClient = `Server Database Error`;
                        
                //         return reject({canSend:messageToClient,detailsError:err.message});
                //     } 

                //     resolve(res);

                // });
                
                    // resolve(res);
            } finally {
                await client.close();
                // Ensures that the client will close when you finish/error
                
            }
        }
        return run().catch(console.dir);
    }).then(
        function(value){
            console.log("OK GOOD");
            return {isOK:true,body:value};
        },
        function(error){
            console.log("BAD something goes wrong");
            // console.log(error.detailsError);
            return {isOK:false,why:error.canSend};
        }
    )
}