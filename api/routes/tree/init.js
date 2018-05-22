module.exports = {
  type: 'GET',
  handler: initTreePath,
}

const { encrypt } = require('aes256')

const { choiceTree } = require('../../core/tree')
const { updateContext } = require('../../core/context')
const { init, insertMultipleNodes } = require('../../core/sqlite')

async function initTreePath(req) {
  const { context } = req

  console.log('\n\n\n--------------------')
  initSqliteDB()
  console.log('--------------------\n\n\n')

  return  {
    success: true,
    currentNode: choiceTree[0],
    newContext: updateContext(context, { path: [choiceTree[0].id] })
  }
}

function initSqliteDB() {
  let nodesId = new Array
  choiceTree.forEach(node => {
    if(node.hasOwnProperty('id') && node.hasOwnProperty('visibleOnTree')) {
        if(node.visibleOnTree)
          nodesId.push(node.id)
    }
  })

  console.log(nodesId)
  if(!!nodesId && nodesId.length > 0) {
    init()
    insertMultipleNodes(nodesId)
  }
}
