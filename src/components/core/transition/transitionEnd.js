import { EVENT_TYPE } from '../constants';

/**
 * transitionend的事件回调
 * @param {Boolean} runCallbacks 是否冒泡事件
 * @param {String} dir 移动方向
 */
export default function transitionEnd (runCallbacks, dir) {
    const _that = this;
    _that.animating = false;
    _that.setTransition(0);
    if (!dir) {
        const _activeIndex = _that.activeIndex;
        const _previousIndex = _that.previousIndex;
        if (_activeIndex < _previousIndex) {
            dir = 'prev';
        } else if (_activeIndex > _previousIndex) {
            dir = 'next';
        } else {
            dir = 'next';
        }
    }

    _that.$emit(EVENT_TYPE.TRANSITION_END);
    if (runCallbacks) {
        if (dir === 'next') {
            _that.$emit(EVENT_TYPE.SLIDE_RESET_TRANSITION_END);
            return;
        }
        _that.$emit(EVENT_TYPE.SLIDE_CHANGE_TRANSITION_END);
        if (dir === 'prev') {
            _that.$emit(EVENT_TYPE.SLIDE_PREV_TRANSITION_END);
        } else if (dir === 'next') {
            _that.$emit(EVENT_TYPE.SLIDE_NEXT_TRANSITION_END);
        }
    }
}
