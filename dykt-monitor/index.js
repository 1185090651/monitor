import Tracker from './utils/tracker';
import { injectJsError, injectPromiseError, vueError } from './lib/jsError';
import { injectXHR } from './lib/xhrError';
import { timing } from './lib/timing';
import monitorElement from './lib/monitorElement';
let Vue;
try {
    Vue = require('vue').default;
} catch (error) {
    Vue = '';
}

class DyktMonitor {
    /**
     *
     * @param {object} config 服务器配置参数
     * @param {Object} Vue Vue 实例
     * @param config host: 主机地址 project: 日志项目名称 logStore: 日志存储库
     */
    constructor({ host, project, logStore }) {
        if (!host || !project || !logStore) {
            throw new Error('server config missing');
        }
        this.tracker = new Tracker(
            `http://${project}.${host}/logstores/${logStore}/track`
        );
        this.init();
    }
    init() {
        Vue ? vueError(Vue, this.tracker) : injectJsError(this.tracker);
        injectPromiseError(this.tracker);
        injectXHR(this.tracker);
        timing(this.tracker);
    }
}
if(window) {
    window.DyktMonitor = DyktMonitor,
    window.monitorElement = monitorElement;
} else {
    exports.DyktMonitor = DyktMonitor,
    exports.monitorElement = monitorElement;
}
