import onTouchStart from './onTouchStart';
import onTouchMove from './onTouchMove';
import onTouchEnd from './onTouchEnd';
import isTouch from '../../../utils/isTouch';
import isPassive from '../../../utils/isPassive';
import initEventListener from '../../../utils/initEventListener';
/**
 * 添加事件处理程序
 * @param {Boolean} flag 注册/解除事件
 */
function initEvents (flag) {
    const _that = this;
    const _touchEvents = _that.touchEvents || {};
    const _params = _that.params || {};
    const _target = _params.touchEventsTarget === 'container' ? _that.el : _that.wrapperEl;
    let _capture = {passive: false, capture: false};
    if (isTouch) {
        const _passiveListener = (_touchEvents.start === 'touchstart' && _params.passiveListeners && isPassive)
            ? {passive: true, capture: false} : false;
        _capture = [
            _passiveListener,
            {passive: false, capture: false},
            _passiveListener
        ];
    }
    initEventListener(_target, _touchEvents.start, onTouchStart, flag, _capture[0] || _capture, _that);
    initEventListener(document, _touchEvents.move, onTouchMove, flag, _capture[1] || _capture, _that);
    initEventListener(document, _touchEvents.end, onTouchEnd, flag, _capture[2] || _capture, _that);
}

export default {
    initEvents
};
