import onload from '../utils/onload'

export function blankScreen() {
    // 包裹元素
    let wrapperElements = ['body', 'html', '#container', '.content'];
    let emptyPoints = 0;
    function getSelector(element) {
        if (element.id) {
            return '#' + element.id
        } else if (element.className) { // a b c => .a.b.c
            return '.' + element.className.split(' ').filter(item => !!item).join('.');
        } else {
            return element.nodeName.toLowerCase();
        }
    }
    function isWrapper(element) {
        let selector = getSelector(element)
        if (wrapperElements.includes(selector)) {
            emptyPoints++;
        }
    }
    onload(function () {
        for (let i = 1; i <= 9; i++) {
            let xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2)
            let yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10)
            isWrapper(xElements[0])
            isWrapper(yElements[0])
        }
        if (emptyPoints > 16) {
            let centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            tracker.send({
                kind: 'stability',
                kind: 'blank',
                emptyPoints,
                screen: window.screen.width + 'X' + window.screen.height,
                viewPoint: window.innerWidth + 'X' + window.innerHeight,
                selector: getSelector(centerElements[0])
            })
        }
    })
}