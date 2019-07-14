import getElements from '../../utils/getElements';
import addRemoveClass from '../../utils/addRemoveClass';
import extend from '../../utils/extend';
const Pagination = {
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
                        let _index = _bullets.find((elem) => {
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
        addRemoveClass(_el, _classNames);
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
            progressbarOppositeClass: 'swiper-pagination-progress-opposite'
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
