import getTranslate from '../../../utils/getTranslate';
/**
 * 获取元素的translate
 * @returns {Number}
 */
export default function getTranslate (axis) {
    const _that = this;
    if (typeof axis === 'undefined') {
        axis = _that.isHorizontal() ? 'x' : 'y';
    }
    return getTranslate(_that.wrapperEl, axis);
}
