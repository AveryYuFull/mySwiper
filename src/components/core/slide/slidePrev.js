/**
 * 滑动到上一组slide
 * @param {Number} speed 动画时长
 * @param {Boolean} runCallbacks 是否冒泡事件
 * @param {Number} internal 间隔时常
 */
export default function slidePrev (speed, runCallbacks = true, internal) {
    const _that = this;
    const _params = _that.params || {};
    speed = _params.speed || 0;
    let _prevIndex = (_that.activeIndex || 0) - (_params.slidesPerGroup || 1);
    const _slidesGrid = _that.slidesGrid || [];
    if (_prevIndex < 0) {
        _prevIndex = 0;
    } else if (_prevIndex > _slidesGrid.length - 1) {
        _prevIndex = _slidesGrid.length - 1;
    }
    _that.slideTo(_prevIndex, speed, runCallbacks, internal);
}
