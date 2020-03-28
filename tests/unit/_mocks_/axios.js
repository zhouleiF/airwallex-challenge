import axios from 'axios'
export const errorMessage = 'Bad Request: Email is already in use'

axios.post.mockImplementation((api, { email }) => {
  return email !== 'usedemail@airwallex.com' ? Promise.resolve('registed') : Promise.reject(errorMessage)
})

export default axios
