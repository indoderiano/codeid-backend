const { MongoClient } = require('mongodb')

let database

async function connect () {
    try {
        const uri = `mongodb+srv://mde50526:${process.env.MONGODB_PASSWORD}@cluster0.oefsh.mongodb.net/test?retryWrites=true&w=majority`
        
        const client = new MongoClient(uri)

        await client.connect()

        const db = client.db('indo_codeid')

        db.collection('proxy').createIndex( {"emailAddress": 1}, {unique: true} )

        // db.runCommand( {
        //     collMod: "users",
        //     validator: { $jsonSchema: {
        //        bsonType: "object",
        //        required: [ "userName", "accountNumber", "emailAddress", "identityNumber" ],
        //        properties: {
        //           accountNumber: {
        //              bsonType: "int",
        //              description: "must be a number and is required"
        //           },
        //           identityNumber: {
        //              bsonType: "int",
        //              description: "must be a number and is required"
        //           }
        //        }
        //     } },
        //     validationLevel: "moderate"
        //  } )

        database = db

        return db

    } catch(err) {
    
        console.log(err)
    
    }
}

module.exports = {
    connect,
    getDatabase() {
        return database
    },
    database
}