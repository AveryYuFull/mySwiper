import extend from '../../../utils/extend';
import getNow from '../../../utils/getNow';
import { EVENT_TYPE } from '../constants';

/**
 * touchMove事件回调
 * @param {Event} evt 事件对象
 * 
 * 总结:
 * 1. 如果isTouched为false，则退出，如果isScrolling为true且startMoving为true，则冒泡touchMoveOpposite事件
 * 2. 如果touchmove事件类型和touchstart事件类型不一样，则退出
 * 3. 如果allowTouchMove为false，则退出
 * 4. 如果isTouchEvent为true，
 *  4.1 则如果touchReleaseOnEdge为true
 *     4.1.1 如果在最左边的slide，然后往右边滑动swiper，则退出
 *     4.1.2 如果在最右边的slide，然后往左边滑动swiper，则退出
 *  4.2 如果当前的target对象是指定的formElements，且当前的target对象获取到了焦点，则退出
 * 5. 如果滑动的距离小于指定的threshold，则退出
 */
export default function onTouchMove (evt) {
    if (!evt) {
        return;
    }
    const _that = this;
    const _params = _that.params || {};
    const _touchData = _that.touchEventsData || {};
    const _touches = _that.touches || {};
    if (!_touchData.isTouched) {
        if (_touchData.startMoving && _touchData.isScrolling) {
            _that.$emit(EVENT_TYPE.TOUCH_MOVE_OPPOSITE, evt);
        }
        return;
    }
    if (_touchData.isTouchEvent && evt.type !== 'touchmove') {
        return;
    }
    const _pageX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.pageX;
    const _pageY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.pageY;
    if (!_params.allowTouchMove) {
        if (_touchData.isTouched) {
            extend(_touches, {
                startX: _pageX,
                startY: _pageY,
                currentX: _pageX,
                currentY: _pageY
            });
            _touchData.touchStartTime = getNow();
        }
        return;
    }
    if (_touchData.isTouchEvent) {
        if (_params.touchReleaseOnEdges && !_params.loop) {
            if (((pageX < _touches.startX || pageY < _touches.startY) && _that.translate <= _that.maxTranslate()) ||
                ((pageX > _touches.startX || pageY > _touches.startY) && _that.translate >= _that.minTranslate())) {
                return;
            }
        } else if (document.activeElement) {
            if (document.activeElement === evt.target && _touchData.formElements.test(evt.target.tagName)) {
                return;
            }
        }
    }
    if (evt.targetTouches && evt.targetTouches.length > 1) { // 如果是多点触控，则退出
        return;
    }

    _touches.currentX = pageX;
    _touches.currentY = pageY;
    const _diffX = _touches.currentX - _touches.startX;
    const _diffY = _touches.currentY - _touches.startY;
    if (_params.threshold > 0 && Math.sqrt((_diffX ** 2) + (_diffY ** 2)) < _params.threshold) {
        return;
    }

    /**
     * 设置isScrolling
     */
    if (typeof _touchData.isScrolling === 'undefined') {
        let _isScrolling;
        if ((_that.isHorizontal() && _touches.currentY === _touches.startY) ||
            (_that.isVertical() && _touches.currentX === _touches.startX)) {
            _isScrolling = false;
        }
        if (((_diffX ** _diffX) + (_diffY ** _diffY)) >= 25) {
            let _touchAngle = (Math.atan2(Math.abs(_diffY), Math.abs(_diffX)) * 180) / Math.PI;
            _isScrolling = _that.isHorizontal() ? _touchAngle > _params.touchAngle : (90 - _touchAngle) > _params.touchAngle;
        }
        _touchData = _isScrolling;
    }
    /**
     * 设置startMoving
     */
    if (typeof _touchData.startMoving === 'undefined') {
        if (_touches.currentX !== _touches.startX ||
            _touches.currentY !== _touches.startY) {
            _touchData.startMoving = true;
        }
    }
    if (_touchData.isScrolling) {
        _that.$emit(EVENT_TYPE.TOUCH_MOVE_OPPOSITE, evt);
        return;
    }
    if (!_touchData.startMoving) {
        return;
    }
    evt.preventDefault();
    if (_params.touchMoveStopPropagation && !_params.nested) {
        evt.stopPropagation();
    }

    if (!_touchData.isMoved) {
        _that.setTransition(0);
        if (_that.animating) {
            // 如果，冒泡transitionend事件
        }
        _touchData.startTranslate = _that.getTranslate();
        // grab cursor
        if (_params.grabCursor && (_that.allowSlideNext || _that.allowSlidePrev)) {
            _that.setGrabCursor(true);
        }
        _that.$emit(EVENT_TYPE.SLIDER_FIRST_MOVE, evt);
    }
    _that.$emit(EVENT_TYPE.SLIDER_MOVE, evt);
    _touchData.isMoved = true;

     _diff = _that.isHorizontal() ? _diffX : _diffY;
    _touches.diff = _diff;
    _diff *= _params.touchRatio;
    _that.swipeDirection = _diff > 0 ? 'prev' : 'next';
    _touchData.currentTranslate = _diff + _touchData.startTranslate;
    let _resistanceRatio = _params.resistanceRatio;
    if (_params.touchReleaseOnEdges) {
        _resistanceRatio = 0;
    }
    if (_params.resistance) {
        if (_diff > 0 && _touchData.currentTranslate > _that.minTranslate()) {
            _touchData.currentTranslate = (_that.minTranslate() - 1) + (_touchData.currentTranslate - _that.minTranslate()) ** _resistanceRatio; 
        } else if (_diff < 0 && _touchData.currentTranslate < _that.maxTranslate()) {
            _touchData.currentTranslate = (_that.maxTranslate() + 1) - (_that.maxTranslate() - _touchData.currentTranslate) ** _resistanceRatio;
        }
    }
    // direction locked
    if ((!_that.allowSlideNext && _that.swipeDirection === 'next' && _touchData.currentTranslate < _touchData.startTranslate) ||
    !_that.allowSlidePrev && _that.swipeDirection === 'prev' && _touchData.currentTranslate > _touchData.startTranslate) {
        _touchData.currentTranslate = _touchData.startTranslate;
    }
    
    if (_params.followFinger) {
        return;
    }

    _that.setTranslate(_touchData.currentTranslate);
}
