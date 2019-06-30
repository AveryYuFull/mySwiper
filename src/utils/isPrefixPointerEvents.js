import isBrowser from './isBrowser';
/**
 * 判断浏览器是否msPointerEvents
 * @returns {Boolean}
 */
const isPrefixPointerEvents = (function () {
    if (!isBrowser()) {
        return false;
    }

    return window.navigator.msPointerEnabled;
})();

export default isPrefixPointerEvents;
