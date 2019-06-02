import isArrayLike from './isArrayLike';
/**
 * 获取dom元素
 * @param {HTMLElement} el dom元素/选择器
 * @param {HTMLElement} pEl 父节点
 * @returns {Array} 元素列表
 */
export default function getElements (el, pEl = document) {
    if (el) {
        if (typeof el === 'string') {
            el = pEl.querySelectorAll(el);
        } else if (!isArrayLike(el)) {
            el = [el];
        }
    } else if (pEl && pEl !== document && pEl.children && pEl.children.length > 0) {
        el = pEl.children;
    }
    if (el && el.length === 0) {
        el = undefined;
    }
    if (el && !(el instanceof Array) && el.length < 1) {
        el = [el];
    }
    return el || [];
}
