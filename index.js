const express = require('express')
const app = express()
const cors = require('cors')


const PORT = process.env.PORT || 3000
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('<div style="text-align: center;margin-top:40px; font-size:24px;">Code id Backend technical test server by <strong>Indo Halim</strong>')
})

const routerUser = require('./routes')
app.use('/user', routerUser)


const {connect} = require('./config/mongodb')

connect().then(async (db) => {
    console.log('Mongo Cluster is connected')

    const {clientRedis} = require('./config/redis')

    clientRedis.on("error", function(err) {
        throw err;
      });
    
    console.log('Redis server is connected')

    app.listen(PORT, () => {
        console.log('App is listening at port',PORT)
    })
    
})
