module.exports = function(){   
    return new Promise(function(resolve,reject){
        const { MongoClient } = require("mongodb");
        let timeOver = setTimeout(()=>{
            reject('Time out 5.0s create user')
        },5000);

        const uri = process.env.MongoDb_URL;

        const client = new MongoClient(uri);

        async function run() {
            try {
                await client.connect();

                const database = client.db('Chat');
                const users = database.collection('users');           

                const query = {TYPE:"CONSTANT"};

                await users.findOne(query,(err,res)=>{

                    clearTimeout(timeOver);

                    if(err) {
                       return reject(`${err.message} -- findOne errCallback\n and result : ${res}`);
                    } 

                    resolve(res);

                });
            } finally {
                // Ensures that the client will close when you finish/error
                await client.close();
            }
        }
        return run().catch(console.dir);
    }).then(
        function(value){
            return {isOK:true,body:value};
        },
        function(error){
            return {isOK:false,why:error};
        }
    )
}