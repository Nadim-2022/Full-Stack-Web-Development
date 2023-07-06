
const express = require('express')
const app = express()
const cors = require('cors')
const nextrout = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://nadim:Bangladesh@cluster0.jevaidl.mongodb.net/Blog?retryWrites=true&w=majority')

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.json())
app.use('/api/blogs',middleware.userExtractor, nextrout);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
