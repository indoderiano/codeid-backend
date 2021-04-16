const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {clientRedis} = require('../config/redis')

class ControllerUser {
    static async create (req, res) {
        console.log('create new user')
        try {
            let { userName, accountNumber, emailAddress, identityNumber } = req.body
            let newUser = { userName, accountNumber, emailAddress, identityNumber }
            const user = await User.create(newUser)
            await clientRedis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
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
                        res.json(users)
                    }
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async update (req, res) {
        let {id} = req.params
        let update = req.body
        try {
            const user = await User.update(id, update)
            await clientRedis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async delete (req, res) {
        let {id} = req.params
        try {
            const user = await User.delete(id)
            await clientRedis.del('usersdata')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async readByAccountNumber (req, res) {
        let { accountNumber } = req.params
        try {
            const user = await User.readByAccountNumber(Number(accountNumber))
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async readByIdentityNumber (req, res) {
        let { identityNumber } = req.params
        try {
            const user = await User.readByIdentityNumber(Number(identityNumber))
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async getToken (req, res) {
        let token = jwt.sign({user: 'employer'}, process.env.TOKEN_KEY)
        res.json({token})
    }
}

module.exports = ControllerUser