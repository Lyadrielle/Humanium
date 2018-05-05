const { encrypt } = require('aes256')

const choiceTree = require('../../ressources/ChoiceTreeTrailer.json')
const { updateContext } = require('../../core/context')

module.exports = {
  type: 'GET',
  handler: readTreePath,
}

async function readTreePath(req) {
  const { context: { path } } = req

  return  {
    success: true,
    nodes: path.map(id => choiceTree.find(e => e.id === id))
  }
}
