import axios from 'axios'
import url from 'url'

const apiDevPort = 42000
const clientDevPort = 3000
const { origin } = window.location
const apiUrl = url.resolve(origin.replace(clientDevPort, apiDevPort), '/api')

async function get({ path, params = {}, headers = {} }) {
  const request = await axios.get(`${apiUrl}/${path}`, { headers, params })
  return request.data
}

async function post({ path, body = {}, headers = {}, params = {} }) {
  const request = await axios.post(`${apiUrl}/${path}`, body, { headers, params })
  return request.data
}

function generateVideoLink(id) {
  return `${apiUrl}/film/video?id=${id}`
}

export default { get, post, generateVideoLink }