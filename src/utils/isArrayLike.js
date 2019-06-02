import isWindow from './isWindow';
/**
 * 判断对象是否是类数组
 * @param {Object|Array} obj 对象
 * @returns {Boolean}
 */
export default function isArrayLike (obj) {
    if (!obj) {
        return false;
    }
    let _type = Object.prototype.toString.call(obj) || '';
    _type = (_type.split(' ') || [])[1] || '';
    _type = (_type.split(']') || [])[0] || '';
    let _length = obj.length;
    if (_type === 'Function' || isWindow(obj)) {
        return false;
    }
    if (obj.nodeType === 1 && _length) { // 元素节点
        return true;
    }
    return _type === 'Array' || _length === 0 ||
        (typeof _length === 'number' && _length > 0 && ((_length - 1) in obj));
}
