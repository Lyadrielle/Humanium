const { encrypt } = require('aes256')

const { choiceTree } = require('../../core/tree')
const { updateContext } = require('../../core/context')
const { openConnection, updateNode } = require('../../core/sqlite')

module.exports = {
  type: 'POST',
  handler: updateTreePath,
}

async function updateTreePath(req) {
  const { body: { next }, context } = req
  const { path } = context

  const isNewNode = !path.includes(next)

  const newPath = isNewNode
    ? path.concat(next)
    : path.slice(0, path.indexOf(next) + 1)

  const isPathValid = checkTreePath(choiceTree, newPath)

  const finalPath = isPathValid
    ? newPath
    : [choiceTree[0].id]

  const lastNodeId = path[path.length - 1]
  const prevNode = choiceTree.find(({ id }) => id === lastNodeId)

  if(prevNode.type !== 'Cinematic')
    updateDataBase(prevNode, next)

  return  {
    success: isPathValid,
    currentNode: choiceTree.find(e => e.id === next),
    newContext: updateContext(context, { path: newPath })
  }
}

const checkNextMap = {
  Choice: (previousNode, id) => {
    const { choices } = previousNode
    return !!choices.find(({ next }) => next === id)
  },
  QTE: (previousNode, id) => {
    const { failure, success } = previousNode
    return failure === id || success === id
  },
  Cinematic: (previousNode, id) => previousNode.next === id
}

function checkTreePath(tree, path) {
  return path.reduce((acc, id, index) =>  {
      if(!acc) return false
      if (index === 0) return id === tree[0].id
      const previousNode = tree.find(e => e.id === path[index-1])
      const { type: prevNodeType } = previousNode
      return checkNextMap[prevNodeType](previousNode, id)
    },
    true
  )
}

function updateDataBase(currentNode, nextId) {
  let firstOrSecond = ''
  if(currentNode.type === 'Choice') {
    if(currentNode.choices[0].next === nextId)
      firstOrSecond = 'first'
    if(currentNode.choices[1].next === nextId)
    firstOrSecond = 'second'
  }

  if (currentNode.type === 'QTE') {
    if(currentNode.success === nextId)
      firstOrSecond = 'first'
    if(currentNode.failure === nextId)
      firstOrSecond = 'second'
  }

  updateNode(
    openConnection(),
    currentNode.id,
    firstOrSecond
  )
}