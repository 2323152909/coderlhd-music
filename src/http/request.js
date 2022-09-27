import axios from 'axios'

const baseURL = 'http://music.coderlhd.life/api'

class Request {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  request(config) {
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: 5000
    })

    instance.interceptors.request.use(
      (req) => {
        return req
      },
      (error) => {
        return error
      }
    )

    instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (error) => {
        return error
      }
    )

    return instance(config)
  }

  get(url, params) {
    return this.request({ url, params, method: 'get' })
  }
  post(url, data) {
    return this.request({ url, data, method: 'post' })
  }
}

export default new Request(baseURL)
