/**
 * 获取最大可以滑动的translate
 * @returns {Number}
 */
export default function maxTranslate() {
    const _that = this;
    const _snapGrid = _that.snapGrid || [];
    return -(_snapGrid[_snapGrid.length - 1] || 0);
}
