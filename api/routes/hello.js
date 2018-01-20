module.exports = {
  type: 'GET',
  handler: hello,
}

async function hello() {
  return 'Hello World ! (nested version ;p)'
}