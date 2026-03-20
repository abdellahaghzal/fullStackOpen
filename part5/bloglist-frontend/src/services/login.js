import axios from 'axios'
const baseURL = '/api/login'

const login = (credentials) => {
  return axios.post(baseURL, credentials)
}

export default { login }