import userAgent from 'user-agent';

// 获取额外的信息
function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timeStamp: Date.now(),
        'user-agent': userAgent.parse(navigator.userAgent).full
    };
}

export default class SendTracker {
    constructor(url) {
        this.url = url; // 上报的路径
        this.xhr = new XMLHttpRequest();
    }
    send(data = {}) {
        let extraData = getExtraData();
        let log = { ...extraData, ...data };
        // 对象 的值不能是数字
        for (const key in log) {
            if (typeof log[key] === 'number') {
                log[key] = `${log[key]}`;
            }
        }
        let body = JSON.stringify({
            __logs__: [log]
        });
        // if (!IS_PRODUCTION) {
        //     console.info(log);
        // }
        this.xhr.open('POST', this.url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json'); // 请求体类型
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0'); // 版本号
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length); // 请求体大小
        this.xhr.onload = () => {
            // console.log(this.xhr.response);
        };
        this.xhr.onerror = function() {
            // console.log(error);
        };
        this.xhr.send(body);
    }
}
