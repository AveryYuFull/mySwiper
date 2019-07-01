import SwiperClass from '../../utils/class';
import extend from '../../utils/extend';
import each from '../../utils/each';
import getElements from '../../utils/getElements';
import getTouchEvents from '../../utils/getTouchEvents';

import classes from './classes';
import update from './update';
import slide from './slide';
import translate from './translate';
import transition from './transition';
import grabCursor from './grab-cursor';

import { EVENT_TYPE, DEFAULT_CONFIG } from './constants';

/**
 * 业务方法
 */
const prototypes = [
    classes,
    update,
    slide,
    translate,
    transition,
    grabCursor
];

const extendedDefaults = {};

export default class Swiper extends SwiperClass {
    /**
     * 构造方法
     * @param  {...any} args 参数
     * @returns {Swiper|Array<Swiper>}
     */
    constructor (...args) {
        let params;
        let el;
        if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
            params = args[0];
        } else {
            [el, params] = args;
        }
        if (!params) {
            params = {};
        }
        // 记住一定要备份一份新的
        params = extend({}, params);
        if (el && !params.el) {
            params.el = el;
        }
        super(params);
        const _that = this;

        // 挂载业务方法到原型
        each(prototypes, (prototype, index) => {
            each(prototype, (method, key) => {
                if (key && !Swiper.prototype[key]) {
                    Swiper.prototype[key] = method;
                }
            });
        });

        // 处理模块数据
        if (!_that.modules) {
            _that.modules = {};
        }

        const _swiperParams = extend({}, DEFAULT_CONFIG);
        _that.useModulesParams(_swiperParams);

        _that.params = extend({}, _swiperParams, extendedDefaults, params);
        // _that.originalParams = extend({}, _that.params);
        // _that.passedParams = extend({}, params);

        // find el
        const $el = getElements(params.el);
        el = $el[0];
        if (!el) {
            return undefined;
        }
        if ($el.length > 1) {
            const _swipers = [];
            each($el, (elem) => {
                if (elem) {
                    const _params = extend({}, params, {
                        el: elem
                    });
                    _swipers.push(new Swiper(_params));
                }
            });
            return _swipers;
        }
        el.swiper = _that;

        // find wrapper
        const $wrapperEl = getElements(`.${_that.params.wrapperClass}`, el);

        extend(_that, {
            // el
            $el,
            el,
            $wrapperEl,
            wrapperEl: $wrapperEl[0],

            // Slides
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],

            // Classes
            classNames: [],

            // isDirection
            isHorizontal () {
                return _that.params.direction === 'horizontal';
            },
            isVertical () {
                return _that.params.direction === 'vertical';
            },

            // index
            activeIndex: 0,
            realIndex: 0,

            // props
            translate: 0,
            previousTranslate: 0,
            animating: false,

            // locked
            allowSlideNext: _that.params.allowSlideNext,
            allowSlidePrev: _that.params.allowSlidePrev,

            // Touch Events
            touchEvents: getTouchEvents(_params.simulateTouch),
            touchEventsData: {
                isTouchEvent: undefined,
                isTouched: undefined,
                touchStartTime: undefined,
                isMoved: undefined,
                isScrolling: undefined,
                startMoving: undefined,
                allowTouchCallbacks: undefined,
                startTranslate: undefined,
                currentTranslate: undefined,
                allowThresholdMove: undefined,
                formElements: /input|select|textarea|option|button|video/
            },
            // Touches
            allowTouchMove: _params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            }
        });

        _that.useModules();
        if (_that.params.init) {
            _that._init();
        }
        return _that;
    }

    /**
     * 初始化
     */
    _init () {
        const _that = this;
        const _params = _that.params || {};
        if (_that.initialized) {
            return;
        }
        _that.$emit(EVENT_TYPE.BEFORE_INIT, {
            context: _that
        });

        // Add Classes
        _that.addClasses();
        // Update size
        _that.updateSize();
        // Update slides
        _that.updateSlides();
        if (!_params.loop) {
            _that.slideTo(_params.initialSlide || 0, 0, _params.runCallbacksOnInit);
        }
        _that.initialized = true;
        _that.$emit(EVENT_TYPE.INIT, {
            context: _that
        });
    }

    /**
     * 获取SwiperClass
     * @returns {SwiperClass} 返回SwiperClass
     */
    static get Class () {
        return SwiperClass;
    }

    /**
     * 继承默认的参数
     * @param {*} newDefaults 新的参数
     */
    static extendDefaults (newDefaults) {
        extend(extendedDefaults, newDefaults);
    }
    /**
     * 获取extendedDefaults
     */
    static get extendedDefaults () {
        return extendedDefaults;
    }
}
