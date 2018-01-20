module.exports = {
  type: 'GET',
  handler: hello,
}

async function hello(title, content, encodage) {
  return 'Hello World !'
}