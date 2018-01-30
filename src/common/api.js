import axios from 'axios'

const apiPort = process.env.API_PORT || 42000
const { protocol, hostname } = window.location
const apiUrl = `${protocol}//${hostname}:${apiPort}/api/`

async function get({ path, params = {}, headers = {} }) {
  const request = await axios.get(`${apiUrl}${path}`, { headers, params })
  return request.data
}

async function post({ path, body = {}, headers = {}, params = {} }) {
  const request = await axios.post(`${apiUrl}${path}`, body, { headers, params })
  return request.data
}

export default { get, post }