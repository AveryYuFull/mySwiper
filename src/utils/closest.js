import getElements from './getElements';
/**
 * 返回被选元素的第一个祖先元素。
 * @param {String|HTMLElement} 
 * @param {String|HTMLElement} pEl 规定缩小搜索祖先元素范围的选择器表达式、元素
 * @param {HTMLElement} context 在其内可以找到匹配元素的 DOM 元素
 * @returns {HTMLElement} 返回匹配到的祖先元素
 */
export default function closest (el, selector, context) {
    el = getElements(el)[0];
    el = document.querySelector(el);
    const matchesSelector = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector);
    if (!matchesSelector) {
        return null;
    }
    let _res;
    context = context || document;
    while (el) {
        if (el === context) {
            _res = null;
            break;
        }
        if (matchesSelector.call(el, selector)) {
            _res = el;
            break;
        }
        el = el.parentNode;
    }
    return _res;
}
