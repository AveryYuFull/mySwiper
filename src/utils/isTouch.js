import isBrowser from './isBrowser';
/**
 * 判读浏览器是否支持touch事件
 * @returns {Boolean}
 */
const isTouch = (function () {
    if (!isBrowser()) {
        return false;
    }

    let _res;
    if (window.Modernizr && window.Modernizr.touch === true) {
        _res = true;
    } else if (window.navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)) {
        _res = true;
    }
    return _res || false;
})();

export default isTouch;
