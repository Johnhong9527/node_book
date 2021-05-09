import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
// import {removeCookie} from '@/utils/auth'
// import { showLoading, hideLoading } from '@/utils/loading'

// 配置环境
const options = {
  // request请求路径前缀(/gateway-admin)
  // baseURL: process.env.VUE_APP_API_ROUTER
}
const instance = axios.create(options)

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 请求拦截进来调用显示loading效果
  // showLoading()
  // 断网提示
  if (!navigator.onLine) {
    ElMessageBox.alert(
      '您的网络故障，请检查!',
      '温馨提示',
      {
        confirmButtonText: '好的',
        type: 'warning'
      }
    )
  }
  return config
}, error => {
  console.log('请求拦截error', error)
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
instance.interceptors.response.use(response => {
  // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
  // setTimeout(() => {
  //   hideLoading()
  // }, 200)
  const {errcode, errmsg} = response.data
  if (response.status === 200 && errcode) {
    if (errcode !== 0 && errcode !== 99999) {
      // 10000: token过期
      if (errcode === 10000) {
        ElMessageBox.alert(
          '你已被登出，需要重新登录',
          '温馨提示',
          {
            confirmButtonText: '重新登录',
            type: 'warning',
            showClose: false
          }
        ).then(() => {
          // removeCookie()
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else {
        ElMessage.error(errmsg)
      }
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  } else {
    return response.data
  }
}, error => {
  // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
  // setTimeout(() => {
  //   hideLoading()
  // }, 200)
  console.log('http response - err', error)
  ElMessage({
    message: '服务器异常，请稍后再试',
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default instance