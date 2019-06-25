import each from './each';
let _isSupportTransform3d;
/**
 * 判读是否支持transform3d
 * @returns {Boolean}
 */
export default function isSupportTransform3d () {
    let _res;
    if (typeof _isSupportTransform3d === 'undefined') {
        _res = window.Modernizr && window.Modernizr.csstransforms3d === true;
        const _testDiv = document.createElement('div');
        const _style = _testDiv.style;
        const _vendors = ['webkitPerspective', 'MozPerspective', 'OPerspective', 'MsPerspective', 'perspective'];
        each(_vendors, (v) => {
            _res = v in _style;
            return _res;
        });
    } else {
        _res = _isSupportTransform3d;
    }
    return _res;
}
