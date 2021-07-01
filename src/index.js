import DyktMonitor,{ monitorElement } from '../dykt-monitor'

// new DyktMonitor()
// document.addEventListener('readystatechange', () => {
//     monitorElement(['.main', '#container'])
// })

const config = {
    host: 'cn-beijing.log.aliyuncs.com',
    project: 'dyktmonitortest',
    logStore: 'dyktmonitor-store'
}
new DyktMonitor(config)
// document.addEventListener('readystatechange', () => {
//     monitorElement(['.main', '#container'])
// })
window.addEventListener('ajaxReadyStateChange', function (e) {
    console.log(e, e);
    var xhr = e.detail,
        status = xhr.status,
        readyState = xhr.readyState,
        responseText = xhr.responseText;
 
    /**
     * 计算请求延时
     */
    if(readyState == 1){
        start_time = (new Date()).getTime();
    }
    if(readyState == 4){
        gap_time = (new Date()).getTime() - start_time;
    }
    /**
     * 上报请求信息
     */
    if(readyState == 4){
        // httpReport(gap_time, status, xhr.responseURL)
    }
 
})