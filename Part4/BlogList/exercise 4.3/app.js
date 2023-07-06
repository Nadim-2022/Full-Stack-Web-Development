
const express = require('express')
const app = express()
const cors = require('cors')
const nextrout = require('./controllers/notes')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', nextrout);


module.exports = app
