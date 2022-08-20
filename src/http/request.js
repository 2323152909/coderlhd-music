import axios from 'axios'

export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://coderlhd.life:9001',
    timeout: 5000
  })

  instance.interceptors.request.use(
    req => {
      return req
    },
    error => {
      return error
    }
  )

  instance.interceptors.response.use(
    res => {
      return res.data
    },
    error => {
      return error
    }
  )

  return instance(config)
}
