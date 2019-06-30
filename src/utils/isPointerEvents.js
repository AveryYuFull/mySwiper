import isBrowser from './isBrowser';
/**
 * 判断是否支持pointerEvents
 * @returns {Boolean}
 */
const isPointerEvents = (function () {
    if (!isBrowser()) {
        return false;
    }

    return (window.navigator && window.navigator.pointerEnabled) ||
        (window.PointerEvent) ||
        ('maxTouchPoints' in window.navigator && (window.navigator.maxTouchPoints > 0));
})();

export default isPointerEvents;
