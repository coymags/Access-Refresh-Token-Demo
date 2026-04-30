require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

//Mongoose Database Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('Database Connected'))

//Declare Router dir
const userRouter = require('./routes/user')

app.use('/users', userRouter)


app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
})