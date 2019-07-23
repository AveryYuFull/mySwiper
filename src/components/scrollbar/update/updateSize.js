import callFn from '../../../utils/callFn';
import setStyle from '../../../utils/setStyle';
import extend from '../../../utils/extend';
/**
 * 更新drag的大小
 */
export default function updateSize () {
    const _that = this;
    const _scrollbar = _that.scrollbar || {};
    const _el = _scrollbar.el;
    if (!_el) {
        return;
    }
    const _isHorizontal = _that.isHorizontal();
    let _trackSize = _isHorizontal ? _el.offsetWidth : _el.offsetHeight;
    let _divider = _that.size / _that.virtualSize;
    let _moveDivider = _trackSize / _that.virtualSize;
    const _params = _that.params || {};
    const _sParams = _params.scrollbar || {};
    let _dragSize;
    if (_sParams.dragSize === 'auto') {
        _dragSize = _trackSize * _divider;
    } else {
        _dragSize = parseInt(callFn(_sParams.trackSize) || 0, 10);
    }
    if (typeof _dragSize !== 'undefined') {
        setStyle(_scrollbar.dragEl, _isHorizontal ? 'width' : 'height', `${_dragSize}px`);
    }
    if (_divider >= 1) {
        setStyle(_scrollbar.el, 'display', 'none');
    } else {
        setStyle(_scrollbar.el, 'display', '');
    }
    if (_sParams.hide) {
        setStyle(_scrollbar.el, 'opacity', 0);
    }
    extend(_scrollbar, {
        divider: _divider,
        moveDivider: _moveDivider,
        trackSize: _trackSize,
        dragSize: _dragSize
    });
}
