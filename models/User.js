const { ObjectId } = require('bson')
const {getDatabase} = require('../config/mongodb')

class User {
    static create (user) {
        return getDatabase().collection('users').insertOne(user)
    }
    static read () {
        return getDatabase().collection('users').find().toArray()
    }
    static update (id, update) {
        return getDatabase().collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: update }
        )
    }
    static delete (id) {
        console.log('delete user')
        console.log(id)
        return getDatabase().collection('users').deleteOne(
            { _id: new ObjectId(id) }
        )
    }

    static readByAccountNumber (accountNumber) {
        return getDatabase().collection('users').find(
            { accountNumber }
        ).toArray()
    }
    static readByIdentityNumber (identityNumber) {
        return getDatabase().collection('users').find(
            { identityNumber }
        ).toArray()
    }
}

module.exports = User