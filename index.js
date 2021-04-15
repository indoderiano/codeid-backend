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
    res.send('Code id Backend technical test server')
})

const routerUser = require('./routes')
app.use('/user', routerUser)

const {connect} = require('./config/mongodb')

connect().then(async (db) => {
    console.log('Mongo is connected')

    const userCollection = db.collection('users')

    const users = await userCollection.find().toArray()

    console.log(users)

    app.listen(PORT, () => {
        console.log('App is listening at port',PORT)
    })
    
})
