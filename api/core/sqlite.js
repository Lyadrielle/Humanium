const sqlite3 = require('sqlite3').verbose()
const { log } = require('./logger')
const path = require('path')

const { contextLoader } = require('./context')

module.exports = {
  init,
  openConnection,
  close,
  isDataBase,
  isIdInDatabase,
  updateNode,
  getValueFromColumn,
  getPercentage,
  getTable,
}

const tableName = 'humanium_nodeStatistique'
const primKey = 'node_id'
const dbPath = `${path.resolve(__dirname, '../ressources')}/playersData.db`

/**
 * Initialise the database connexion and create table.
 * If exist just open connexion and close
 * @returns sqlite3.Database db
 */
function init(nodesId) {
  let db = new sqlite3.Database(
    dbPath,
    err => {
      if(err) return log('debug', err.message)
      log('debug', 'Connected to the api SQlite database.')
    }
  )

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} (
      ${primKey} text NOT NULL UNIQUE PRIMARY KEY,
      first INTEGER DEFAULT 0,
      second INTEGER DEFAULT 0
      )`,
      err => {
        if(err) return log('debug', err.message)
        log('debug', 'Connected to the api SQlite database.')
      }
    )
  })

  insertRows(db, nodesId)
  
  close(db)
  return db
}

/**
 * Open a connection to an existing database only
 * @param {*} dbPath database path
 */
function openConnection() {
  return new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE,
    err => {
      if(err) return log('debug', err.message)
    }
  )
}

/**
 * Close connection to opened database
 * @param {*} db opened database
 */
function close(db) {
  if(!isDataBase) {
    return log('debug', 'Cannot close objects who are not databases')
  }

  db.close((err) => {
    if(err) return log('debug', err.message)
    log('debug', 'Connection to the database was correctly closed.')
  })
}

/**
 * Check if db is a sqlite3.Database instance
 * @param {*} db suposed database
 */
function isDataBase(db) {
  return db instanceof sqlite3.Database ? true : false
}

/**
 * Insert many rows inside the only table of the database
 * @param {*} dbPath  path to open the db connection
 * @param {*} nodesId expect an array of primary unique
 *                    keys for rows creation
 */
function insertRows(db, nodesId) {
  const sql = `INSERT INTO ${tableName}(${primKey}) 
    VALUES${nodesId.map(id => '(?)').join(',')}`
  
  db.serialize(() => {
    db.run(sql, nodesId, err => {
      if (err) return log('debug', err.message);
      log('debug', `Rows inserted ${this.changes}`);
    })
  })
}

/**
 * Find an Id in the database
 * @param {*} db opened database
 * @param {*} id id to find
 * @returns Promise
 */
function isIdInDatabase(db, id) {
  const sql = `SELECT ${primKey} 
    FROM ${tableName} 
    WHERE ${primKey} = ?`
  
  return new Promise((resolve, reject) => {
    db.get(sql, id, (err, row) => {
      if(err) return reject(err)
      return resolve(row ? true : false)
    })
  })
}

/**
 * Get a value from an existing column and row
 * @param {*} db opened database
 * @param {*} id id of the row
 * @param {*} columnName name of the column
 * @returns Promise
 */
function getValueFromColumn(db, id, columnName) {
  const sql = `SELECT ${columnName}
    FROM ${tableName}
    WHERE ${primKey} = ?`
  
  return new Promise((resolve, reject) => {
    db.get(sql, id, (err, row) => {
      if(err) return reject(err)
      return resolve(row ? row[columnName] : null)
    })
  })
}

/**
 * Update existing node(row) inside the database
 * @param {*} db opened database
 * @param {*} id id of the row to update
 * @param {*} columnName name of the column to update
 */
function updateNode(db, id, columnName) {
  const sql = `UPDATE ${tableName}
    SET ${columnName} = ?
    WHERE ${primKey} = ?`
  
  getValueFromColumn(db, id, columnName)
    .then(result => {
      db.serialize( () => {
        db.run(sql, [(Number(result) || 0) + 1, id], err => {
          if (err) return log(err.message)
          log('debug', `Row(s) correctly insterted`)
          close(db)
        })
      })
    })
    .catch(err => {
      log('debug', err.message)
    })
}

function getPercentage(db, id, columnName) {
  const sql = `SELECT first, second
    FROM ${tableName}
    WHERE ${primKey} = ?`

    return new Promise((resolve, reject) => {
      db.get(sql, id, (err, row) => {
        if(err) return reject(err)
        return resolve(row
          ? (row[columnName]/(row['first'] + row['second'])) * 100
          : undefined
        )
      })
    })
}

function getTable(db) {
  const sql = `SELECT *
    FROM ${tableName}`

  return new Promise((resolve, reject) => {
    db.all(sql, (err, result) => {
      if(err) return reject(err)
      return resolve(result
        ? result
        : undefined)
    })
  })
}