/**
 * 判读是否支持transform3d
 * @returns {Boolean}
 */
export default function isSupportTransform3d () {
    let _res = window.Modernizr && window.Modernizr.csstransforms3d === true;
    if (!_res) {
        const _testDiv = document.createElement('div');
        const style = _testDiv.style;
        _res = 'webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style;
    }
    return _res;
}
