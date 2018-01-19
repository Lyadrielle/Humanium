module.exports = {
  log,
}

const allowedModes = ['normal', 'debug']

function log(_mode, message) {
  const currentModeValue = allowedModes.indexOf($env.LOG_MODE)
  const messageModeValue = allowedModes.indexOf(_mode)

  if (messageModeValue <= currentModeValue) {
    console.log(message)
  }
}
