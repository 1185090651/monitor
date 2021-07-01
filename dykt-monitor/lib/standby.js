new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect(); // 不再观察
}).observe({entryTypes: ['element']}); // 观察页面中有意义的元素

new PerformanceObserver((entryList, observer) => {
    let lastEvent = getLastEvent();
    let firstInput = entryList.getEntries()[0];
    console.log('FID',firstInput);
    if(firstInput) {
        // processingStart 开始处理的时间 startTime 点击时间 差值就是处理的延迟
        let inputDelay = firstInput.processingStart - firstInput.startTime
        let duration = firstInput.duration; // 处理的耗时
        if (inputDelay > 0 || duration > 0) {
            tracker.send({
                kind: 'experience',
                type: 'firstInputDelay', // 首次输入延迟
                inputDelay,
                duration,
                startTime: firstInput.startTime,
                selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
            })
        }
    }
    observer.disconnect(); // 不再观察
}).observe({type: 'first-input', buffered: true}); 
// 用户的第一次交互 点击页面