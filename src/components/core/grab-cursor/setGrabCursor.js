import isTouch from '../../../utils/isTouch';
import setStyle from '../../../utils/setStyle';
/**
 * 设置cursor
 * @param {Boolean} moving 是否是移动状态
 */
export default function setGrabCursor (moving) {
    const _that = this;
    const _params = _that.params || {};
    const _el = _that.el;
    if (isTouch || _params.simulateTouch || !_el) {
        return;
    }
    let _styles;
    if (moving) {
        _styles = ['move', '-webkit-grabbing', '-moz-grabbing', 'grabbing'];
    } else {
        _styles = ['move', '-webkit-grab', '-moz-grab', 'grab'];
    }
    _styles.forEach((style) => {
        setStyle(_el, 'cursor', style);
    });
}
