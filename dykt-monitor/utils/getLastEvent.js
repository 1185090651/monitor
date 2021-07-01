let lastEvent;
[
    'click',
    'dblclick',
    'mousedown',
    'mouseover',
    'mousemove',
    'mouseup',
    'mouseout',
    'contextmenu',
    'keyup',
    'keydown'
].forEach(eventType => {
    document.addEventListener(
        eventType,
        event => {
            lastEvent = event;
        },
        {
            capture: true, // 捕获阶段
            passive: true // 默认不阻止默认事件
        }
    );
});

export default function() {
    return lastEvent;
}
