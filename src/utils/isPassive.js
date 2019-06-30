/**
 * 判断浏览器是否支持设置passive事件监听器
 * @returns {Boolean} 返回浏览器是否支持passive事件监听器的flag
 */
const isPassive = (() => {
    let support = false;
    if (typeof window === 'undefined') {
        return support;
    }
    try {
        let opts = Object.defineProperty({}, 'passive', {
            get: function () {
                support = true;
            }
        });
        window.addEventListener('test', () => {}, opts);
    } catch (e) {}
    return support;
})();
export default isPassive;
