import isPassive from './isPassive';
import each from './each';
/**
 * 注册/解除事件监听器
 * @param {Element} el 事件dom元素
 * @param {String|Array} types 事件类型
 * @param {Function} fn 事件回调方法
 * @param {Boolean} flag 注册/解除事件
 * @param {Boolean|Object} capture 可选参数
 * @param {*} context 执行回调方法上下文
 */
export default function initEventListener (el, types, fn, flag, capture, context) {
    if (!el || !types || types.length <= 0 || !fn) {
        return;
    }
    if (!(capture instanceof Object)) {
        capture = {
            passive: isPassive,
            capture: capture
        };
    }
    if (!(types instanceof Array)) {
        types = [types];
    }
    each(types, (type) => {
        _initEvent(type);
    });

    /**
     * 添加/解除事件
     * @param {String} type 事件类型
     */
    function _initEvent (type) {
        if (type) {
            el[(flag ? 'add' : 'remove') + 'EventListener'](type, fn.bind(context), capture);
        }
    }
}
