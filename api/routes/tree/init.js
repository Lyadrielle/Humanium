const { encrypt } = require('aes256')

const choiceTree = require('../../ressources/ChoiceTreeTrailer.json')
const { updateContext } = require('../../core/context')

module.exports = {
  type: 'GET',
  handler: initTreePath,
}

async function initTreePath(req) {
  const { context } = req

  return  {
    success: true,
    currentNode: choiceTree[0],
    newContext: updateContext(context, { path: [choiceTree[0].id] })
  }
}
