import getSelector from '../utils/getSelector';
import Tracker from '../utils/tracker';
import { KIND, TYPE } from '../config';

const { EXPERIENCE } = KIND;
const { IS_RENDER } = TYPE;

// 判断某个元素是否存在渲染
export default function monitorElement(
    { host, project, logStore },
    ele
) {
    if (!host || !project || !logStore) {
        throw new Error('server config missing');
    }
    if (!ele) {
        throw new Error('element missing');
    }
    const tracker = new Tracker(
        `http://${project}.${host}/logstores/${logStore}/track`
    );
    if (Array.isArray(ele)) {
        // if (!IS_PRODUCTION) {
        //     console.info(`当前您传入了${ele.length}个元素${ele}`);
        // }
        ele.forEach(item => {
            searchingSelector(item, tracker);
        });
    } else {
        searchingSelector(ele, tracker);
    }
}

function searchingSelector(ele, tracker) {
    let eleArr = document.querySelectorAll(ele);
    if (!eleArr.length) {
        // if (IS_PRODUCTION) {
            tracker.send({
                kind: EXPERIENCE,
                type: IS_RENDER,
                elementName: ele
            });
        // } else {
        //     console.info(
        //         `当前查询的元素是${ele}，页面中未发现此元素，检查下是不是写错啦`
        //     );
        // }
        return;
    }
    eleArr.forEach((eleItem, index) => {
        // console.info(
        //     `当前查询的是第${index + 1}个${ele}，元素位置是${getSelector(
        //         eleItem
        //     )}`
        // );
    });
}
