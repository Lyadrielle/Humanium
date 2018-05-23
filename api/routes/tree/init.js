const { encrypt } = require('aes256')

const { choiceTree } = require('../../core/tree')
const { updateContext } = require('../../core/context')
const { init, insertMultipleNodes, isIdInDatabase, openConnection } = require('../../core/sqlite')

module.exports = {
  type: 'GET',
  handler: initTreePath,
}

async function initTreePath(req) {
  const { context } = req

  initSqliteDB()

  return {
    success: true,
    currentNode: choiceTree[0],
    newContext: updateContext(context, { path: [choiceTree[0].id] })
  }
}

function initSqliteDB() {
  const nodesId = choiceTree
    .filter(({ visibleOnTree }) => visibleOnTree)
    .map(({ id }) => id)

  if (!!nodesId && nodesId.length > 0) {
    init(nodesId)
  }
}