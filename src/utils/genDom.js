import each from './each';
let _cacheDom = {};
/**
 * 创建dom元素
 * @param {String} tag 元素的tag名称
 * @param {Object} options 可选参数
 * @returns {HTMLElement} 返回创建的dom元素
 */
export default function genDom (tag, options) {
    tag = tag || 'div';
    options = options || {};
    let _dom = _cacheDom[tag] = _cacheDom[tag] || document.createElement(tag);
    if (_dom) {
        _dom = _dom.cloneNode(true);
        each(options, (item, key) => {
            if (key === 'className') {
                if (typeof item === 'string') {
                    item = [item];
                }
                if (item instanceof Array) {
                    _dom.className = item.join(' ');
                }
            }
        });
    }
    return _dom;
}
