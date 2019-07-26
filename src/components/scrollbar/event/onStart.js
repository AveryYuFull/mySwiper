import { eventType, TOUCH_EVENT, MOUSE_EVENT, POINTER_EVENT } from '../../core/constants';

/**
 * 开始滑动
 * @param {Event} evt 事件对象
 */
export default function onStart (evt) {
    const _that = this;
    if (!evt) {
        return;
    }
    const _scrollbar = _that.scrollbar || {};
    const _evtType = (eventType[evt.type] || '') + '';
    if (_evtType !== TOUCH_EVENT) {
        if (('which' in evt && evt.which !== 1) ||
            ('button' in evt && evt.button !== 0)) {
            return;
        }
    }
    _scrollbar.initiated = _evtType;
}
