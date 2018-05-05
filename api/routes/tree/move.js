const { encrypt } = require('aes256')

const { choiceTree } = require('../../core/tree')
const { updateContext } = require('../../core/context')

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
