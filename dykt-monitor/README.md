# @dykt/monitor



## git 地址

https://gitee.com/dykt/dykt-monitor/tree/master/dykt-monitor




## install

```shell
npm install @dykt/monitor -S --registry=https://npmjs.dykt123.com
```



## 简介

@dykt/monitor 总体是用来全局监听项目报错及一些性能指标，服务器将这些数据存储起来，并进行数据分析和可视化，对于数据异常的部分可以进行及时报警，即使问题没有在测试阶段检测出来，也可以在项目上线后将用户使用出现的报错更早的收集起来，并加入性能指标数据，用于后面分析优化，提升用户体验。

项目具有如下功能：

- 监听全局 error 
- 统计性能指标
- 监听元素是否渲染



## 配置

测试使用的后端是阿里云的日志服务，使用本工具的地方需要传入服务器的配置参数

- host 服务器主机地址
- project 日志项目名称
- logStore 日志存储库

由于需要区分不同的项目，所以这里是要求开发者传入不同的项目名。在主入口文件已经暴露了一个 `PRODUCT` 配置，具体可以传入的键值如下

```js
// 项目列表
export const PRODUCT = {
    DYKT: 'DYKT', // pc主站
    MDYKT: 'MDYKT', // 移动端主站
    BACKDYKT: 'BACKDYKT', // 后台
    DYZY: 'DYZY', // 道远作业
    DYTK: 'DYTK', // 道远题库
    DYTKH5: 'DYTKH5', // 道远题库H5
    GKZY: 'GKZY', // 高考志愿
    ZFLJ: 'ZFLJ', // 支付链接
    DYJS: 'DYJS' // 道远教师
}
```

当新产品加入，开发可以手动传入项目名，具体规则遵循上面即可。



## 监听全局 ERROR

```js
import DyktMonitor from '@dykt/monitor'
const config = {
  	host: 'cn-beijing.log.aliyuncs.com',
  	project: 'dyktmonitortest',
  	logStore: 'dyktmonitor-store'
}
new DyktMonitor(config)
```



## 统计性能指标

这个模块会随主模块 DyktMonitor 实例化时自执行，将统计性能的指标发送给服务器



## 监听元素是否渲染

这个功能主要是监听一些主要模块是否能在页面中显示，并没有测试功能，开发需要传入当前页面需要监听的元素，由于都需要与服务器关联，所以这里也需要传入配置，如下

```js
import { monitorElement } from './dykt-monitor'
export default {
  data() {
    return {
    };
  },
  mounted() {
    monitorElement(config,['button', 'a']) // 一个直接传 多个传数组
  }
}
```

