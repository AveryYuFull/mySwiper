import getNow from '../../../utils/getNow';
/**
 * touchEnd回调
 * @param {Event} evt 事件对象
 * 总结：
 * 1. 如果isTouched为false
 *   1.1 如果isMoved为true，且params.grabCursor为true，则将setGrabCursor(false)
 *   1.2 否则设置isMoved为false，startMoving为false
 * 2. 如果isTouched/isMoved/params.grabCursor/allowSlideNext/allowSlidePrev为true，则调用setGrabCursor(false)
 * 3. 将isTouched/isMoved/startMoving设置为false
 * 4. 如果isTouched为false/isMoved为false/swiperDirection为空/currentTranslate===startTranslate/diff=0，则退出
 * 5. 获取stopIndex/groupSize
 * 6. 调用slideTo方法（包括longSwipes/shortSwipes）
 */
export default function onTouchEnd (evt) {
    const _that = this;
    const _params = _that.params || {};
    const _touchData = _that.touchEventsData || {};
    if (!_touchData.isTouched) {
        if (_touchData.isMoved && _params.grabCursor) {
            _that.setGrabCursor(false);
        }
        _touchData.isMoved = false;
        _touchData.startMoving = false;
        return;
    }
    if (_params.grabCursor && _touchData.isTouched && _touchData.isMoved && (_that.allowSlideNext || _that.allowSlidePrev)) {
        _that.setGrabCursor(false);
    }

    // Time diff
    const _touchEndTime = getNow();
    const _timeDiff = _touchEndTime - _touchData.touchStartTime;

    if (!_touchData.isTouched || !_touchData.isMoved || _touchData.diff === 0 ||
        !_that.swipeDirection || _touchData.currentTranslate === _touchData.startTranslate) {
        _touchData.isTouched = false;
        _touchData.isMoved = false;
        _touchData.startMoving = false;
        return;
    }
    _touchData.isTouched = false;
    _touchData.isMoved = false;
    _touchData.startMoving = false;

    const _currentPos = -_touchData.currentTranslate;

    const _slidesGrid = _that.slidesGrid || [];
    const _slidesSizeGrid = _that.slidesSizeGrid || [];
    const _slidesPerGroup = _params.slidesPerGroup || 1;
    let _stopIndex = 0;
    let _groupSize = _slidesSizeGrid[0];
    for (let i = 0; i < _slidesGrid.length; i += _slidesPerGroup) {
        if (typeof _slidesGrid[i + _slidesPerGroup] !== 'undefined') {
            if (_currentPos >= _slidesGrid[i] && _currentPos < _slidesGrid[i + _slidesPerGroup]) {
                _stopIndex = i;
                _groupSize = _slidesGrid[i + _slidesPerGroup] - _slidesGrid[i];
                break;
            }
        } else if (_currentPos >= _slidesGrid[i]) {
            _stopIndex = i;
            _groupSize = _slidesGrid[_slidesGrid.length - 1] - _slidesGrid[_slidesGrid.length - 2];
            break;
        }
    }
    const _ratio = (_currentPos - _slidesGrid[_stopIndex]) / _groupSize;
    /**
     * 长时间的滑动
     */
    let _slideIndex = _stopIndex;
    const _swipeDirection = (_that.swipeDirection || '') + '';
    if (_timeDiff > _params.longSwipesMs) {
        if (!_params.longSwipes) {
            _slideIndex = _that.activeIndex;
        } else if (_swipeDirection === 'next' &&
            _ratio >= _params.longSwipesRatio) {
            _slideIndex = _stopIndex + _slidesPerGroup;
        } else if (_swipeDirection === 'prev' &&
            _ratio > (1 - _params.longSwipesRatio)) {
            _slideIndex = _stopIndex + _slidesPerGroup;
        }
    } else {
        if (!_params.shortSwipes) {
            _slideIndex = _that.activeIndex;
        } else if (_swipeDirection === 'next') {
            _slideIndex = _stopIndex + _slidesPerGroup;
        } else if (_swipeDirection === 'prev') {
            _slideIndex = _stopIndex;
        }
    }
    if (typeof _slideIndex !== 'undefined') {
        _that.slideTo(_slideIndex);
    }
}
