import axios from 'axios'
const baseUrl = '/api/login'

const sendLoginInfo = async (username, password) => {
  const result = await axios.post(baseUrl, {
    username,
    password
  })
  return result.data
}

export default { sendLoginInfo }