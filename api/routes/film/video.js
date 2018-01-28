const fs = require('fs')

module.exports = {
  type: 'GET',
  handler: handler,
}

async function handler(req) {
  const { query: { id } } = req
  return `This is the Film request ${id}`
}