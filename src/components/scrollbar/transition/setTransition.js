import setStyle from '../../../utils/setStyle';
import { styleName } from '../../core/constants';
/**
 * 设置动画时长
 * @param {Number} duration 动画时长
 */
export default function setTransition (duration) {
    const _that = this;
    const _scrollbar = _that.scrollbar || {};
    if (!_scrollbar.dragEl) {
        return;
    }
    setStyle(_scrollbar.dragEl, styleName.transition, `${duration || 0}ms`);
}
