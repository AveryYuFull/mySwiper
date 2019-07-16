import getElements from '../../../utils/getElements';
import addRemoveClass from '../../../utils/addRemoveClass';
import extend from '../../../utils/extend';
/**
 * 初始化
 */
export default function init () {
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
                _that.pagination._onClick = function (evt) {
                    let _bullets = Array.prototype.slice.call(_that.pagination.bullets || [], 0);
                    let _index = _bullets.findIndex((elem) => {
                        return elem === evt.target;
                    });
                    _index = _index * (_params.slidesPerGroup || 1);
                    _that.slideTo(_index);
                };
                _el.addEventListener('click', _that.pagination._onClick);
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