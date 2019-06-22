/**
 * 更新slide的class
 */
export default function updateSlidesClasses () {
    const _that = this;
    const _slides = _that.slides || [];
    if (!_slides || _slides.length <= 0) {
        return;
    }
    const _activeIndex = _that.activeIndex;
    const _params = _that.params;
    _removeClass(_slides, _params);

    const _activeSlide = _slides[_activeIndex];
    if (_activeSlide) {
        _activeSlide.classList.add(_params.slideActiveClass);
    }
    const _nextSlide = _slides[_activeIndex + 1];
    if (_nextSlide) {
        _nextSlide.classList.add(_params.slideNextClass);
    }
    const _prevSlide = _slides[_activeIndex - 1];
    if (_prevSlide) {
        _prevSlide.classList.add(_params.slidePrevClass);
    }
}

/**
 * 移除slide的class
 * @param {Array} _slides slide
 * @param {Object} _params 参数
 */
function _removeClass (_slides, _params) {
    _params = _params || {};
    if (_slides && _slides.length > 0) {
        _slides.forEach((slide) => {
            if (slide) {
                slide.classList.remove(_params.slideActiveClass);
                slide.classList.remove(_params.slidePrevClass);
                slide.classList.remove(_params.slideNextClass);
            }
        });
    }
}
