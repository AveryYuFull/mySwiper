import getStyle from './getStyle';
/**
 * 获取元素的translate
 * @param {HTMLElement} el dom元素
 * @param {String} axis swiper方向
 * @returns {Number} 返回获取的translate
 */
export default function getTranslate(el, axis = 'x') {
    let _res;
    const _curStyle = getStyle(el);
    let _curTransform;
    let _transformMatrix;
    let _matrix;
    if (window.WebkitCSSMatrix) {
        _curTransform = _curStyle.transform || _curStyle.webkitTransform;
        if (_curTransform.split(', ').length > 6) {
            _curTransform = _curTransform.split(', ').replace(',', '.').join(', ');
        }
        _transformMatrix = new window.WebkitCSSMatrix(_curTransform === 'none' ? '' : _curTransform);
    } else {
        _curTransform = _curStyle.MozTransform || _curStyle.OTransform ||
            _curStyle.MsTransform || _curStyle.msTransform ||
            _curStyle.transform;
        _matrix = _curTransform.split(', ');
    }

    if (axis === 'x') {
        _res = _transformMatrix ? _transformMatrix.m41 : (_matrix[4] || _matrix[12]);
    } else {
        _res = _transformMatrix ? _transformMatrix.m42 : (_matrix[5] || _matrix[13]);
    }
    return parseFloat(_res || 0);
}
