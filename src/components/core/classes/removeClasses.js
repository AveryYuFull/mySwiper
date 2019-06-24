/**
 * 移除classNames
 */
export default function () {
    const _that = this;
    let { el, classNames } = _that;
    classNames = classNames || [];
    if (el) {
        classNames.forEach((className) => {
            if (className) {
                el.classList.remove(className);
            }
        });
    }
    _that.classNames = [];
}
