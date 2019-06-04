import each from '../../../utils/each';
import { EVENT_TYPE } from '../constants';

/**
 * 滑动位置
 * @param {Number} index 目标slide索引
 * @param {Number} speed 速度
 * @param {Boolean} runCallbacks 是否冒泡事件
 */
export default function (index, speed, runCallbacks = true) {
    const _that = this;
    const _params = _that.params;
    const _snapGrid = _that.snapGrid;
    const _slidesGrid = _that.slidesGrid;
    const _activeIndex = _that.activeIndex;
    const _prevIndex = _that.previousIndex;

    // 获取到slideIndex／snapIndex
    const _slideIndex = _filterIndex(_that.slides, index);
    let _snapIndex = Math.floor((_slideIndex / _params.slidesPerGroup));
    _snapGrid = _filterIndex(_snapGrid, _snapIndex);

    const _translate = -_snapGrid[_snapIndex];
    // 如果开启序列花slideIndex，就执行序列化slideIndex
    if (_params.normalizeSlideIndex) {
        each(_slidesGrid, (slidePos, index) => {
            let _isCompare = -Math.floor(_translate * 100) >= Math.floor(slidePos * 100);
            if (_isCompare) {
                _slideIndex = index;
            }
            return _isCompare;
        });
    }

    // 如果没有开启了allowSlideNext/allowSlidePrev, 就开始执行滑动拦截
    if (_that.initialized && _slideIndex !== _that.activeIndex) {
        if ((!_that.allowSlideNext && _translate < _that.translate && _translate <= _that.minTranslate()) ||
        !_that.allowSlidePrev && _translate > _that.translate && _translate >= _that.maxTranslate()) {
            return;
        }
    }

    // 如果是第一次开启滑动，则抛出beforeSlideChangeStart事件
    if ((_activeIndex || _params.initialSlide || 0) === (_prevIndex || 0) &&
        runCallbacks) {
        _that.$emit(EVENT_TYPE.BEFORE_SLIDE_CHANGE_START, {
            previousIndex: _prevIndex,
            activeIndex: _activeIndex,
            slideIndex: _slideIndex,
            snapIndex: _snapIndex
        });
    }
 }

/**
 * 过滤索引
 * @param {Array} arr 目标数组
 * @param {Number} index 索引
 * @returns {Number} 返回过滤后的索引
 */
function _filterIndex (arr, index) {
    index = index || 0;
    const _len = (arr && arr.length) || 0;
    if (index < 0) {
        index = 0;
    } else if (index > _len - 1) {
        index = _len - 1;
    }
    return index || 0;
}
