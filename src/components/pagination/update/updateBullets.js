import getStyle from '../../../utils/getStyle';
import each from '../../../utils/each';
import setStyle from '../../../utils/setStyle';
import addRemoveClass from '../../../utils/addRemoveClass';
/**
 * bullet的大小map
 */
const bulletSizeMap = {
    'horizontal': ['width', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight'],
    'vertical': ['height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom']
};

/**
 * 更新bullets
 * @param {Object} pagination pagination对象
 * @param {Object} pParams pagination参数
 * @param {Number} current 当前索引
 * @param {Number} total 总索引
 * @param {Number} previousIndex 上次索引
 * @param {Boolean} isHorizontal swiper的方向
 */
export default function updateBullets (pagination, pParams, current, total, previousIndex, isHorizontal) {
    pagination = pagination || {};
    pParams = pParams || {};
    const _bullets = pagination.bullets;
    let _startIndex;
    let _endIndex;
    let _midIndex;
    let _bulletSize;
    let _bulletsSize;
    let _offset;
    let _dynamicBulletIndex = pagination.dynamicBulletIndex || 0;
    const _dynamicMainBullets = pParams.dynamicMainBullets || 1;
    addRemoveClass(_bullets, [pParams.bulletActiveClass,
        `${pParams.bulletClass}-prev-prev`,
        `${pParams.bulletClass}-prev`,
        `${pParams.bulletClass}-main`,
        `${pParams.bulletClass}-next`,
        `${pParams.bulletClass}-next-next`]);
    if (pParams.dynamicBullets) {
        _bulletSize = _getBulletSize(pagination.bullets[0], isHorizontal);
        _bulletsSize = Math.min(_bulletSize * total, _bulletSize * (_dynamicMainBullets + 4));
        setStyle(pagination.el, isHorizontal ? 'width' : 'height', `${_bulletsSize}px`);
        if (_dynamicMainBullets > 1 && typeof previousIndex !== 'undefined') {
            _dynamicBulletIndex += current - previousIndex;
            if (_dynamicBulletIndex < 0) {
                _dynamicBulletIndex = 0;
            } else if (_dynamicBulletIndex > _dynamicMainBullets - 1) {
                _dynamicBulletIndex = _dynamicMainBullets - 1;
            }
        }
        _startIndex = current - _dynamicBulletIndex;
        _endIndex = _startIndex + (_dynamicMainBullets - 1);
        _midIndex = (_startIndex + _endIndex) / 2;
        _offset = (_bulletsSize - _bulletSize) / 2 - _midIndex * _bulletSize;
    }
    each(_bullets, (bullet, index) => {
        let _className = [];
        if (index === current) {
            _className.push(pParams.bulletActiveClass);
        }
        if (pParams.dynamicBullets) {
            if (index >= _startIndex && index <= _endIndex) {
                _className.push(`${pParams.bulletClass}-main`);
            } else if (index === _startIndex - 2) {
                _className.push(`${pParams.bulletClass}-prev-prev`);
            } else if (index === _startIndex - 1) {
                _className.push(`${pParams.bulletClass}-prev`);
            } else if (index === _endIndex + 1) {
                _className.push(`${pParams.bulletClass}-next`);
            } else if (index === _endIndex + 2) {
                _className.push(`${pParams.bulletClass}-next-next`);
            }
            if (typeof _offset !== 'undefined') {
                setStyle(bullet, isHorizontal ? 'left' : 'top', `${_offset}px`);
            }
        }
        addRemoveClass(bullet, _className, true);
    });
}

/**
 * 获取bullet的大小
 * @param {HTMLElement} el bullet的dom元素节点
 * @param {Boolean} isHorizontal swiper是否是水平方向
 * @returns {Number} 返回bullet的大小
 */
function _getBulletSize (el, isHorizontal) {
    if (!el) {
        return 0;
    }
    const _style = getStyle(el);
    let _boxSizing = _style['boxSizing'];
    let _size = 0;
    const _sizeList = bulletSizeMap[isHorizontal ? 'horizontal' : 'vertical'];
    each(_sizeList, (prop, index) => {
        if (index >= 3) {
            if (_boxSizing !== 'border-box') {
                _size += _filterNum(prop);
            }
        } else {
            _size += _filterNum(prop);
        }
    });
    return _size;
    /**
     * 过滤数字字符串
     * @param {String} prop 属性
     * @returns {Number}
     */
    function _filterNum (prop) {
        if (!_style || !prop) {
            return 0;
        }
        let numStr = _style[prop] || '';
        return parseInt(numStr.replace(/[^-.\d+]/g, ''), 10);
    }
}
