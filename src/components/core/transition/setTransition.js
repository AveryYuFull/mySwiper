import setStyle from '../../../utils/setStyle';
import { styleName, EVENT_TYPE } from '../constants';
/**
 * 设置滑动动画时长
 * @param {Number} speed 动画时长
 */
export default function setTransition (speed) {
    const _that = this;
    const _wrapperEl = _that.wrapperEl;
    if (_wrapperEl) {
        setStyle(_wrapperEl, styleName.transitionDuration, `${speed || 0}ms`);
        _that.$emit(EVENT_TYPE.SET_TRANSITION, speed);
    }
}
