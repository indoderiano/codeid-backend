const { ObjectId } = require('bson')
const { getDatabase } = require('../config/mongodb')

class User {
    static async create (user) {
        let _id = new ObjectId()
        user._id = _id
        await getDatabase().collection('proxy').insertOne({_id, emailAddress: user.emailAddress})
        return getDatabase().collection('users').insertOne(user)
    }
    static read () {
        return getDatabase().collection('users').find().toArray()
    }
    static async update (id, update) {
        await getDatabase().collection('proxy').updateOne(
            { _id: new ObjectId(id) },
            { $set: {emailAddress: update.emailAddress} }
        )
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