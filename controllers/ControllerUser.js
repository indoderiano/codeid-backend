const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {clientRedis} = require('../config/redis')
// const Redis = require('ioredis')
// const redis = new Redis()

// clientRedis.set('foo','bar');
//     clientRedis.get('foo', function(err, response){
//         if(err) {
//             throw err;
//             }
//         else {
//             console.log(response);
//             clientRedis.quit();
//         }
//     });

class ControllerUser {
    static async create (req, res) {
        console.log('create new user')
        try {
            let {userName, accountNumber, emailAddress, identityNumber } = req.body
            let newUser = {userName, accountNumber, emailAddress, identityNumber }
            const user = await User.create(newUser)
            await clientRedis.del('usersdata')
            // await redis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async read (req, res) {
        try {
            clientRedis.get('usersdata', async (err, response) => {
                if(err){
                    throw err
                }else{
                    let usersCache = response
                    if(usersCache){
                        console.log('return cache data')
                        res.json(JSON.parse(usersCache))
                    }else{
                        const users = await User.read()
                        await clientRedis.set('usersdata', JSON.stringify(users))
                        // await redis.set('usersdata', JSON.stringify(users))
                        res.json(users)
                    }
                }
            })
            // let usersCache = await clientRedis.get('usersdata')
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async update (req, res) {
        let {id} = req.params
        let update = req.body
        try {
            const user = await User.update(id, update)
            await clientRedis.del('usersdata')
            // await redis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async delete (req, res) {
        let {id} = req.params
        try {
            const user = await User.delete(id)
            await clientRedis.del('usersdata')
            // await redis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async readByAccountNumber (req, res) {
        let { accountNumber } = req.params
        try {
            const user = await User.readByAccountNumber(accountNumber)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async readByIdentityNumber (req, res) {
        let { identityNumber } = req.params
        try {
            const user = await User.readByIdentityNumber(identityNumber)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async getToken (req, res) {
        console.log(process.env.TOKEN_KEY)
        let token = jwt.sign({user: 'employer'}, process.env.TOKEN_KEY)
        res.json(token)
    }
}

module.exports = ControllerUser