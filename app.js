const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('./store')

const gameRouter = require('./routes/game')
const scoresRouter = require('./routes/scores')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/game', gameRouter)
app.use('/scores', scoresRouter)

module.exports = app
