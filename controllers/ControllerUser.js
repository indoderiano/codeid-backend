const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Redis = require('ioredis')
const redis = new Redis()

class ControllerUser {
    static async create (req, res) {
        console.log('create new user')
        try {
            let {userName, accountNumber, emailAddress, identityNumber } = req.body
            let newUser = {userName, accountNumber, emailAddress, identityNumber }
            const user = await User.create(newUser)
            await redis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async read (req, res) {
        try {
            let usersCache = await redis.get('usersdata')
            if(usersCache){
                console.log('return cache data')
                res.json(JSON.parse(usersCache))
            }else{
                const users = await User.read()
                await redis.set('usersdata', JSON.stringify(users))
                res.json(users)
            }
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
            await redis.del('usersdata')
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
            await redis.del('usersdata')
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