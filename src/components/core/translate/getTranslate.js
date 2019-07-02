import _getTranslate from '../../../utils/getTranslate';
/**
 * 获取元素的translate
 * @param {String} axis 方向
 * @returns {Number}
 */
export default function getTranslate (axis) {
    const _that = this;
    if (typeof axis === 'undefined') {
        axis = _that.isHorizontal() ? 'x' : 'y';
    }
    return _getTranslate(_that.wrapperEl, axis);
}
