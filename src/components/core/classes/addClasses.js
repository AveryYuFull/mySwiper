import Device from '../../../utils/device';

/**
 * 为container元素添加classnames
 */
export default function () {
    const _that = this;
    const { classNames, params, el } = _that;
    const _suffixes = ['initialized', (params && params.direction) || 'horizontal'];

    if (Device.ios) {
        _suffixes.push('ios');
    }
    if (Device.android) {
        _suffixes.push('android');
    }

    const _classNames = _suffixes.map((suffix) => {
        return params.containerModifierClass + suffix;
    });
    _that.classNames = classNames.concat(_classNames);
    if (el) {
        _that.classNames.forEach((className) => {
            if (className) {
                el.classList.add(className);
            }
        });
    }
}
