global.$env = require('../env')

const express = require('express')
const bodyParser = require('body-parser')

const logger = require('./core/logger')
const { contextLoader } = require('./core/context')
const { router } = require('./core/routeManager')

const app = express()
const PORT = 42000

app.use(bodyParser.json())

app.use(contextLoader)

app.use((req, res, next) => {
  logger.log(
    'debug',
    `${req.method.toUpperCase()} on ${req.path}\n` +
    `|-- headers: ${JSON.stringify(req.headers)}\n` +
    `|-- query: ${JSON.stringify(req.query)}\n` +
    `|-- body: ${JSON.stringify(req.body)}\n` +
    `|-- context: ${JSON.stringify(req.context)}`
  )
  next()
})

app.use(router)

app.listen(PORT)
logger.log('normal', `Humanium server started on port ${PORT} !`)