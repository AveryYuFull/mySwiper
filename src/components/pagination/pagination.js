/* eslint-disable */
import getElements from '../../utils/getElements';
import addRemoveClass from '../../utils/addRemoveClass';
import extend from '../../utils/extend';
import callFn from '../../utils/callFn';
import getStyle from '../../utils/getStyle';
import each from '../../utils/each';
import setStyle from '../../utils/setStyle';
import './pagination.less';

/**
 * bullet的大小map
 */
const bulletSizeMap = {
    'horizontal': ['width', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight'],
    'vertical': ['height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom']
};
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

/**
 * 更新bullets
 * @param {Object} pagination pagination对象
 * @param {Object} pParams pagination参数
 * @param {Number} current 当前索引
 * @param {Number} total 总索引
 * @param {Boolean} isHorizontal swiper的方向
 */
function _updateBullets (pagination, pParams, current, total, isHorizontal) {
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

const Pagination = {
    /**
     * 更新
     */
    update () {
        const _that = this;
        const _params = _that.params || {};
        const _pParams = _params.pagination || {};
        const _pagination = _that.pagination || {};
        if (!_pParams.el || !_pagination.$el || _pagination.$el.length <= 0 ||
            !_pagination.el) {
            return;
        }
        const _snapGrid = _that.snapGrid || [];
        let _total = _snapGrid.length;
        let _current = (typeof _that.snapIndex !== 'undefined' ? _that.snapIndex : _that.activeIndex) || 0;
        const _type = (_pParams.type || '') + '';
        const _isHorizontal = _that.isHorizontal();
        switch (_type) {
            case 'bullets':
                _updateBullets(_pagination, _pParams, _current, _total, _isHorizontal);
                break;
        }
    },
    /**
     * 渲染
     */
    render () {
        const _that = this;
        const _params = _that.params || {};
        const _pParams = _params.pagination || {};
        const _pagination = _that.pagination || {};
        if (!_pParams.el || !_pagination.$el || _pagination.$el.length <= 0 ||
            !_pagination.el) {
            return;
        }
        const _type = (_pParams.type || '') + '';
        let _htmlText = '';
        switch (_type) {
            case 'bullets':
                const _snapGrid = _that.snapGrid || [];
                for (let i = 0; i < _snapGrid.length; i++) {
                    let _html;
                    if (_pParams.renderBullet instanceof Function) {
                        _html = callFn(_pParams.renderBullet, [i, _pParams.bulletClass]);
                    } else {
                        _html = `<${_pParams.bulletElement} class="${_pParams.bulletClass}"></${_pParams.bulletElement}>`;
                    }
                    _htmlText += _html;
                }
                break;
            case 'progressbar':
                if (_pParams.renderProgressbar instanceof Function) {
                    _htmlText = callFn(_pParams.renderProgressbar, [_pParams.progressbarFillClass]);
                } else {
                    _htmlText = `<span class="${_pParams.progressbarFillClass}"></span>`;
                }
                break;
            case 'fraction':
                if (_pParams.renderFraction instanceof Function) {
                    _htmlText = callFn(_pParams.renderFraction, [_pParams.currentClass, _pParams.totalClass]);
                } else {
                    const _curHtml = `<span class="${_pParams.currentClass}"></span>`;
                    const _totalHtml = `<span class="${_pParams.totalClass}"></span>`;
                    _htmlText = _curHtml + '/' + _totalHtml;
                }
                break;
        }
        _pagination.el.innerHTML = _htmlText;
        if (_type === 'bullets') {
            _pagination.bullets = getElements(`.${_pParams.bulletClass}`, _pagination.el);
        }
    },
    /**
     * 初始化
     */
    init () {
        const _that = this;
        const _params = _that.params || {};
        const _pParams = _params.pagination || {};
        if (!_pParams.el) {
            return;
        }
        let _$el = getElements(_pParams.el);
        if (_params.uniqueNavElements &&
            typeof _pParams.el === 'string' &&
            _$el && _$el.length > 0) {
            let _tmpEl = getElements(_pParams.el, _that.el);
            if (_tmpEl) {
                _$el = _tmpEl;
            }
        }
        if (!_$el || _$el.length <= 0) {
            return;
        }
        let _el = _$el[0];
        const _type = (_pParams.type || '') + '';
        let _classNames = [_pParams.modifierClass + _type];
        switch (_type) {
            case 'bullets':
                if (_pParams.dynamicBullets) {
                    _classNames.push(_pParams.modifierClass + _type + '-dynamic');
                    _that.pagination.dynamicBulletIndex = 0;
                    if (_pParams.dynamicMainBullets < 1) {
                        _pParams.dynamicMainBullets = 1;
                    }
                }
                if (_pParams.clickable) {
                    _classNames.push(_pParams.clickableClass);
                    _el.addEventListener('click', (evt) => {
                        const _bullets = _that.pagination.bullets || [];
                        let _index = _bullets.findIndex((elem) => {
                            return elem === evt && evt.target;
                        });
                        _index = _index * (_params.slidesPerGroup || 1);
                        _that.slideTo(_index);
                    });
                }
                break;
            case 'progressbar':
                if (_pParams.progressbarOpposite) {
                    _classNames.push(_pParams.progressbarOppositeClass);
                }
                break;
        }
        addRemoveClass(_el, _classNames, true);
        extend(_that.pagination, {
            $el: _$el,
            el: _el
        });
    }
};

export default {
    params: {
        pagination: {
            el: null,
            modifierClass: 'swiper-pagination-',
            type: 'bullets',
            dynamicBullets: true,
            dynamicMainBullets: 1,
            clickable: true,
            clickableClass: 'swiper-pagination-clickable',
            progressbarOpposite: true,
            progressbarOppositeClass: 'swiper-pagination-progress-opposite',
            renderBullet: null,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            bulletElement: 'span',
            renderProgressbar: null,
            progressbarFillClass: 'swiper-pagination-progressbar',
            renderFraction: null,
            currentClass: 'swiper-pagination-current',
            totalClass: 'swiper-pagination-total'
        }
    },
    create () {
        const _that = this;
        extend(_that, {
            pagination: {
                init: Pagination.init.bind(_that),
                render: Pagination.render.bind(_that),
                update: Pagination.update.bind(_that),
                dynamicBulletIndex: 0
            }
        });
    },
    on: {
        /**
         * 初始化
         */
        init () {
            const _that = this;
            const _pagination = _that.pagination || {};
            _pagination.init();
            _pagination.render();
            _pagination.update();
        },
        /**
         * snapIndex改变
         */
        snapIndexChange() {
            const _that = this;
            if (!_that.params.loop) {
                _that.pagination.update();
            }
        }
    }
};
