import isSupportTransform3d from '../../../utils/isSupportTransform3d';
import setStyle from '../../../utils/setStyle';
import { styleName } from '../../core/constants';
/**
 * 设置scrollbar的drag元素的位置和大小
 */
export default function setTranslate() {
    const _that = this;
    const _params = _that.params || {};
    const _sParams = _params.scrollbar || {};
    const _scrollbar = _that.scrollbar || {};
    if (!_scrollbar.el) {
        return;
    }
    const _progress = _that.progress || 0;
    const _trackSize = _scrollbar.trackSize || 0;
    const _dragSize = _scrollbar.dragSize || 0;
    let _newPos = (_trackSize - _dragSize) * _progress;
    let _newSize = _dragSize;
    if (_newPos < 0) {
        _newSize = _dragSize + _newPos;
        _newPos = 0;
    } else if (_newPos + _dragSize > _trackSize) {
        _newSize = _trackSize - _newPos;
    }
    let _transformVal;
    let _x = 0;
    let _y = 0;
    let _sizePro;
    if (_that.isHorizontal()) {
        _x = _newPos;
        _sizePro = 'width';
    } else {
        _y = _newPos;
        _sizePro = 'height';
    }
    if (isSupportTransform3d) {
        _transformVal = `translate3d(${_x}px, ${_y}px, 0)`;
    } else {
        _transformVal = `translate(${_x}px, ${_y}px)`;
    }
    if (_transformVal) {
        setStyle(_scrollbar.dragEl, styleName.transform, _transformVal);
    }
    setStyle(_scrollbar.dragEl, _sizePro, `${_newSize}px`);
    if (_sParams.hide) {
        setStyle(_scrollbar.el, 'opacity', 1);
        clearTimeout(_scrollbar.timeout);
        _scrollbar.timeout = setTimeout(() => {
            setStyle(_scrollbar.el, 'opacity', 0);
            setStyle(_scrollbar.el, styleName.transition, '400ms');
        }, 1000);
    }
}
