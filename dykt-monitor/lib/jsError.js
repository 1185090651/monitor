import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import getLines from '../utils/getLines';

import { KIND, TYPE, ERROR_TYPE } from '../config'

const { STABILITY } = KIND;
const { ERROR } = TYPE;
const { RESOURCE_ERROR, JS_ERROR, PROMISE_ERROR } = ERROR_TYPE;


export function injectJsError(tracker) {
    // 监听全局未捕获的js错误
    window.addEventListener('error', event => { // event 错误事件对象
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({
                kind: STABILITY,
                type: ERROR,
                errorType: RESOURCE_ERROR, // js/css脚本加载错误
                message: event.message,
                filename: event.target.src || event.target.href,
                tagName: event.target.tagName,
                selector: getSelector(event.target)
            });
        } else {
            let lastEvent = getLastEvent(); // 最后一个交互事件
            tracker.send({
                kind: STABILITY, // 监控指标的大类
                type: ERROR, // 小类型 这是一个错误
                errorType: JS_ERROR, // js 执行错误
                message: event.message, // 报错信息
                filename: event.filename, // 哪个文件报错了
                position: `${event.lineno}:${event.colno}`,
                stack: getLines(event.error.stack),
                selector: lastEvent ? getSelector(lastEvent.path) : '',// 代表最后一个操作的元素
            });
        }
    }, true) // 在捕获阶段捕捉错误
}

export function injectPromiseError(tracker) {
    // promise 错误
    window.addEventListener('unhandledrejection', event => {
        let lastEvent = getLastEvent(); // 最后一个交互事件
        let { reason } = event;
        let message = '';
        let filename = '';
        let line = 0;
        let column = 0;
        let stack = '';
        if (typeof reason === 'string') {
            message = reason
        } else if (typeof reason === 'object') {
            // at http://localhost:8080/:23:34
            if (reason.stack) {
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
                filename = matchResult[1];
                line = matchResult[2];
                column = matchResult[3];
            }
            message = reason.message
            stack = getLines(reason.stack)
        }
        setTimeout(() => {
            tracker.send({
                kind: STABILITY,
                type: ERROR,
                errorType: PROMISE_ERROR, // promise 错误
                message,
                filename,
                position: `${line}:${column}`,
                stack,
                selector: lastEvent ? getSelector(lastEvent.path) : '',
            });
        }, 1000);
    })
}


export function vueError(Vue, tracker) {
    Vue.config.errorHandler = function(err, vm, info) {
        console.error(err);
        let lastEvent = getLastEvent();
        tracker.send({
            kind: STABILITY,
            type: ERROR,
            errorType: JS_ERROR,
            message: err.message,
            stack: getLines(err.stack),
            info,
            selector: lastEvent ? getSelector(lastEvent.path) : ''
        });
    };
}
