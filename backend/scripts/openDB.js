module.exports = function(){
    const { MongoClient } = require("mongodb");

    // Replace the uri string with your MongoDB deployment's connection string.
    const uri = process.env.MongoDb_URL;

    const client = new MongoClient(uri);

    async function run() {
        try {
            await client.connect();

            const database = client.db('Chat');
            const users = database.collection('users');

            // Query for a movie that has the title 'Back to the Future'
            const query = {TYPE:"CONSTANT"};
            const result = await users.findOne(query);

            console.log(result);
            return result;
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    return run().catch(console.dir);
}