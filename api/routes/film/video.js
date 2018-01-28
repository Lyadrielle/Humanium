const fs = require('fs')
const path = require('path')

module.exports = {
  type: 'GET',
  handler: handler,
}

async function handler(req) {
  const { query: { id } } = req

  const videoName = `${id}.mp4`
  const stream = fs.createReadStream(path.resolve(__dirname, `../../ressources/videos/${videoName}`))

  return {
    stream,
    name: videoName,
    mimeType: 'video/mp4'
  }
}