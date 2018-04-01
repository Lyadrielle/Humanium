const express = require('express')
const fs = require('fs')
const path = require('path')

const logger = require('./logger')

const windowsFixUrl = [
	['\\a', '/a'],
	['\\b', '/b'],
	['\\c', '/c'],
	['\\d', '/d'],
	['\\e', '/e'],
	['\\f', '/f'],
	['\\g', '/g'],
	['\\h', '/h'],
	['\\i', '/i'],
	['\\j', '/j'],
	['\\k', '/k'],
	['\\l', '/l'],
	['\\m', '/m'],
	['\\n', '/n'],
	['\\o', '/o'],
	['\\p', '/p'],
	['\\q', '/q'],
	['\\r', '/r'],
	['\\s', '/s'],
	['\\t', '/t'],
	['\\u', '/u'],
	['\\v', '/v'],
	['\\w', '/w'],
	['\\x', '/x'],
	['\\y', '/y'],
	['\\z', '/z']
]

const router = express()
module.exports = {
  router,
}

const routesFolder = path.resolve(__dirname, '../routes')
loadAllRoutes()

function addRoute(type, route, handler) {
  const routePath = windowsFixUrl.reduce(
    (acc, [element, replace]) => acc.replace(element, replace),
    `/api${route.replace('\\', '/')}`
  )
  router[type.toLowerCase()](routePath, (req, res, next) => {
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