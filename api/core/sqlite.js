module.exports = {
  init,
  openConnection,
  close,
  insertNode,
  insertMultipleNodes,
  updateNode,
  deleteNode
}

const tableName = 'humanium_nodeStatistique'
const databaseName = 'playersData'
const primKey = 'node_id'

const sqlite3 = require('sqlite3').verbose()
const logger = require('./logger')
const { contextLoader } = require('./context')

function init() {
  let db
  try {
    db = openConnection(databaseName)
  } catch (err) {
    logger.log('debug', err.message)
  }

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (
      ${primKey} text NOT NULL UNIQUE PRIMARY KEY,
      first INTEGER DEFAULT 0,
      second INTEGER DEFAULT 0
    )`)
  })

  close(db)
}

function openConnection() {
  return new sqlite3.Database(
    `../ressources/${databaseName}.db`,
    sqlite3.OPEN_READWRITE,
    err => {
      if(err)
        throw err
      logger.log(
        'normal',
        'Connected to the api SQlite database.'
      )
    }
  )
}

function close(db) {
  if(!isDataBase) {
    return logger.log(
      'debug',
      'Cannot close objects who are not databases'
    )
  }

  db.close((err) => {
    if(err)
      return logger.log('debug', err.message)
    logger.log(
      'normal',
      'Connection to the database was correctly closed.'
    )
  })
}

function insertNode(db, id) {
  if(!isDataBase) {
    return logger.log(
      'debug',
      'Cannot insert a row in an object that is not a database.'
    )
  }
  
  db.openConnection()
  db.run(`INSERT INTO ${tableName}(${primKey}) VALUES(${id})`)
  close(db)
}

function insertMultipleNodes(db, nodesId) {
  if(!isDataBase) {
    return logger.log(
      'debug',
      `Cannot insert ${nodesId.length} rows in an object that is not a database.`
    )
  }

  db.openConnection()
  const sql = `INSERT ${tableName}(${primKey}) VALUES`
  nodesId.forEach(id => {
    sql += `(${id}), `
  })
  sql.slice(-2)

  db.run(sql)
  close(db)
}

function updateNode(db, id) {

}

function deleteNode(db, id) {

}

function isDataBase() {
  return db instanceof sqlite3.Database ? true : false
}