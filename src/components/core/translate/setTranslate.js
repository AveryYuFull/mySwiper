import isSupportTransform3d from '../../../utils/isSupportTransform3d';
import setStyle from '../../../utils/setStyle';
import { styleName, EVENT_TYPE } from '../constants';
/**
 * 设置滑动的新的位置
 * @param {Number} translate 新的位置
 */
export default function setTranslate (translate) {
    const _that = this;
    let x = 0;
    let y = 0;
    let z = 0;
    if (_that.isHorizontal()) {
        x = translate;
    } else {
        y = translate;
    }
    const _params = _that.params;
    if (_params && _params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
    }

    let _style;
    if (isSupportTransform3d()) {
        _style = `translate3d(${x}px, ${y}px, ${z}px)`;
    } else {
        _style = `translate(${x}px, ${y}px)`;
    }
    if (_style) {
        setStyle(_that.wrapperEl, styleName.transform, _style);
    }

    _that.previousTranslate = _that.translate;
    _that.translate = _that.isHorizontal() ? x : y;
    _that.updateProgress();
    _that.$emit(EVENT_TYPE.SET_TRANSLATE, _that.translate);
}
