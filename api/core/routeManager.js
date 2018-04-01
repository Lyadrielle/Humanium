const express = require('express')
const fs = require('fs')
const path = require('path')

const logger = require('./logger')

const router = express()
module.exports = {
  router,
}

const routesFolder = path.resolve(__dirname, '../routes')
loadAllRoutes()

function addRoute(type, route, handler) {
  router[type.toLowerCase()](`/api${route.replace('\\', '/')}`, (req, res, next) => {
    handler(req).then(result => {
      const { mimeType, name, buffer, stream } = result
      if (mimeType && name && (buffer || stream)) {
        res.set({
          'Content-type': mimeType,
          'Content-Disposition': `attachement;filename="${name}"`,
          'X-Filename': name,
        })
        if (stream) {
          return stream.on('error', next).pipe(res)
        }
        return res.send(buffer)
      }
      return res.send(result)
    }).catch(e => {
      logger.log('normal', e)
      return res.send({ status: 500, message: e.message })
    })
  })
}

function loadAllRoutes(folder = routesFolder) {
  const files = fs.readdirSync(folder)
  files.forEach(file => {
    const filePath = path.resolve(folder, file)
    if(fs.lstatSync(filePath).isDirectory()) {
      loadAllRoutes(filePath)
    }
    if (path.extname(file) !== '.js') return
    const { type, handler } = require(filePath)
    const routeName = `${filePath.replace(routesFolder, '').replace('.js', '')}`
    addRoute(type, routeName, handler)
    logger.log('debug', `route ${routeName} created`)
  })
}