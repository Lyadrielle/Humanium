const defaultEnv = {
  LOG_MODE: 'debug'
}

module.exports = {
  ...defaultEnv,
  ...process.env,
}