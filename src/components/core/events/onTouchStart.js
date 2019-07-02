import closest from '../../../utils/closest';
import extend from '../../../utils/extend';
import getNow from '../../../utils/getNow';
import { EVENT_TYPE } from '../constants';
/**
 * touchStart开始前
 * @param {Event} evt 事件对象
 *
 * 总结：
 * 1. 如果swiper处于animating状态，且preventInteractionOnTransition设置为true，则退出
 * 2. 如果不是touchEvents,
 *  2.1 如果which===3（就是不是点击鼠标的左键）则退出
 *  2.2 button属性大于0 则退出
 * 3. 如果isTouched为true且isMoved为true，则退出
 * 4. 如果noSwiping为true，且同时通过noSwipingSelector/noSwipingClass找到了父级元素，则退出
 * 5. 如果设置了swiperHandle，则如果没有找到则退出
 * 6. 如果设置了edgeSwipeDetection/iOSEdgeSwipeDetection，且如果当前的startX小于等于edgeSwipeThreshold/(window.screen.width - startX)小于等于edgeSwipeThreshold
 */
export default function onTouchStart (evt) {
    console.log('onTouchStart');
    if (!evt) {
        return;
    }
    const _that = this;
    const _params = _that.params || {};
    const _touchData = _that.touchEventsData || {};
    const _touches = _that.touches || {};
    if (_that.animating && _params.preventInteractionOnTransition) {
        return;
    }
    const _type = (evt.type || '') + '';
    _touchData.isTouchEvent = _type === 'touchstart';
    if (!_touchData.isTouchEvent && (('which' in evt && evt.which !== 1) ||
        ('button' in evt && evt.button !== 0))) {
        return;
    }
    if (_touchData.isTouched && _touchData.isMoved) {
        return;
    }
    if (_params.noSwiping && closest(evt.target, _params.noSwipingSelector ? _params.noSwipingSelector : _params.noSwipingClass)) {
        return;
    }
    if (_params.swipeHandle && !closest(evt.target, _params.swipeHandle)) {
        return;
    }
    _touches.currentX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.pageX;
    _touches.currentY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.pageY;
    const _startX = _touches.currentX;
    const _startY = _touches.currentY;
    const _edgeSwipeDetection = _params.edgeSwipeDetection || _params.iOSEdgeSwipeDetection;
    const _edgeSwipeThreshold = _params.edgeSwipeThreshold || _params.iOSEdgeSwipeThreshold;
    if (_edgeSwipeDetection &&
        ((_startX <= _edgeSwipeThreshold) ||
        (_startX >= (window.screen.width - _edgeSwipeThreshold)))) {
        return;
    }

    extend(_touchData, {
        isTouched: true,
        isMoved: false,
        isScrolling: undefined,
        startMoving: undefined,
        allowTouchCallbacks: true,
        touchStartTime: getNow()
    });
    _touches.startX = _startX;
    _touches.startY = _startY;
    _that.swipeDirection = undefined;
    if (_params.threshold > 0) {
        _touchData.allowThresholdMove = false;
    }
    if (!_touchData.isTouchEvent) {
        let _preventDefault = true;
        if (_touchData.formElements.test(evt.target.tagName)) {
            _preventDefault = false;
        }
        if (document.activeElement &&
            _touchData.formElements.test(document.activeElement.tagName) &&
            document.activeElement !== evt.target) {
            document.activeElement.blur();
        }
        const _shouldPreventDefault = _preventDefault && _that.allowTouchMove && _params.touchStartPreventDefault;
        if (_params.touchStartForcePreventDefault || _shouldPreventDefault) {
            evt.preventDefault();
        }
    }
    _that.$emit(EVENT_TYPE.TOUCH_START, evt);
}
