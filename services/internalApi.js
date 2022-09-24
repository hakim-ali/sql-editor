import su from 'superagent'

class InternalApi {
  formatUrl(path) {
    return `/api/${path}`
  }

  get(urlPath) {
    return new Promise((resolve, reject) => {
      su.get(this.formatUrl(urlPath))
        .then((res) => {
          resolve(res.body)
        })
        .catch((err) => {
          reject(err.response.body)
        })
    })
  }
}

export default new InternalApi()
