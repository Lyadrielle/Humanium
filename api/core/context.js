const { encrypt, decrypt } = require('aes256')

module.exports = {
  contextLoader,
  updateContext
}

function contextLoader(req, res, next) {
  const { headers } = req
  req.context = (!headers || !headers.context)
    ? {}
    : readContext(headers.context)
  next()
}

function readContext(contextString) {
  try {
    return JSON.parse(decrypt($env.AES_KEY, contextString))
  } catch(e) {
    return {}
  }
}

/**
 * updateContext: update the current context
 * @param {Object} currentContext: the context to update
 * @param {Object} update: an object containing ONLY the fields to update
 * @return {String} the updated and encrypted context
 */
function updateContext(currentContext, update) {
  return encrypt($env.AES_KEY, JSON.stringify({ ...currentContext, ...update }))
}