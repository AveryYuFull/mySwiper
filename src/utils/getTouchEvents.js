import isPointerEvents from './isPointerEvents';
import isPrefixPointerEvents from './isPrefixPointerEvents';
import isTouch from './isTouch';
/**
 * 获取touch事件
 * @param {Boolean} forceTouch 是否强制使用touch事件
 * @returns {Object}
 */
export default function getTouchEvents (forceTouch) {
    let _res;
    if (isTouch || forceTouch) {
        _res = {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend'
        };
    } else if (isPointerEvents) {
        _res = {
            start: 'pointerdown',
            move: 'pointermove',
            end: 'pointerup'
        };
    } else if (isPrefixPointerEvents) {
        _res = {
            start: 'MsPointerDown',
            move: 'MsPointerMove',
            end: 'MsPointerUp'
        };
    }

    return _res || {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    };
}
