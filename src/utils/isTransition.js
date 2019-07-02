import each from './each';
let _isTransition;
/**
 * 判断是否支持transition
 * @returns {Boolean} 返回是否支持transition动画
 */
export default function isTransition () {
    let _res = false;
    if (typeof _isTransition === 'undefined') {
        const _testDiv = document.createElement('div');
        const _vendors = ['webkitTransition', 'MozTransition', 'OTransition', 'msTransition', 'transition'];
        const _styles = _testDiv.style;
        each(_vendors, (v) => {
            _res = v in _styles;
            return !_res;
        });
    } else {
        _res = _isTransition;
    }
    return _res;
}
