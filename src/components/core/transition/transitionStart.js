import { EVENT_TYPE } from "../constants";

/**
 * 开始滑动动画
 * @param {Boolean} runCallbacks 是否冒泡事件
 * @param {String} dir 移动方向
 */
export default function transitionStart (runCallbacks, dir) {
    const _that = this;
    const _activeIndex = _that.activeIndex;
    const _previousIndex = _that.previousIndex;
    if (!dir) {
        if (_activeIndex > _previousIndex) {
            dir = 'next';
        } else if (_activeIndex < _previousIndex) {
            dir = 'prev';
        } else {
            dir = 'reset';
        }
    }
    _that.$emit(EVENT_TYPE.TRANSITION_START);
    if (runCallbacks) {
        if (_dir === 'reset') {
            _that.$emit(EVENT_TYPE.SLIDE_RESET_TRANSITION_START);
            return;
        }

        _that.$emit(EVENT_TYPE.SLIDE_CHANGE_TRANSITION_START);
        if (_dir === 'prev') {
            _that.$emit(EVENT_TYPE.SLIDE_PREV_TRANSITION_START);
        } else if (_dir === 'next') {
            _that.$emit(EVENT_TYPE.SLIDE_NEXT_TRANSITION_START);
        }
    }
}
