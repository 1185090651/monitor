import { KIND, TYPE, ERROR_TYPE } from '../config';

const { STABILITY } = KIND;
const { XHR } = TYPE;
const { LOAD, ERROR, ABORT } = ERROR_TYPE;

export function injectXHR(tracker) {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async) {
        if (!/logstores/.test(url) && !/sockjs/.test(url)) {
            this.logData = { method, url, async };
        }
        return oldOpen.apply(this, arguments);
    };
    let oldSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        if (this.logData) {
            let startTime = Date.now(); // 在发送之前记录开始的时间
            let handler = type => () => {
                let duration = Date.now() - startTime;
                let status = this.status; // 200 500
                let statusText = this.statusText; // OK Server Error
                if (status === 403 || status < 299) {
                    return;
                }
                tracker.send({
                    kind: STABILITY,
                    type: XHR,
                    eventType: type, // load error abort
                    pathname: this.logData.url,
                    status: status + '-' + statusText,
                    duration,
                    response: this.response
                        ? JSON.stringify(this.response)
                        : '',
                    params: body || ''
                });
            };
            this.addEventListener('load', handler(LOAD), false);
            this.addEventListener('error', handler(ERROR), false);
            this.addEventListener('abort', handler(ABORT), false);
        }
        return oldSend.apply(this, arguments);
    };
}