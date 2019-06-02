/**
 * 判断对象是否是window对象
 * @param {Object} obj 集合
 * @returns {Boolean}
 */
export default function isWindow (obj) {
    return obj !== null && obj === obj.window;
}
