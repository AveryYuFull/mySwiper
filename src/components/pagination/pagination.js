import getElements from '../../utils/getElements';
import addRemoveClass from '../../utils/addRemoveClass';
import extend from '../../utils/extend';
import callFn from '../../utils/callFn';
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
        let _toal = _snapGrid.length;
        let _current = (typeof _that.snapIndex !== 'undefined' ? _that.snapIndex : _that.activeIndex) || 0;
        const _type = (_pParams.type || '') + '';
        switch (_type) {
            case 'bullets':
                if (_pParams.dynamicBullets) {
                }
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
                        _html = `<${_pParams.bulletElement} class="${_pParams.className}"></${_pParams.bulletElement}>`;
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
        _pagination.el.innerHtml = _htmlText;
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
                dynamicBulletIndex: 0
            }
        });
    }
};
