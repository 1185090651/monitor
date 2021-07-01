# 前端监控报警

## 1. 前端监控目标

### 1.1 稳定性(stability)

| 错误名称 | 备注                        |
| -------- | --------------------------- |
| JS 错误  | JS 执行错误或者 promise异常 |
| 资源异常 | script、link 等资源加载异常 |
| 接口错误 | ajax 或 fetch 请求接口异常  |
| 白屏     | 页面空白                    |

### 1.2 用户体验(experience)

| 错误名称                                      | 备注                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| 加载时间                                      | 各个阶段的加载时间                                           |
| TTFB(Time To First Byte)(首字节时间)          | 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时间 |
| FP(First Paint)(首次绘制)                     | 首次绘制包含了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻 |
| FCP(First Content Paint)(首次内容复制)        | 首次内容绘制是浏览器将第一个 DOM 渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间 |
| FMP(First Meaningful Paint)(首次有意义的绘制) | 首次有意义的绘制是页面可用性的量度标准                       |
| FID(First Input Delay)(首次输入延迟)          | 用户首次和页面交互到页面响应交互时间                         |
| 卡顿                                          | 超过50ms的长任务                                             |

### 1.3 业务(business)

| 错误名称       | 备注                             |
| -------------- | -------------------------------- |
| PV             | page view 即页面的浏览量或点击量 |
| UV             | 指访问某个站点的不同IP地址的人数 |
| 页面的停留时间 | 用户在每个页面的停留时间         |

## 2. 前端监控流程

- 前端埋点
- 数据上报
- 分析和计算，将采集到的数据进行加工汇总
- 可视化展示，将数据按各种维度进行展示
- 监控报警，发现问题后按一定的条件触发报警

