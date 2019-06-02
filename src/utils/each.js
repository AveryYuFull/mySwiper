import isArrayLike from './isArrayLike';
import callFn from './callFn';

/**
 * 迭代数组/类数组/对象
 * @param {Array|Object} obj 集合
 * @param {Function} cb 回调方法
 * @returns {Object|Array} 返回当前迭代对象
 */
export default function each (obj, cb) {
    if (!obj || !cb) {
        return obj;
    }
    const _isArray = isArrayLike(obj);
    if (_isArray) {
        for (let i = 0; i < obj.length; i++) {
            let _res = callFn(cb, [obj[i], i, obj]);
            if (_res === false) {
                break;
            }
        }
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let _res = callFn(cb, [obj[key], key, obj]);
                if (_res === false) {
                    break;
                }
            }
        }
    }
    return obj;
}
