const signature = require('./QcloudClsSignature');
const pbData = require('./test');
const axios = require('axios');

const SecretId = 'AKIDTmpmTtFwg9LFsEG8f3WjQr1uWryo6nw8';

const SecretKey = '4sOeeOr4apoZ6Yo7AwSkmZFfpkQDk2GM';

const Host = 'ap-beijing.cls.tencentcs.com';

const Authorization = signature(SecretId, SecretKey, 'POST', '/structuredlog',{},{'Host':Host, 'User-Agent':'AuthSDK'}, 300);
console.log(Authorization);
const instance = axios.create({
    baseURL: 'https://ap-beijing.cls.tencentcs.com',
    timeout: 1000,
    Authorization,
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-protobuf"
    },
})
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

instance.post('/structuredlog?topic_id=4d2aab40-9bb8-464d-887e-945770064af4', pbData).then(res=> {
  console.log(res);
})