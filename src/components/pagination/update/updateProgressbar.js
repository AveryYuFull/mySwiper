import getElements from '../../../utils/getElements';
import { styleName } from '../../core/constants';
import setStyle from '../../../utils/setStyle';
/**
 * 更新progress
 * @param {HTMLElement} el pagination的dom元素节点
 * @param {Number} current 当前索引
 * @param {Number} total 总页面
 * @param {Object} pParams 参数
 * @param {Boolean} isHorizontal swiper方向
 */
export default function updateProgressbar (el, current, total, pParams, isHorizontal) {
    let _progressbarDir;
    if (pParams.progressbarOpposite) {
        _progressbarDir = isHorizontal ? 'vertical' : 'horizontal';
    } else {
        _progressbarDir = isHorizontal ? 'horizontal' : 'vertical';
    }
    let _scale = (current + 1) / total;
    let _scaleX = 1;
    let _scaleY = 1;
    if (_progressbarDir === 'horizontal') {
        _scaleX = _scale;
    } else {
        _scaleY = _scale;
    }
    const _barEl = getElements(`.${pParams.progressbarFillClass}`, el);
    if (_barEl && _barEl[0]) {
        setStyle(_barEl[0], styleName.transform, `scaleX(${_scaleX}) scaleY(${_scaleY})`);
    }
}
