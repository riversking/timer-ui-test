import axios from 'axios'
import {Message} from 'element-ui'

// 请求拦截器
axios.interceptors.request.use(config => {
  return config
}, any => {
  Message.error({message: '请求超时!'})
  // return Promise.resolve(err); //  转换Promise对象
})
// 响应拦截器
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 500) {
    Message.error({message: data.data.msg})
    return
  }
  if (data.data.msg) {
    Message.success({message: data.data.msg})
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'})
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'})
  } else if (err.response.status === 401) {
    Message.error({message: err.response.data.msg})
  } else {
    if (err.response.data.msg) {
      Message.error({message: err.response.data.msg})
    } else {
      Message.error({message: '未知错误!'})
    }
  }
  // return Promise.resolve(err);
})

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) { // 允许在请求数据发送到服务器之前对其进行更改,只适用于'PUT'，'POST'和'PATCH'
      let ret = ''
      for (let it in data) {
        // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: { // 是要发送的自定义 headers
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${url}`
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${url}`
  })
}
