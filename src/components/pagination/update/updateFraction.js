import getElements from '../../../utils/getElements';
import callFn from '../../../utils/callFn';
/**
 * 更新fraction
 * @param {HTMLElement} el pagination的dom元素节点
 * @param {Number} current 当前索引
 * @param {Number} total 总页面
 * @param {Object} pParams 参数
 */
export default function updateFraction (el, current, total, pParams) {
    const _curEl = getElements(`.${pParams.currentClass}`, el);
    if (_curEl && _curEl[0]) {
        _curEl[0].innerText = callFn(pParams.formatFractionCurrent || (current + 1), [current + 1]);
    }
    const _totalEl = getElements(`.${pParams.totalClass}`, el);
    if (_totalEl && _totalEl[0]) {
        _totalEl[0].innerText = callFn(pParams.formatFractionTotal || total, [total]);
    }
}
