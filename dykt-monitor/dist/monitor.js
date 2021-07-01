(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /*!
   * user-agent
   * Copyright(c) 2010-2011 TJ Holowaychuk.
   * Authored by TJ Holowaychuk
   * MIT Licensed
   */

  /**
   * Library version.
   */
  var version_1 = '1.0.4';
  /**
   * Parse the given user-agent string into an object of usable data.
   *
   * Example:
   *
   *      var userAgent = require('user-agent')
   *      userAgent.parse('Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/526.9 (KHTML, like Gecko) Version/4.0dp1 Safari/526.8')
   *      // => { name: 'safari', version: '4.0dp1', os: 'Windows XP', full: '... same string as above ...' }
   *
   * @param  {String} str
   * @return {Object}
   * @api public
   */

  var parse = function parse(str) {
    var agent = {
      full: str,
      name: name(str)
    };
    agent.version = version(str, agent.name);
    agent.fullName = agent.name + ' ' + agent.version;
    agent.os = os(str);
    return agent;
  };
  /**
   * Get the browser version based on the given browser name.
   *
   * @param  {String} str
   * @param  {String} name
   * @return {String}
   * @api private
   */


  function version(str, name) {
    if (name === 'safari') name = 'version';

    if (name) {
      return new RegExp(name + '[\\/ ]([\\d\\w\\.-]+)', 'i').exec(str) && RegExp.$1 || '';
    } else {
      var m = str.match(/version[\/ ]([\d\w\.]+)/i);
      return m && m.length > 1 ? m[1] : '';
    }
  }
  /**
   * Supported operating systems.
   */


  var operatingSystems = {
    'iPad': /ipad/i,
    'iPhone': /iphone/i,
    'Windows Vista': /windows nt 6\.0/i,
    'Windows 7': /windows nt 6\.\d+/i,
    'Windows 2003': /windows nt 5\.2+/i,
    'Windows XP': /windows nt 5\.1+/i,
    'Windows 2000': /windows nt 5\.0+/i,
    'OS X $1.$2': /os x (\d+)[._](\d+)/i,
    'Linux': /linux/i,
    'Googlebot': /googlebot/i
  };
  var osNames = Object.keys(operatingSystems);
  /**
   * Get operating system from the given user-agent string.
   *
   * @param  {String} str
   * @return {String}
   * @api private
   */

  function os(str) {
    var captures;

    for (var i = 0, len = osNames.length; i < len; ++i) {
      if (captures = operatingSystems[osNames[i]].exec(str)) {
        return ~osNames[i].indexOf('$1') ? osNames[i].replace(/\$(\d+)/g, function (_, n) {
          return captures[n];
        }) : osNames[i];
      }
    }

    return '';
  }
  /**
   * Supported browser names.
   */


  var names = ['opera', 'konqueror', 'firefox', 'chrome', 'epiphany', 'safari', 'msie', 'curl'];
  /**
   * Get browser name for the given user-agent string.
   *
   * @param  {String} str
   * @return {String}
   * @api private
   */

  function name(str) {
    str = str.toLowerCase();

    for (var i = 0, len = names.length; i < len; ++i) {
      if (str.indexOf(names[i]) !== -1) return names[i];
    }

    return '';
  }

  var userAgent = {
    version: version_1,
    parse: parse
  };

  var userAgent$1 = userAgent;

  function getExtraData() {
    return {
      title: document.title,
      url: location.href,
      timeStamp: Date.now(),
      'user-agent': userAgent$1.parse(navigator.userAgent).full
    };
  }

  var SendTracker = /*#__PURE__*/function () {
    function SendTracker(url) {
      _classCallCheck(this, SendTracker);

      this.url = url; // 上报的路径

      this.xhr = new XMLHttpRequest();
    }

    _createClass(SendTracker, [{
      key: "send",
      value: function send() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var extraData = getExtraData();

        var log = _objectSpread2(_objectSpread2({}, extraData), data); // 对象 的值不能是数字


        for (var key in log) {
          if (typeof log[key] === 'number') {
            log[key] = "".concat(log[key]);
          }
        }

        var body = JSON.stringify({
          __logs__: [log]
        }); // if (!IS_PRODUCTION) {
        //     console.info(log);
        // }

        this.xhr.open('POST', this.url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json'); // 请求体类型

        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0'); // 版本号

        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length); // 请求体大小

        this.xhr.onload = function () {// console.log(this.xhr.response);
        };

        this.xhr.onerror = function () {// console.log(error);
        };

        this.xhr.send(body);
      }
    }]);

    return SendTracker;
  }();

  var lastEvent;
  ['click', 'dblclick', 'mousedown', 'mouseover', 'mousemove', 'mouseup', 'mouseout', 'contextmenu', 'keyup', 'keydown'].forEach(function (eventType) {
    document.addEventListener(eventType, function (event) {
      lastEvent = event;
    }, {
      capture: true,
      // 捕获阶段
      passive: true // 默认不阻止默认事件

    });
  });
  function getLastEvent () {
    return lastEvent;
  }

  function getSelectors(path) {
    return path.reverse().filter(function (element) {
      return element !== document && element !== window;
    }).map(function (element) {
      var selector = '';

      if (element.id) {
        return "".concat(element.nodeName.toLowerCase(), "#").concat(element.id);
      } else if (element.className && typeof element.className === 'string') {
        return "".concat(element.nodeName.toLowerCase(), ".").concat(element.className);
      } else {
        selector = element.nodeName.toLowerCase();
      }

      return selector;
    }).join('>');
  }

  function getSelector (pathOrTarget) {
    if (Array.isArray(pathOrTarget)) {
      return getSelectors(pathOrTarget);
    } else {
      var path = [];

      while (pathOrTarget) {
        path.push(pathOrTarget);
        pathOrTarget = pathOrTarget.parentNode;
      }

      return getSelectors(path);
    }
  }

  function getLines(stack) {
    return stack.split('\n').slice(1).map(function (item) {
      return item.replace(/^\s+at\s+/g, '');
    }).join('^');
  }

  // 监控大指标
  var KIND = {
    STABILITY: 'stability',
    // 稳定性
    EXPERIENCE: 'experience' // 用户体验

  }; // 监控小指标

  var TYPE = {
    ERROR: 'error',
    // js、promise错误
    XHR: 'xhr',
    // xhr错误
    TIMING: 'timing',
    // 加载时间
    PAINT: 'paint',
    // 绘制
    IS_RENDER: 'isRender'
  }; // 错误类型

  var ERROR_TYPE = {
    JS_ERROR: 'jsError',
    // js错误
    PROMISE_ERROR: 'promiseError',
    // promise错误
    RESOURCE_ERROR: 'resourceError',
    // 资源加载错误
    LOAD: 'load',
    // 请求中
    ERROR: 'error',
    // 请求错误
    ABORT: 'abort' // 请求拒绝

  }; // export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  var STABILITY = KIND.STABILITY;
  var ERROR = TYPE.ERROR;
  var RESOURCE_ERROR = ERROR_TYPE.RESOURCE_ERROR,
      JS_ERROR = ERROR_TYPE.JS_ERROR,
      PROMISE_ERROR = ERROR_TYPE.PROMISE_ERROR;
  function injectJsError(tracker) {
    // 监听全局未捕获的js错误
    window.addEventListener('error', function (event) {
      // event 错误事件对象
      if (event.target && (event.target.src || event.target.href)) {
        tracker.send({
          kind: STABILITY,
          type: ERROR,
          errorType: RESOURCE_ERROR,
          // js/css脚本加载错误
          message: event.message,
          filename: event.target.src || event.target.href,
          tagName: event.target.tagName,
          selector: getSelector(event.target)
        });
      } else {
        var lastEvent = getLastEvent(); // 最后一个交互事件

        tracker.send({
          kind: STABILITY,
          // 监控指标的大类
          type: ERROR,
          // 小类型 这是一个错误
          errorType: JS_ERROR,
          // js 执行错误
          message: event.message,
          // 报错信息
          filename: event.filename,
          // 哪个文件报错了
          position: "".concat(event.lineno, ":").concat(event.colno),
          stack: getLines(event.error.stack),
          selector: lastEvent ? getSelector(lastEvent.path) : '' // 代表最后一个操作的元素

        });
      }
    }, true); // 在捕获阶段捕捉错误
  }
  function injectPromiseError(tracker) {
    // promise 错误
    window.addEventListener('unhandledrejection', function (event) {
      var lastEvent = getLastEvent(); // 最后一个交互事件

      var reason = event.reason;
      var message = '';
      var filename = '';
      var line = 0;
      var column = 0;
      var stack = '';

      if (typeof reason === 'string') {
        message = reason;
      } else if (_typeof(reason) === 'object') {
        // at http://localhost:8080/:23:34
        if (reason.stack) {
          var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }

        message = reason.message;
        stack = getLines(reason.stack);
      }

      setTimeout(function () {
        tracker.send({
          kind: STABILITY,
          type: ERROR,
          errorType: PROMISE_ERROR,
          // promise 错误
          message: message,
          filename: filename,
          position: "".concat(line, ":").concat(column),
          stack: stack,
          selector: lastEvent ? getSelector(lastEvent.path) : ''
        });
      }, 1000);
    });
  }
  function vueError(Vue, tracker) {
    Vue.config.errorHandler = function (err, vm, info) {
      console.error(err);
      var lastEvent = getLastEvent();
      tracker.send({
        kind: STABILITY,
        type: ERROR,
        errorType: JS_ERROR,
        message: err.message,
        stack: getLines(err.stack),
        info: info,
        selector: lastEvent ? getSelector(lastEvent.path) : ''
      });
    };
  }

  var STABILITY$1 = KIND.STABILITY;
  var XHR = TYPE.XHR;
  var LOAD = ERROR_TYPE.LOAD,
      ERROR$1 = ERROR_TYPE.ERROR,
      ABORT = ERROR_TYPE.ABORT;
  function injectXHR(tracker) {
    var XMLHttpRequest = window.XMLHttpRequest;
    var oldOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url, async) {
      if (!/logstores/.test(url) && !/sockjs/.test(url)) {
        this.logData = {
          method: method,
          url: url,
          async: async
        };
      }

      return oldOpen.apply(this, arguments);
    };

    var oldSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function (body) {
      var _this = this;

      if (this.logData) {
        var startTime = Date.now(); // 在发送之前记录开始的时间

        var handler = function handler(type) {
          return function () {
            var duration = Date.now() - startTime;
            var status = _this.status; // 200 500

            var statusText = _this.statusText; // OK Server Error

            if (status === 403 || status < 299) {
              return;
            }

            tracker.send({
              kind: STABILITY$1,
              type: XHR,
              eventType: type,
              // load error abort
              pathname: _this.logData.url,
              status: status + '-' + statusText,
              duration: duration,
              response: _this.response ? JSON.stringify(_this.response) : '',
              params: body || ''
            });
          };
        };

        this.addEventListener('load', handler(LOAD), false);
        this.addEventListener('error', handler(ERROR$1), false);
        this.addEventListener('abort', handler(ABORT), false);
      }

      return oldSend.apply(this, arguments);
    };
  }

  function onload (cb) {
    if (document.readyState === 'complete') {
      cb();
    } else {
      window.addEventListener('load', cb);
    }
  }

  var EXPERIENCE = KIND.EXPERIENCE;
  var PAINT = TYPE.PAINT;
  function timing(tracker) {
    // 不支持的浏览器不进行监测性能
    if (!PerformanceObserver) {
      return;
    }

    var performance = window.performance || window.msPerformance || window.webkitPerformance;
    var LCP, FP, FCP; // 兼容搜狗高速浏览器

    try {
      new PerformanceObserver(function (entryList, observer) {
        var perfEntries = entryList.getEntries();
        LCP = perfEntries[0];
        observer.disconnect(); // 不再观察
      }).observe({
        entryTypes: ['largest-contentful-paint']
      });
    } catch (error) {
      LCP = 'null';
    }

    onload(function () {
      setTimeout(function () {
        var _performance$timing = performance.timing,
            fetchStart = _performance$timing.fetchStart,
            connectStart = _performance$timing.connectStart,
            connectEnd = _performance$timing.connectEnd,
            requestStart = _performance$timing.requestStart,
            responseStart = _performance$timing.responseStart,
            responseEnd = _performance$timing.responseEnd,
            domLoading = _performance$timing.domLoading,
            domInteractive = _performance$timing.domInteractive,
            domContentLoadedEventStart = _performance$timing.domContentLoadedEventStart,
            domContentLoadedEventEnd = _performance$timing.domContentLoadedEventEnd,
            loadEventStart = _performance$timing.loadEventStart;
        FP = performance.getEntriesByName('first-paint')[0];
        FCP = performance.getEntriesByName('first-contentful-paint')[0];
        tracker.send({
          kind: EXPERIENCE,
          // 用户体验指标
          type: PAINT,
          //统计每个阶段的时间
          connectTime: connectEnd - connectStart,
          // 连接时间
          ttfbTime: responseStart - requestStart,
          // 首字节到达时间
          responseTime: responseEnd - responseStart,
          // 响应读取时间
          parseDOMTime: loadEventStart - domLoading,
          // DOM解析时间
          domContentLoadedEventTime: domContentLoadedEventEnd - domContentLoadedEventStart,
          // ready
          timeToInteractive: domInteractive - fetchStart,
          // 首次可交互时间
          loadTime: loadEventStart - fetchStart,
          // 完整的加载时间
          // 发送性能指标
          firstPaint: FP.startTime,
          firstContentfulPaint: FCP.startTime,
          largestContentfulPaint: LCP.startTime
        });
      }, 3000);
    });
  }

  var EXPERIENCE$1 = KIND.EXPERIENCE;
  var IS_RENDER = TYPE.IS_RENDER; // 判断某个元素是否存在渲染

  function monitorElement(_ref, ele) {
    var host = _ref.host,
        project = _ref.project,
        logStore = _ref.logStore;

    if (!host || !project || !logStore) {
      throw new Error('server config missing');
    }

    if (!ele) {
      throw new Error('element missing');
    }

    var tracker = new SendTracker("http://".concat(project, ".").concat(host, "/logstores/").concat(logStore, "/track"));

    if (Array.isArray(ele)) {
      // if (!IS_PRODUCTION) {
      //     console.info(`当前您传入了${ele.length}个元素${ele}`);
      // }
      ele.forEach(function (item) {
        searchingSelector(item, tracker);
      });
    } else {
      searchingSelector(ele, tracker);
    }
  }

  function searchingSelector(ele, tracker) {
    var eleArr = document.querySelectorAll(ele);

    if (!eleArr.length) {
      // if (IS_PRODUCTION) {
      tracker.send({
        kind: EXPERIENCE$1,
        type: IS_RENDER,
        elementName: ele
      }); // } else {
      //     console.info(
      //         `当前查询的元素是${ele}，页面中未发现此元素，检查下是不是写错啦`
      //     );
      // }

      return;
    }

    eleArr.forEach(function (eleItem, index) {// console.info(
      //     `当前查询的是第${index + 1}个${ele}，元素位置是${getSelector(
      //         eleItem
      //     )}`
      // );
    });
  }

  var Vue;

  try {
    Vue = require('vue')["default"];
  } catch (error) {
    Vue = '';
  }

  var DyktMonitor = /*#__PURE__*/function () {
    /**
     *
     * @param {object} config 服务器配置参数
     * @param {Object} Vue Vue 实例
     * @param config host: 主机地址 project: 日志项目名称 logStore: 日志存储库
     */
    function DyktMonitor(_ref) {
      var host = _ref.host,
          project = _ref.project,
          logStore = _ref.logStore;

      _classCallCheck(this, DyktMonitor);

      if (!host || !project || !logStore) {
        throw new Error('server config missing');
      }

      this.tracker = new SendTracker("http://".concat(project, ".").concat(host, "/logstores/").concat(logStore, "/track"));
      this.init();
    }

    _createClass(DyktMonitor, [{
      key: "init",
      value: function init() {
        Vue ? vueError(Vue, this.tracker) : injectJsError(this.tracker);
        injectPromiseError(this.tracker);
        injectXHR(this.tracker);
        timing(this.tracker);
      }
    }]);

    return DyktMonitor;
  }();

  if (window) {
    window.DyktMonitor = DyktMonitor, window.monitorElement = monitorElement;
  } else {
    exports.DyktMonitor = DyktMonitor, exports.monitorElement = monitorElement;
  }

})));
