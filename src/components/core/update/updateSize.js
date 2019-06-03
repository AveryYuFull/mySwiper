import getStyle from '../../../utils/getStyle';
import extend from '../../../utils/extend';

/**
 * 更新SwiperContainer的大小
 */
export default function () {
    const _that = this;
    const { el, params } = _that;
    let _width;
    let _height;
    if (typeof params.width !== 'undefined') {
        _width = params.width;
    } else {
        _width = el.clientWidth;
    }
    if (typeof params.height !== 'undefined') {
        _height = params.height;
    } else {
        _height = el.clientHeight;
    }
    if ((_width === 0 && _that.isHorizontal()) ||
        (_height === 0 && _that.isVertical())) {
        return;
    }
    const _styles = getStyle(el);
    const _paddingLeft = _getStyle(_styles, 'paddingLeft');
    const _paddingRight = _getStyle(_styles, 'paddingRight');
    const _paddingTop = _getStyle(_styles, 'paddingTop');
    const _paddingBottom = _getStyle(_styles, 'paddingBottom');
    _width = _width - _paddingLeft - _paddingRight;
    _height = _height - _paddingBottom - _paddingTop;
    extend(_that, {
        width: _width,
        height: _height,
        size: _that.isHorizontal() ? _width : _height
    });
}

/**
 * 过滤样式属性
 * @param {String} styles 样式属性列表
 * @returns {Number} 返回过滤后的属性
 */
function _getStyle (styles, prop) {
    if (!styles || !prop) {
        return 0;
    }
    let _style = styles[prop];
    _style = (_style || '0') + '';
    _style = _style.replace(/[^-.\d+]/g, '');
    return parseFloat(_style, 10);
}
