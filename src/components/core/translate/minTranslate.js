/**
 * 获取最小可以滑动的translate
 * @returns {Number}
 */
export default function () {
    const _that = this;
    const _snapGrid = _that.snapGrid || [];
    return -(_snapGrid[0] || 0);
}
