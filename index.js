const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const home = require('./routes/home')
const todo = require('./routes/todo')
const user = require('./routes/users')

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true}
    ).then(() => console.log('mongodb connected!')
    ).catch(err => console.log(err))

app.use('/', home)
app.use('/todo', todo)
app.use('/users', user)

const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`Server is running on port ${port}`))