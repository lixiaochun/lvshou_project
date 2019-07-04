import axios from 'axios'

const qs = function(data) {
  let url = ''
  for (var k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export const get = function(url, data) {
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export const post = function(url, data) {
  return axios.post(url, qs({
    ...data
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}
