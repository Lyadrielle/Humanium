const { encrypt } = require('aes256')

const { choiceTree } = require('../../core/tree')
const { updateContext } = require('../../core/context')
const { openConnection, getTable, close} = require('../../core/sqlite')

module.exports = {
  type: 'GET',
  handler: readTreePath,
}

async function readTreePath(req) {
  const { context: { path } } = req

  let db = openConnection()
  let rows = await getTable(db)
  close(db)

  return  {
    success: true,
    nodes: path.map(id => choiceTree.find(e => e.id === id)),
    percentageTable: rows
  }
}