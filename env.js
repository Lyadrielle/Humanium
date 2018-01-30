const defaultEnv = {
  LOG_MODE: 'debug',
  AES_KEY: 'meow',
  API_PORT: 42000
}

module.exports = {
  ...defaultEnv,
  ...process.env,
}