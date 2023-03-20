/* 对请求数据的封装 */
import axios from 'axios'
import { closeToast } from 'vant';
import {toast2} from '@/util/loading'
const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 10000,
    headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16665115104240601599967233","bc":"110100"}'
    }
})

// 在发请求之前拦截   showLoading
http.interceptors.request.use(function (config) {
    /* console.log('请求发出前执行的方法') */
    // Do something before request is sent
    toast2()
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

// 发请求之后拦截   hideLoading
 // Add a response interceptor
 http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("请求成功后,第一个调用的方法 ")
    // 设置token到locationStorage
    closeToast()
    return response
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    closeToast()
    return Promise.reject(error)
  })
export default http
