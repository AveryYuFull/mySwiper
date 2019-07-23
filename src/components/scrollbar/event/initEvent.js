import initEventListener from '../../../utils/initEventListener';

/**
 * 注册／解除事件处理程序
 * @param {Boolean} flag 注册／解除
 */
export default function initEvent (flag) {
    const _that = this;
    const _scrollbar = _that.scrollbar || {};
    if (!_scrollbar.el) {
        return;
    }
    const _touchEvents = _that.touchEvents;
    initEventListener(_scrollbar.el, _touchEvents.start, _scrollbar.onStart, flag);
    initEventListener(_scrollbar.el, _touchEvents.move, _scrollbar.onMove, flag);
    initEventListener(_scrollbar.el, _touchEvents.end, _scrollbar.onEnd, flag);
}