![](http://file-1252792890.file.myqcloud.com/tmp/4b4bcf0323331b073a32e419d663dfbd.jpg)

### 2.1 常见的埋点方案

#### 2.1.1 代码埋点

- 代理埋点，就是以嵌入代码的形式进行埋点。比如需要监控用户的点击事件，会选择在用户点击时，插入一段代码，保存这个监听行为或者直接将监听行为以某一种数据格式直接传递给服务端
- 优点是可以在任意时刻，精确的发送或保存所需要的数据信息
- 缺点是工作量较大

#### 2.1.2 可视化埋点

- 通过可视化交互的手段，代替代码埋点
- 将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输入的代码耦合了业务代码和埋点代码
- 可视化埋点其实是用系统代替手工插入埋点代码

#### 2.1.3 无痕埋点

- 前端的任意一个事件都被绑定一个标识，所有的事件都被记录下来
- 通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人士分析
- 无痕埋点的优点是采集全量数据，不会出现漏埋等现象
- 缺点是给数据和服务器增加压力，也无法灵活定制数据结构

## 3. 编写监控采集脚本

### 3.1 开通日志服务

- [日志服务(Log Service，简称SLS)](https://www.aliyun.com/product/sls?spm=5176.13910061.1kquk9v2l.5.37d161ca5JvcQu)是针对日志类数据一站式服务，用户无需开发就能快捷完成数据采集、消费、投递以及查询分析等功能，帮助提升运维，运营效率，建立 DT 时代海量日志处理能力
- [日志服务帮助文档](https://help.aliyun.com/product/28958.html?spm=a2c4g.11186623.6.540.3cca735dk0PGdV)
- [Web Tracking](https://help.aliyun.com/document_detail/31752.html?spm=a2c4g.11186623.2.29.5081729azDnI7N#t13028.html)

### 3.2 监控错误

#### 3.2.1 错误分类

##### 1. 稳定性

- JS错误
  - JS错误
  - Promise异常

- 资源异常
  - 监听 error

- 接口错误
- 页面白屏

##### 2. 用户体验

#### 3.2.2 数据结构设计

##### 1. jsError

```json
{
		kind: 'stability', // 监控指标的大类
    type: 'error', // 小类型 这是一个错误
    errorType: "jsError", // js 执行错误
    message: "Uncaught TypeError: Cannot set property 'error' of undefined", // 报错信息
    filename: "http://localhost:8080/", // 哪个文件报错了
    position: "25:30", // 报错位置
    stack: "errorClick (http://localhost:8080/:25:30)^HTMLButtonElement.onclick (http://localhost:8080/:11:44)", 		 // 报错的栈信息
    selector: "html>body>div#container>div.content>button",// 代表最后一个操作的元素
  	user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6)", // user-agent
  	timeStamp: "1602815114999", // 报错时间戳
  	title: "页面标题",
  	url: "http://localhost:8080/", // 报错地址
}
```

##### 2. promiseError

```json
{
		kind: 'stability', 
    type: 'error',
    errorType: "promiseError", // promise 错误
    message: "Uncaught TypeError: Cannot set property 'error' of undefined",
    filename: "http://localhost:8080/",
    position: "25:30",
    stack: "errorClick (http://localhost:8080/:25:30)^HTMLButtonElement.onclick (http://localhost:8080/:11:44)", 
    selector: "html>body>div#container>div.content>button",
  	user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6)",
  	timeStamp: "1602815114999", 
  	title: "页面标题",
  	url: "http://localhost:8080/",
}
```

##### 3. resourceError

```json
{
  	kind: "stability"
  	type: "error"
		errorType: "resourceError"
  	selector: "html>body>script"
		tagName: "SCRIPT"
		filename: "http://localhost:8080/someError.js"
		user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) 							Chrome/85.0.4183.121 Safari/537.36"
		timeStamp: "1602816627112"
		title: "前端监控SDK"
		url: "http://localhost:8080/"
}
```

##### 4. xhrError

```json
{		
  	kind: "stability"
  	type: "xhr"
  	eventType: "load"
		duration: "7"
		params: "name=dykt"
		pathname: "/error"
		response: ""
		status: "500-Internal Server Error"
  	user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) 	Chrome/85.0.4183.121 Safari/537.36"
		timeStamp: "1602816765539"
		title: "前端监控SDK"
		url: "http://localhost:8080/"
}
```

##### 5. experience

```json
{		
  	kind: "experience"
 		type: "timing"
		connectTime: connectEnd - connectStart, // 连接时间
    ttfbTime: responseStart - requestStart, // 首字节到达时间
    responseTime: responseEnd - responseStart, // 响应读取时间
    parseDOMTime: loadEventStart - domLoading, // DOM解析时间
    domContentLoadedEventTime: domContentLoadedEventEnd - domContentLoadedEventStart, // ready
    timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
    loadTime: loadEventStart - fetchStart // 完整的加载时间
  	user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
		timeStamp: "1602817062245"
		title: "前端监控SDK"
		url: "http://localhost:8080/"
}
```

##### 6. 性能指标

```json
{		
  	kind: "experience"
  	type: "paint"
  	firstContentfulPaint: "557.3949997778982" // FCP
		firstMeaningfulPaint: "557.3949997778982" // FMP
		firstPaint: "557.3799998965114" // FP
		largestContentfulPaint: "557.394" // LCP
  	user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
		timeStamp: "1602817063248"
		title: "前端监控SDK"
		url: "http://localhost:8080/"
}
```

##### 7. 检测某些元素是否渲染

```json
{
		kind: "experience",
  	type: "isRender",
  	elementName: ".main",
  	user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
		timeStamp: "1602817063248"
		title: "前端监控SDK"
		url: "http://localhost:8080/"
}
```

### 3.3 加载时间

[资料](https://segmentfault.com/a/1190000004466407)

#### 3.3.1 前端渲染流程

![](http://file-1252792890.file.myqcloud.com/tmp/3e25eb95be39fac6999818d385d68618.jpg)

#### 3.3.2 前端资源加载流程

![](http://file-1252792890.file.myqcloud.com/tmp/a05405b7c1da4b82b917a1e9518588ec.jpg)

#### 3.3.3 加载时间

| 阶段             | 描述                                 | 计算方式                                              | 意义                                                         |
| ---------------- | ------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------ |
| unload           | 前一个页面卸载耗时                   | unloadEventEnd - unloadEventStart                     | -                                                            |
| redirect         | 重定向耗时                           | redirectEnd - redirectStart                           | 重定向                                                       |
| appCache         | 缓存耗时                             | domainLookupStart - fetchStart                        | 读取缓存的时间                                               |
| dns              | DNS解析耗时                          | domainLookupEnd - domainLookupStart                   | 可观察域名解析服务是否正常                                   |
| tcp              | TCP连接耗时                          | connectedEnd - connectedStart                         | 建立连接的耗时                                               |
| ssl              | SSL安全连接耗时                      | connectEnd - secureConnectionStart                    | 反映数据连接建立耗时                                         |
| *ttfb            | Time to First Byte(TTFB)网络请求耗时 | responseStart - requestStart                          | TTFB是发出页面请求到应答数据第一个字节所话费的毫秒数         |
| *response        | 响应数据传输耗时                     | responseEnd - responseStart                           | 观察网络是否正常                                             |
| *dom             | DOM解析耗时                          | domInteractive - responseEnd                          | 观察DOM结构是否合理，是否有JS阻塞页面解析                    |
| *dcl             | DOMContentLoaded事件耗时             | domContentLoadedEventEnd - domContentLoadedEventStart | 当HTML文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，无需等待样式表、图像和子框架的完成加载 |
| resources        | 资源加载耗时                         | domComplete - domContentLoadedEnd                     | 可观察文档流是否过大                                         |
| *domReady        | DOM阶段渲染耗时                      | domContentLoadedEventEnd - fetchStart                 | DOM树和页面资源加载完成时间，会触发domComplete事件           |
| *首次渲染耗时    | 首次渲染耗时                         | responseEnd - fetchStart                              | 加载文档到看到第一帧非空白图像时间，也叫白屏时间             |
| 首次可交互时间   | 首次可交互时间                       | domInteractive - fetchStart                           | DOM树解析完成时间，此时Document.readyState为interactive      |
| 首包时间耗时     | 首包时间                             | responseStart - domainLookupStart                     | DNS解析到响应返回给浏览器第一个字节的时间                    |
| 页面完全加载时间 | 页面完全加载时间                     | loadEventStart - fetchStart                           | -                                                            |
| onLoad           | onLoad事件耗时                       | loadEventEnd - loadEventStart                         | -                                                            |

### 3.4 性能指标

| 字段 | 描述                                   | 备注                                                         |
| ---- | -------------------------------------- | ------------------------------------------------------------ |
| FP   | First Paint(首次绘制)                  | 包含了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻 |
| FCP  | First Content Paint(首次内容绘制)      | 是浏览器将第一个DOM渲染到屏幕的时间，可能是文本、图像、SVG等，这其实就是白屏时间 |
| FMP  | First Meaningful Paint(首次有意义绘制) | 页面有意义内容渲染的时间                                     |
| LCP  | Largest Contentful Paint(最大内容渲染) | 代表在viewport中最大的页面元素加载的时间                     |
| DCL  | DomContentLoaded(DOM加载完成)          | 当HTML文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，无需等待样式表、图像和子框架的完成加载 |
| L    | onLoad                                 | 当依赖的资源全部加载完毕之后才触发                           |
| TTI  | Time to Interactive(可交互时间)        | 用与标记应用已进行视觉渲染并能可靠响应用户输入的时间点       |
| FID  | First Input Delay                      | 用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间588 |

![](http://file-1252792890.file.myqcloud.com/tmp/a83ad0de2634d9e1546820d0a22bf124.jpg)

## 4. 问题及优化点

1. 服务器的数据统计
2. 服务器的监控报警条件
3. 不同浏览器或者app中的适配
4. 代码完善与优化
5. ......