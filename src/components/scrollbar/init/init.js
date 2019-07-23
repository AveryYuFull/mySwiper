import getElements from '../../../utils/getElements';
import genDom from '../../../utils/genDom';
import extend from '../../../utils/extend';
/**
 * 初始化处理
 */
export default function init () {
    const _that = this;
    const _params = _that.params || {};
    const _sParams = _params.scrollbar || {};
    if (!_sParams.el) {
        return;
    }
    let _$el = getElements(_sParams.el);
    if (_params.uniqueNavElements &&
        typeof _sParams.el === 'string' &&
        _$el && _$el.length) {
        const _tmpEl = getElements(_sParams.el, _that.el);
        if (_tmpEl) {
            _$el = _tmpEl;
        }
    }
    if (!_$el || _$el.length <= 0) {
        return;
    }
    const _el = _$el[0];
    let _$dragEl = getElements(`${_sParams.dragClass}`, _el);
    if (!_$dragEl || _$dragEl.length <= 0) {
        const _dragEl = genDom('div', {
            className: _sParams.dragClass
        });
        _$dragEl =[_dragEl];
        _el.appendChild(_dragEl);
    }
    extend(_that.scrollbar, {
        $el: _$el,
        el: _el,
        $dragEl: _$dragEl,
        dragEl: _$dragEl[0]
    });

    if (_sParams.draggable) {
        _that.scrollbar.initEvent(true);
    }
}
