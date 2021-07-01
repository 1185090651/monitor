import onload from '../utils/onload';

import { KIND, TYPE } from '../config';

const { EXPERIENCE } = KIND;
const { PAINT } = TYPE;

export function timing(tracker) {
    // 不支持的浏览器不进行监测性能
    if (!PerformanceObserver) {
        return;
    }
    const performance =
        window.performance || window.msPerformance || window.webkitPerformance;
    let LCP, FP, FCP;
    // 兼容搜狗高速浏览器
    try {
        new PerformanceObserver((entryList, observer) => {
            let perfEntries = entryList.getEntries();
            LCP = perfEntries[0];
            observer.disconnect(); // 不再观察
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
        LCP = 'null'
    }
    onload(() => {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart
            } = performance.timing;
            FP = performance.getEntriesByName('first-paint')[0]
            FCP = performance.getEntriesByName('first-contentful-paint')[0];
            tracker.send({
                kind: EXPERIENCE, // 用户体验指标
                type: PAINT, //统计每个阶段的时间
                connectTime: connectEnd - connectStart, // 连接时间
                ttfbTime: responseStart - requestStart, // 首字节到达时间
                responseTime: responseEnd - responseStart, // 响应读取时间
                parseDOMTime: loadEventStart - domLoading, // DOM解析时间
                domContentLoadedEventTime:
                    domContentLoadedEventEnd - domContentLoadedEventStart, // ready
                timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
                loadTime: loadEventStart - fetchStart, // 完整的加载时间
                // 发送性能指标
                firstPaint: FP.startTime,
                firstContentfulPaint: FCP.startTime,
                largestContentfulPaint: LCP.startTime
            });
        }, 3000);
    });
}
