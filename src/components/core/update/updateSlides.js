import getElements from '../../../utils/getElements';
import callFn from '../../../utils/callFn';
import each from '../../../utils/each';
import getStyle from '../../../utils/getStyle';
import setStyle from '../../../utils/setStyle';
import extend from '../../../utils/extend';
import { EVENT_TYPE } from '../constants';

/**
 * 更新slide的大小
 */
export default function () {
    const _that = this;
    const { wrapperEl, params, size: swiperSize } = _that;
    if (!swiperSize || !wrapperEl) {
        return;
    }
    const _slides = getElements(`.${params.slideClass}`, wrapperEl);
    let _spaceBetween = callFn(params.spaceBetween, [], _that);
    if (typeof _spaceBetween === 'string' && _spaceBetween.indexOf('%') > -1) {
        _spaceBetween = (parseFloat(_spaceBetween.replace('%', '')) / 100) * swiperSize;
    }
    let _offsetBefore = callFn(params.slidesOffsetBefore, [], _that);
    let _offsetAfter = callFn(params.slidesOffsetAfter, [], _that);

    let _slidesSizesGrid = [];
    let _slidesGrid = [];
    let _snapGrid = [];

    let _slidePostion = -_offsetBefore;
    let _virtualSize = -_spaceBetween;

    let _slideSize = 0;
    each(_slides, (slide, index) => {
        _slideSize = 0;
        if (slide) {
            const _styles = getStyle(slide);
            const _display = _styles['display'];
            if (_display === 'none') {
                return;
            }
            _slideSize = _getSlideSize(slide, _styles, params, _that.isHorizontal(), swiperSize, _spaceBetween);
            // slide.swiperSlideSize = _slideSize;
            _slidesSizesGrid.push(_slideSize);

            if (!params.centeredSlides) {
                if (params.roundLengths) {
                    _slidePostion = Math.floor(_slidePostion);
                }
                _slidesGrid.push(_slidePostion);
                const _slidesPerGroup = (params && params.slidesPerGroup) || 1;
                if ((index % _slidesPerGroup) === 0) {
                    _snapGrid.push(_slidePostion);
                }
                _slidePostion = _slidePostion + _slideSize + _spaceBetween;
            }
            _virtualSize = _virtualSize + _spaceBetween +_slideSize;

            if (_that.isHorizontal()) {
                setStyle(slide, 'marginRight', _spaceBetween + 'px');
            } else {
                setStyle(slide, 'marginBottom', _spaceBetween + 'px');
            }
        }
    });
    _virtualSize = Math.max(_virtualSize, swiperSize) + _offsetAfter;
    if (!params.centeredSlides) { // 重新过滤snapGrid，防治最后一屏超过
        let _newSnapSldes = [];
        each(_snapGrid, (snapItem) => {
            if (params.roundLengths) {
                snapItem = Math.floor(snapItem);
            }
            if (_virtualSize - snapItem >= swiperSize) {
                _newSnapSldes.push(snapItem);
            }
        });
        if (Math.floor(_virtualSize - swiperSize) - Math.floor(_newSnapSldes[_newSnapSldes.length - 1]) > 1) {
            _newSnapSldes.push(_virtualSize - swiperSize);
        }
        _snapGrid = _newSnapSldes;
    }
    if (_snapGrid.length === 0) {
        _snapGrid = [0];
    }

    const _prevSlidesLen = _that.slides.length;
    const _prevSnapGridLen = _that.snapGrid.length;
    const _prevSlidesGridLen = _that.slidesGrid.length;

    extend(_that, {
        slides: _slides,
        slidesSizesGrid: _slidesSizesGrid,
        slidesGrid: _slidesGrid,
        snapGrid: _snapGrid
    });

    if (_prevSlidesLen !== _slides.length) {
        _that.$emit(EVENT_TYPE.SLIDES_LENGTH_CHANGE, _slides);
    }
    if (_prevSlidesGridLen !== _that.slidesGrid.length) {
        _that.$emit(EVENT_TYPE.SLIDES_GRID_LENGTH_CHANGE, _slidesGrid);
    }
    if (_prevSnapGridLen !== _that.snapGrid.length) {
        _that.$emit(EVENT_TYPE.SNAP_GRID_LENGTH_CHANGE, _snapGrid);
    }
}

/**
 * 获取slide的size
 * @param {HTMLElement} slide slide元素
 * @param {Object} _styles slide的样式
 * @param {Object} params 参数
 * @param {Boolean} isHorizontal 是否是水平的slide
 * @param {Number} swiperSize swiper的大小
 * @param {Number} _spaceBetween slide 之间间隔
 * @returns {Number} 返回获取到slide的size
 */
function _getSlideSize (slide, _styles, params, isHorizontal, swiperSize, _spaceBetween) {
    let _slideSize;
    if (params.slidesPerView === 'auto') {
        const _transform = _styles['transform'];
        if (_transform) {
            setStyle(slide, 'transform', 'none');
        }
        const _webkitTransform = _styles['webkitTransform'];
        if (_webkitTransform) {
            setStyle(slide, 'webkitTransform', 'none');
        }
        const _borderBox = _styles['boxSizing'];
        if (isHorizontal) {
            let _width = _filterStyle(_styles, 'width');
            const _paddingLeft = _filterStyle(_styles, 'paddingLeft');
            const _paddingRight = _filterStyle(_styles, 'paddingRight');
            const _marginLeft = _filterStyle(_styles, 'marginLeft');
            const _marginRight = _filterStyle(_styles, 'marginRight');
            if (_borderBox === 'border-box') {
                _slideSize = _width + _marginLeft + _marginRight;
            } else {
                _slideSize = _width + _marginLeft + _marginRight + _paddingLeft + _paddingRight;
            }
        } else {
            let _height = _filterStyle(_styles, 'height');
            const _paddingTop = _filterStyle(_styles, 'paddingTop');
            const _paddingBottom = _filterStyle(_styles, 'paddingBottom');
            const _marginTop = _filterStyle(_styles, 'marginTop');
            const _marginBottom = _filterStyle(_styles, 'marginBottom');
            if (_borderBox === 'border-box') {
                _slideSize = _height + _marginTop + _marginBottom;
            } else {
                _slideSize = _height + _paddingTop + _paddingBottom + _marginTop + _marginBottom;
            }
        }
        if (_transform) {
            setStyle(slide, 'transform', _transform);
        }
        if (_webkitTransform) {
            setStyle(slide, 'webkitTransform', _webkitTransform);
        }
        if (params.roundLengths) {
            _slideSize = Math.floor(_slideSize);
        }
    } else {
        const _slidesPerView = (params && params.slidesPerView) || 1;
        _slideSize = (swiperSize - ((_slidesPerView - 1) * _spaceBetween)) / _slidesPerView;
        if (params.roundLengths) {
            _slideSize = Math.floor(_slideSize);
        }
        setStyle(slide, isHorizontal ? 'width' : 'height', _slideSize + 'px');
    }
    return _slideSize;
}

/**
 * 过滤样式
 * @param {Array} styles 样式列表
 * @param {String} prop 样式属性
 * @returns {Number} 返回过滤后的样式属性
 */
function _filterStyle (styles, prop) {
    if (!_styles || !prop) {
        return 0;
    }
    let _style = styles[prop] || '0';
    _style = _style.replace(/[^.-\d+]/g, '') || '0';
    return parseFloat(_style, 10) || 0;
}
