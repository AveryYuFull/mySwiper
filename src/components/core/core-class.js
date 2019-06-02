import SwiperClass from '../../utils/class';
import extend from '../../utils/extend';
import each from '../../utils/each';
import defaults from './defaults';
import getElements from '../../utils/getElements';

/**
 * 业务方法
 */
const prototypes = [];

const extendedDefaults = {};

export default class Swiper extends SwiperClass {
    /**
     * 构造方法
     * @param  {...any} args 参数
     * @returns
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
        params = extend({}, params);
        if (el && !params.el) {
            params.el = el;
        }
        super(params);
        
        // 挂载业务方法到原型
        each(prototypes, (prototype, index) => {
            each(prototype, (method, key) => {
                key && (_that.prototype[key] = method);
            });
        });

        // 处理模块数据
        if (!_that.modules) {
            _that.modules = {};
        }

        const _swiperParams = extend({}, defaults);
        _that.useModulesParams(_swiperParams);

        _that.params = extend({}, _swiperParams, extendedDefaults, params);
        _that.originalParams = extend({}, _that.params);
        _that.passedParams = extend({}, params);

        // find el
        const $el = getElements(el);
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
        const $wrapperEl = getElements(_that.params.wrapperClass, el);

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
            allowSlidePrev: _that.params.allowSlidePrev
        });

        _that.useModules();
        if (_that.params.init) {
            _that._init();
        }
        return _that;
    }

    /**
     * 继承默认的参数
     * @param {*} newDefaults 
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