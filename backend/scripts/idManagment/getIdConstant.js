module.exports = function(){   
    return new Promise(function(resolve,reject){
        const { MongoClient } = require("mongodb");
        let timeOver = setTimeout(()=>{
            let messageToClient = `Server timeOUT Error`;
            let errDetails = 'Time out 5.0s create user';
            reject({canSend:messageToClient,detailsError:errDetails});
            
        },5000);

        const uri = process.env.MongoDb_URL;

        const client = new MongoClient(uri);

        async function run() {
            try {
                await client.connect();

                const database = client.db('Chat');
                const users = database.collection('users');           

                const query = {TYPE:"CONSTANT"};
                await users.findOne(query,async function(err,res){

                    await client.close();

                    clearTimeout(timeOver);

                    if(err) {
                        let messageToClient = `Server Database Error`;
                        
                        return reject({canSend:messageToClient,detailsError:err.message});
                    } 

                    resolve(res);

                });
                
                    // resolve(res);
            } finally {
                // Ensures that the client will close when you finish/error
                
            }
        }
        return run().catch(console.dir);
    }).then(
        function(value){
            return {isOK:true,body:value};
        },
        function(error){
            // console.log(error.detailsError);
            return {isOK:false,why:error.canSend};
        }
    )
}