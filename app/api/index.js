import 'whatwg-fetch'
import config from 'configuration'

const isProd = process.env.NODE_ENV === 'production'
const qqinfoUrl = 'http://vczhan.com/api/qqinfo.php?qq='
const uploadUrl = isProd ? config.api.upload : 'http://localhost:8090/upload.php'

export default {
  // 获取QQ头像昵称
  getOwnerInfo (uin) {
    return fetch(qqinfoUrl + uin)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(new Error('get user info error'))
      })
      .catch(err => {
        console.error('something error: ' + err)
        return Promise.reject(err)
      })
  },
  postImage (blob) {
    const fd = new FormData
    fd.append('file', blob)

    // var xhr = new XMLHttpRequest
    // xhr.open('POST', 'http://localhost:8090/upload.php')
    // xhr.onload = function(res) {
    //   console.log(xhr.response)
    // }
    //
    // xhr.send(fd)

    return fetch(uploadUrl, {
      method: 'POST',
      // mode: 'cors',
      body: fd
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(new Error('get user info error'))
    })
    .catch(err => {
      console.error('something error: ' + err)
      return Promise.reject(err)
    })
  }
}
