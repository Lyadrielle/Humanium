global.$env = require('./env')
$env.API_PORT = $env.PROD_PORT

const express = require('express')
const { app: server, logger } = require('./api/app')

const app = express()

app.use(server)
app.use('/', express.static('build'))
app.listen($env.PROD_PORT)

logger.log('normal', `Humanium server started in production mode on port ${$env.PROD_PORT} !`)