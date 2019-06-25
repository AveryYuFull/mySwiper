import { EVENT_TYPE, styleName } from '../constants';
import isTransition from '../../../utils/isTransition';

/**
 * 滑动到指定的slide
 * @param {Number} index slide索引
 * @param {Number} speed 滑动动画时间
 * @param {Boolean} runCallbacks 是否开启冒泡事件
 * @returns {Boolean}
 */
export default function slideTo (index, speed, runCallbacks = true) {
    const _that = this;
    let _slideIndex = index || 0;
    const _params = _that.params || {};
    speed = _params.speed || 0;
    const _activeIndex = _that.activeIndex || 0;
    const _previousIndex = _that.previousIndex;

    if (_that.animating && _params.preventInteractionOnTransition) {
        return;
    }
    const _slidesGrid = _that.slidesGrid;
    const _snapGrid = _that.snapGrid;
    if (_isEmpty(_slidesGrid) || _isEmpty(_snapGrid)) {
        return;
    }
    let _snapIndex = _getSnapIndex(_slideIndex, _params.slidesPerGroup, _snapGrid.length);
    let _translate = -_snapGrid[_snapIndex];
    if (_params.normalizeSlideIndex) {
        for (let i = 0; i < _slidesGrid.length; i++) {
            if (-Math.floor(_translate * 100) < _slidesGrid[i]) {
                break;
            }
            _slideIndex = i;
        }
    }
    if ((_activeIndex || _params.initialSlide || 0) === (_previousIndex || 0)) {
        _that.$emit(EVENT_TYPE.BEFORE_SLIDE_CHANGE_START);
    }
    if (_that.initialized && _slideIndex !== _activeIndex) {
        if ((!_that.allowSlideNext && _translate < _that.translate && _translate < _that.minTranslate()) ||
        (!_that.allowSlidePrev && _translate > _that.translate && _translate > _that.maxTranslate())) {
            return false;
        }
    }

    let _dir = 'reset';
    if (_slideIndex > _activeIndex) {
        _dir = 'next';
    } else if (_slideIndex < _activeIndex) {
        _dir = 'prev';
    }

    if (_that.translate === _translate) {
        _that.updateActiveIndex(_slideIndex);
        _that.updateSlidesClasses();

        if (_dir !== 'reset') {
            _that.transitionStart(runCallbacks, _dir);
            _that.transitionEnd(runCallbacks, _dir);
        }
        return false;
    }
    if (speed === 0 || !isTransition()) {
        _that.setTransition(0);
        _that.setTranslate(_translate);
        _that.updateActiveIndex(_slideIndex);
        _that.updateSlidesClasses();
        _that.$emit(EVENT_TYPE.BEFORE_TRANSITION_START);
        _that.transitionStart(runCallbacks, _dir);
        _that.transitionEnd(runCallbacks, _dir);
    } else {
        _that.setTransition(speed);
        _that.setTranslate(_translate);
        _that.updateActiveIndex(_slideIndex);
        _that.updateSlidesClasses();
        _that.$emit(EVENT_TYPE.BEFORE_TRANSITION_START);
        _that.transitionStart(runCallbacks, _dir);
        if (!_that.animating) {
            _that.animating = true;
            const _wrapperEl = _that.wrapperEl;
            if (!_that.onSlideToWrapperTransitionEnd) {
                _that.onSlideToWrapperTransitionEnd = function (evt) {
                    if (!_that || _that.destroyed ||
                        _that !== evt.target) {
                        return;
                    }
                    if (_wrapperEl) {
                        _wrapperEl.removeEventListener(styleName.transitionEnd, _that.onSlideToWrapperTransitionEnd);
                    }
                    _that.onSlideToWrapperTransitionEnd = null;
                    delete _that.onSlideToWrapperTransitionEnd;
                    _that.transitionEnd(runCallbacks, _dir);
                };
            }
            if (_wrapperEl) {
                _wrapperEl.addEventListener(styleName.transitionEnd, _that.onSlideToWrapperTransitionEnd);
            }
        }
    }
}

/**
 * 获取snapIndex
 * @param {Number} slideIndex slide索引
 * @param {Number} slidesPerGroup 每组slide个数
 * @param {Number} snapLen snapGrid的长度
 * @returns {Number} 返回snapIndex
 */
function _getSnapIndex (slideIndex, slidesPerGroup, snapLen) {
    slidesPerGroup = slidesPerGroup || 1;
    let _snapIndex = Math.floor(slideIndex / slidesPerGroup);
    if (_snapIndex < 0) {
        _snapIndex = 0;
    } else if (_snapIndex > snapLen - 1) {
        _snapIndex = snapLen - 1;
    }
    return _snapIndex;
}

/**
 * 判断是否为空
 * @param {Array} arr 目标数组
 * @returns {Boolean}
 */
function _isEmpty (arr) {
    return !arr || arr.length <= 0;
}
