const defaultEnv = {
  LOG_MODE: 'debug',
  AES_KEY: 'meow',
  API_PORT: 42000,
  PORT: 42042,
  PRODENV: false,
}

module.exports = {
  ...defaultEnv,
  ...process.env,
}