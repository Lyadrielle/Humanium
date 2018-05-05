global.$env = require('./env')
$env.API_PORT = $env.PORT

const express = require('express')
const { app: server, logger } = require('./api/app')

const app = express()

app.use(server)
app.use('/', express.static('build'))
app.listen($env.PORT)

logger.log('normal', `Humanium server started in production mode on port ${$env.PORT} !`)