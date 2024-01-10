import axios from 'axios'
import {ACCESS_TOKEN} from "@/store/constant";
import {showFailToast} from "vant";
import storage from "@/store/store";
const baseUrl=process.env.VUE_APP_API_HOST
const secondUrl=process.env.VUE_APP_API_SECOND
const request=axios.create({
    baseURL:baseUrl,
    timeout:6000
})
const secondRequest=axios.create({
    baseURL:secondUrl,
    timeout:6000
})
function secondGet(params,url){
    return secondRequest({
        url:url,
        method:'get',
        params
    })
}
function post(data,url){
    return request({
        url:url,
        method:'post',
        data,
        transformRequest: [
            function (data) {
                   let token= storage.get(ACCESS_TOKEN)
                if(data)
                {
                    Object.assign(data,{zooToken:token})
                }
                else {
                    data={
                        zooToken: token
                    }
                }
                // 在请求之前对data传参进行格式转换
                return JSON.stringify(data)
            }
        ]
        // headers: {
        //     // 内容类型
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //     // Ajax请求
        //     'X-Requested-With': 'XMLHttpRequest'
        // }

        })
}
function get(data,url){
    return request({
        url:url,
        method:'get',
        data
    })
}

// 异常拦截处理器
const errorHandler = (error) => {
    console.log(error) // for debug
   showFailToast('无法连接服务')
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    const res = response.data

    if (res.code !== 0) {
        showFailToast(res.msg)
        return Promise.reject(new Error(res.msg || 'Error'))
    } else {
        return res
    }
}, errorHandler)
// response interceptor
secondRequest.interceptors.response.use((response) => {
    const res = response.data

    if (res.code !== 200) {
        showFailToast(res.msg)
        return Promise.reject(new Error(res.msg || 'Error'))
    } else {
        return res
    }
}, errorHandler)


export {post,get,secondGet}
