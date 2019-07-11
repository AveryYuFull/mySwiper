import extend from '../../../utils/extend';
import { EVENT_TYPE } from '../constants';
/**
 * 更新progress
 * @param {Number} translate 当前的Translate
 */
export default function updateProgress (translate) {
    const _that = this;
    translate = translate || _that.translate;
    let _isBegin = _that.isBeginning;
    let _isEnd = _that.isEnd;
    let _progress = _that.progress;
    let _isBeginBak = _isBegin;
    let _isEndBak = _isEnd;

    const _translateDiff = _that.maxTranslate() - _that.minTranslate();
    if (_translateDiff === 0) {
        _isBegin = true;
        _isEnd = true;
        _progress = 0;
    } else {
        _progress = (translate - _that.minTranslate()) / _translateDiff;
        _isBegin = _progress <= 0;
        _isEnd = _progress >= 1;
    }

    extend(_that, {
        isBeginning: _isBegin,
        isEnd: _isEnd,
        progress: _progress
    });

    if (_isBegin && !_isBeginBak) {
        _that.$emit(`${EVENT_TYPE.REACH_TO_BEGINNING} ${EVENT_TYPE.TO_EDGE}`);
    }
    if (_isEnd && !_isEndBak) {
        _that.$emit(`${EVENT_TYPE.REACH_TO_END} ${EVENT_TYPE.TO_EDGE}`);
    }
    if ((!_isBegin && _isBeginBak) ||
        (!_isEnd && _isEndBak)) {
        _that.$emit(EVENT_TYPE.FROM_ENDGE);
    }
    _that.$emit(EVENT_TYPE.PROGRESS, _progress);
}
