/**
 * 设置元素的属性值
 * @param {HTMLElement} el dom元素
 * @param {String} prop dom元素的属性
 * @param {String} val 值
 */
export default function setStyle (el, prop, val) {
    if (!el || !prop) {
        return;
    }
    el.style[prop] = val;
}
