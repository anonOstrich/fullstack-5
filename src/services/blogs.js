
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateBlog = async  (updatedBlog) => {
  const result = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return result.data
}

const create = async (blog) => {

  console.log("token:", token)
  const result = await axios.post(baseUrl, blog, {
    headers: {Authorization: token}
  })
  return result.data
}
export default { getAll, setToken, create, updateBlog }