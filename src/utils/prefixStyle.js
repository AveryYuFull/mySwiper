import each from './each';
import isBrowser from './isBrowser';


const _vendor = (function () {
    let _prefix;
    if (isBrowser) {
        let domStyle = document.createElement('div').style;
        const _transformNames = {
            'webkit': 'WebkitTransform',
            'Moz': 'MozTransform',
            'O': 'OTransform',
            'ms': 'msTransform',
            'standard': 'transform'
        };
        each(_transformNames, (item, key) => {
            if (key && typeof domStyle[key] !== 'undefined') {
                _prefix = key;
                return false;
            }
        });
    }
    return _prefix || '';
})();

/**
 * 获取样式的prefix
 * @param {String} style 样式
 * @returns {String}
 */
export default function prefixStyle (style) {
    if (!style || !_vendor) {
        return style;
    }
    if (_vendor === 'standard') {
        if (style === 'transitionEnd') {
            style = 'transitionend';
        }
    } else {
        style = _transformNames + style.charAt(0).toLocaleUpperCase() + style.substr(1);
    }
    return style;
}
