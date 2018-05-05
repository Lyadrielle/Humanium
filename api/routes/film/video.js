const fs = require('fs')
const path = require('path')
const request = require('request')

const { choiceTree } = require('../../core/tree')

module.exports = {
  type: 'GET',
  handler: handler,
}

async function handler(req) {
  const { query: { id } } = req
  const { videoLink } = choiceTree.find(currentNode => currentNode.id === id)
  const videoName = `${id}.mp4`
  const stream = videoLink
    ? request(videoLink)
    : fs.createReadStream(path.resolve(__dirname, `../../ressources/videos/${videoName}`))

  return {
    stream,
    name: videoName,
    mimeType: 'video/mp4'
  }
}