const { MongoClient } = require('mongodb')

let database

async function connect () {
    try {
        const uri = `mongodb+srv://mde50526:${process.env.MONGODB_PASSWORD}@cluster0.oefsh.mongodb.net/test?retryWrites=true&w=majority`
        
        const client = new MongoClient(uri)

        await client.connect()

        // await listDatabases(client)

        const db = client.db('indo_codeid')

        database = db

        return db

    } catch(err) {
    
        console.log(err)
    
    }
}

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);

module.exports = {
    connect,
    getDatabase() {
        return database
    },
    database
}