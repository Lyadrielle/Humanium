global.$env = require('../env')

const express = require('express')
const bodyParser = require('body-parser')

const logger = require('./core/logger')
const { router } = require('./core/routeManager')

const app = express()
const PORT = 42000

app.use(bodyParser.json())

app.use((req, res, next) => {
  logger.log('debug', `${req.method.toUpperCase()} on ${req.path} ${JSON.stringify(req.body)}`)
  next()
})

app.use(router)

app.listen(PORT)
logger.log('normal', `Humanium server started on port ${PORT} !`)