import axios from 'axios'
const baseUrl = '/api/blog'

const localStorageTokenName = 'loggedBlogAppUser'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  window.localStorage.setItem(
    localStorageTokenName, JSON.stringify(user)
  )
}

const userStr = window.localStorage.getItem(localStorageTokenName)
const user = JSON.parse(userStr)
if (user) {
  setToken(user.token)
}

const config = {
  headers: { Authorization: token }
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (info) => {
  const request = axios.post(baseUrl, info, config)
  return request.then(response => response.data)
}

const like = (blog) => {
  const newLikes = {likes: blog.likes + 1}
  const request = axios.patch(`${baseUrl}/${blog.id}`, newLikes, config)
  return request.then(response => response.data)
}

const deleteBlog = (blog) => {
  return axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, setToken, create, like, deleteBlog }