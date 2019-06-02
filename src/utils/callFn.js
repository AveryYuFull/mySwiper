/**
 * 同步执行方法
 * @param {Object|Function} dataFn 方法/默认结果
 * @param {Object|Array} params 参数
 * @param {*} context 执行环境
 * @returns {Object} 返回执行结果
 */
export default function callFn (dataFn, params, context) {
    let _res = dataFn;
    if (!(params instanceof Array)) {
        params = [params];
    }
    if (dataFn instanceof Function) {
        _res = dataFn.apply(context, params);
    }
    return _res;
}
