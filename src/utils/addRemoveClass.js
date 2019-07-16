import each from './each';
/**
 * 为元素添加classname
 * @param {Array|HTMLElement} elems 目标元素
 * @param {Array|String} classNames class名称
 * @param {Boolean} isAdd 添加/移除class
 */
export default function addRemoveClass (elems, classNames, isAdd) {
    if (_isEmpty(elems) || _isEmpty(classNames)) {
        return;
    }
    elems = _toArray(elems);
    classNames = _toArray(classNames);
    each(elems, (elem) => {
        if (elem) {
            _addClass(elem, classNames);
        }
    });

    /**
     * 为元素添加classname
     * @param {*} el 目标元素
     * @param {*} classNames class名称
     */
    function _addClass (el, classNames) {
        each(classNames, (className) => {
            if (className && el && el.classList) {
                if (isAdd) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            }
        });
    }
}

/**
 * 转换成数组
 * @param {*} data 目标数据
 * @returns {Array}
 */
function _toArray (data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data;
}

/**
 * 判断数据是否为空
 * @param {*} data 数据
 * @returns {Boolean} 判断数据是否为空
 */
function _isEmpty (data) {
    return !data || data.length <= 0;
}
