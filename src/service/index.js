import axios from 'axios'

axios.interceptors.response.use(response => response, error => {
  const { response } = error
  if (response && response.status === 400 && response.data && response.data.errorMessage) return Promise.reject(response.data.errorMessage)
  return Promise.reject(error)
})

const api = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'

// usedemail@airwallex.com
export default function (params = {}) {
  let error = null
  if (!params.name) {
    error = 'Full name is required'
    return Promise.reject(error)
  }
  if (!params.email) {
    error = 'Email is required'
    return Promise.reject(error)
  }
  return axios.post(api, params)
}
