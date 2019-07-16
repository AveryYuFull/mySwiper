
import updateBullets from './updateBullets';
import updateFraction from './updateFraction';
import updateProgressbar from './updateProgressbar';
import { EVENT_TYPE } from '../../core/constants';
/**
 * 更新
 */
export default function update () {
    const _that = this;
    const _pParams = _that.params.pagination || {};
    const _pagination = _that.pagination || {};
    if (!_pParams.el || !_pagination.$el || _pagination.$el.length <= 0 ||
        !_pagination.el) {
        return;
    }
    let _total = (_that.snapGrid || []).length;
    let _current = (typeof _that.snapIndex !== 'undefined' ? _that.snapIndex : _that.activeIndex) || 0;
    const _isHorizontal = _that.isHorizontal();
    switch ((_pParams.type || '') + '') {
        case 'bullets':
            updateBullets(_pagination, _pParams, _current, _total, _that.previousIndex, _isHorizontal);
            break;
        case 'fraction':
            updateFraction(_pagination.el, _current, _total, _pParams);
            break;
        case 'progressbar':
            updateProgressbar(_pagination.el, _current, _total, _pParams, _isHorizontal);
            break;
        case 'custom':
        default:
            const _renderCustom = _pParams.renderCustom;
            if (_renderCustom instanceof Function) {
                _pagination.el.innerHTML = _renderCustom(_that, _current, _total);
                _that.$emit(EVENT_TYPE.PAGINATION_RENDER, _that, _pagination.el);
            }
            _that.$emit(EVENT_TYPE.PAGINATION_UPDATE, _that, _pagination.el);
    }
}
