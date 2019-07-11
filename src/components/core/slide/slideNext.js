/**
 * 滑动到下一组slide
 * @param {Number} speed 动画时长
 * @param {Boolean} runCallbacks 是否冒泡事件
 * @param {Number} internal 间隔时常
 */
export default function slideNext (speed, runCallbacks = true, internal) {
    const _that = this;
    const _params = _that.params || {};
    speed = _params.speed;
    let _nextIndex = (_that.activeIndex || 0) + (_params.slidesPerGroup || 1);
    const _slidesGrid = _that.slidesGrid || [];
    if (_nextIndex > _slidesGrid.length - 1) {
        _nextIndex = _slidesGrid.length - 1;
    } else if (_nextIndex < 0) {
        _nextIndex = 0;
    }
    _that.slideTo(_nextIndex, speed, runCallbacks, internal);
}
