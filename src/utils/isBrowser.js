/**
 * 判断是否是浏览器环境
 * @returns {Boolean}
 */
export default function isBrowser () {
    return typeof window !== 'undefined';
}
