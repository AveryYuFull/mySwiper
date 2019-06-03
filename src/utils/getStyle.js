/**
 * 获取元素的样式属性
 * @param {HTMLElement} el dom元素节点
 * @param {String} prop 属性
 * @returns {Array|String} 返回属性／属性列表
 */
export default function getStyle (el, prop) {
    if (!el) {
        return;
    }
    let _style;
    if (window && (window.getComputedStyle instanceof Function)) {
        _style = window.getComputedStyle(el, null);
    } else {
        _style = el.currentStyle;
    }
    if (prop && _style) {
        _style = _style[prop];
    }
    return _style;
}
