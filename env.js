const defaultEnv = {
  LOG_MODE: 'debug',
  AES_KEY: 'meow'
}

module.exports = {
  ...defaultEnv,
  ...process.env,
}