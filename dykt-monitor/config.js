// 监控大指标
export const KIND = {
    STABILITY: 'stability', // 稳定性
    EXPERIENCE: 'experience' // 用户体验
}

// 监控小指标
export const TYPE = {
    ERROR: 'error', // js、promise错误
    XHR: 'xhr', // xhr错误
    TIMING: 'timing', // 加载时间
    PAINT: 'paint', // 绘制
    IS_RENDER: 'isRender'
}

// 错误类型
export const ERROR_TYPE = {
    JS_ERROR: 'jsError', // js错误
    PROMISE_ERROR: 'promiseError', // promise错误
    RESOURCE_ERROR: 'resourceError', // 资源加载错误
    LOAD: 'load', // 请求中
    ERROR: 'error', // 请求错误
    ABORT: 'abort' // 请求拒绝
}

// export const IS_PRODUCTION = process.env.NODE_ENV === 'production';