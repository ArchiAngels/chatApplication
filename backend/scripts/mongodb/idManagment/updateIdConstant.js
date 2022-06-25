module.exports = function(newId){
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

                const filter = {TYPE:"CONSTANT"};

                const updateDoc = {

                    $set: {

                        idUser: newId

                    },

                };

                await users.updateOne(filter, updateDoc,(err,res)=>{
                    if(err) return reject(err.message)
                    clearTimeout(timeOver);
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