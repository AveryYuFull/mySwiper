import { EVENT_TYPE } from '../constants';
import extend from '../../../utils/extend';

/**
 * 更新活动索引
 * @param {Number} newIndex 新的活动索引
 */
export default function updateActiveIndex (newIndex) {
    const _that = this;
    const _translate = _that.translate || 0;
    const _slidesGrid = _that.slidesGrid;
    let _activeIndex = newIndex;
    const _previousSnapIndex = _that.snapIndex;
    if (typeof _activeIndex === 'undefined' && _slidesGrid && _slidesGrid.length > 0) {
        for (let i = 0; i < _slidesGrid.length; i++) {
            if (typeof _slidesGrid[i + 1] !== 'undefined') {
                if (_translate >= _slidesGrid[i] && _translate <= (_slidesGrid[i] + (_slidesGrid[i + 1] - _slidesGrid[i]) / 2)) {
                    _activeIndex = i;
                } else if (_translate >= _slidesGrid[i] && _translate <= _slidesGrid[i + 1]) {
                    _activeIndex = i + 1;
                }
            } else if (_translate >= _slidesGrid[i]) {
                _activeIndex = i;
            }
            if (typeof _activeIndex !== 'undefined') {
                break;
            }
        }
    }
    const _params = _that.params;
    if (_params && _params.normalizeSlideIndex) {
        if (typeof _activeIndex === 'undefined' || _activeIndex < 0) {
            _activeIndex = 0;
        } else if (_activeIndex > _slidesGrid.length - 1) {
            _activeIndex = _slidesGrid - 1;
        }
    }

    const _snapGrid = _that.snapGrid || [];
    let _snapIndex;
    if (_snapGrid.indexOf(_translate) > -1) {
        _snapIndex = _snapGrid.indexOf(_translate);
    } else {
        _snapIndex = Math.floor(_activeIndex / (_params.slidesPerGroup || 1));
    }
    if (_snapIndex < 0) {
        _snapIndex = 0;
    } else if (_snapIndex > _snapGrid.length - 1) {
        _snapIndex = _snapGrid.length - 1;
    }

    const _previousIndex = _that.activeIndex || 0;
    if (_activeIndex === _previousIndex) {
        if (_previousSnapIndex !== _snapIndex) {
            _that.$emit(EVENT_TYPE.SNAP_INDEX_CHANGE, {
                old: _previousSnapIndex,
                new: _snapIndex
            });
        }
        return;
    }

    extend(_that, {
        activeIndex: _activeIndex,
        previousIndex: _previousIndex,
        snapIndex: _snapIndex
    });
    _that.$emit(EVENT_TYPE.ACTIVE_INDEX_CHANGE, {
        old: _previousIndex,
        new: _activeIndex
    });
    if (_that.snapIndex !== _previousSnapIndex) {
        _that.$emit(EVENT_TYPE.SNAP_INDEX_CHANGE, {
            old: _previousSnapIndex,
            new: _snapIndex
        });
    }
    _that.$emit(EVENT_TYPE.SLIDE_CHANGE);
}
