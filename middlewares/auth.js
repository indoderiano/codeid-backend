const jwt = require('jsonwebtoken')

const Authentication = (req, res, next) => {
    let {token} = req.headers
    try {
        let decoded = jwt.verify(token, process.env.TOKEN_KEY)
        // console.log(decoded)
        if(decoded.user === 'employer'){
            console.log('token is verified')
            next()
        }else{
            throw new Error('not employer')
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Authentication Failed'})
    }
}

module.exports = {Authentication}