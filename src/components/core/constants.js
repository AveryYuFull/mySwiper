import prefixStyle from '../../utils/prefixStyle';

/**
 * 默认配置信息
 */
export const DEFAULT_CONFIG = {
    init: true,
    direction: 'horizontal',
    speed: 300, // 动画时长
    initialSlide: 0, // 设定初始化时slide的索引

    // NS
    containerModifierClass: 'swiper-container-',
    wrapperClass: 'swiper-wrapper',
    slideClass: 'swiper-slide', // slide元素的class
    slideActiveClass: 'swiper-slide-active',
    slidePrevClass: 'swiper-slide-prev',
    slideNextClass: 'swiper-slide-next',

    width: undefined, // swiperContainer的宽度
    height: undefined, // swiperContainer的高度

    spaceBetween: 0, // 每个slide之间的间距
    slidesOffsetBefore: 0, // swiper的前偏移量
    slidesOffsetAfter: 0, // swiper的后偏移量
    slidesPerView: 'auto', // swiper容器能同时容纳的slide数量
    roundLengths: false, // 如果设置为true，则将slide的宽／高进行四舍五入
    centeredSlides: false, // 设定为true时，active slide会居中，而不是默认状态下的居左
    slidesPerGroup: 1, // slides的数量多少为一组
    normalizeSlideIndex: false, // 是否序列化slideIndex

    runCallbacksOnInit: true, // 是否冒泡事件
    touchEventsTarget: 'container', // touchstart的目标对象
    simulateTouch: true, // 模拟移动端的touch事件
    allowTouchMove: true, // 是否允许swiper移动
    nested: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,

    // loop
    loop: false,

    // Touches
    threshold: 0,
    touchAngle: 45,
    touchStartPreventDefault: true, // touchstart时是否阻止事件的默认行为
    touchStartForcePreventDefault: false, // 是否touchStart强制阻止事件的默认行为
    touchReleaseOnEdges: false,
    touchMoveStopPropagation: true,
    touchRatio: 1,
    followFinger: false,
    longSwipesMs: 300,
    longSwipes: true,
    longSwipesRatio: 0.5,
    shortSwipes: true,

    // Cursor
    grabCursor: false,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // navigation
    uniqueNavElements: true // 是否优先在container里查找元素
};

/**
 * 事件类型
 */
export const EVENT_TYPE = {
    INIT: 'init', // 初始化完成
    BEFORE_INIT: 'beforeInit', // 初始化前
    SLIDES_LENGTH_CHANGE: 'slidesLengthChange', // slides长度改变
    SNAP_GRID_LENGTH_CHANGE: 'snapGridLengthChange', // snapGrid长度改变
    SLIDES_GRID_LENGTH_CHANGE: 'slidesGridLengthChange', // slidesGrid改变

    BEFORE_SLIDE_CHANGE_START: 'beforeSlideChangeStart', // slide滑动开始
    SNAP_INDEX_CHANGE: 'snapIndexChange', // snapIndex 改变
    ACTIVE_INDEX_CHANGE: 'activeIndexChange', // activeIndex改变
    SLIDE_CHANGE: 'slideChange', // slide改变

    TRANSITION_START: 'transitionStart',
    SLIDE_RESET_TRANSITION_START: 'slideResetTransitionStart',
    SLIDE_CHANGE_TRANSITION_START: 'slideChangeTransitionStart',
    SLIDE_PREV_TRANSITION_START: 'slidePrevTransitionStart',
    SLIDE_NEXT_TRANSITION_START: 'slideNextTransitionStart',
    TRANSITION_END: 'transitionEnd',
    SLIDE_RESET_TRANSITION_END: 'slideResetTransitionEnd',
    SLIDE_CHANGE_TRANSITION_END: 'slideChangeTransitionEnd',
    SLIDE_PREV_TRANSITION_END: 'slidePrevTransitionEnd',
    SLIDE_NEXT_TRANSITION_END: 'slideNextTransitionEnd',
    BEFORE_TRANSITION_START: 'beforeTransitionStart',

    SET_TRANSLATE: 'setTranslate',

    TOUCH_START: 'touchStart',
    TOUCH_MOVE_OPPOSITE: 'touchMoveOpposite',
    SLIDER_FIRST_MOVE: 'sliderFirstMove',
    SLIDER_MOVE: 'sliderMove',

    REACH_TO_BEGINNING: 'reachToBeginning',
    REACH_TO_END: 'reachToEnd',
    TO_EDGE: 'toEdge',
    FROM_ENDGE: 'fromEdge',
    PROGRESS: 'progress',

    PAGINATION_RENDER: 'paginationRender', // 分页渲染
    PAGINATION_UPDATE: 'paginationUpdate' // 分页更新
};

/**
 * 样式名称
 */
export const styleName = {
    transitionDuration: prefixStyle('transitionDuration'),
    transition: prefixStyle('transition'),
    transform: prefixStyle('transform'),
    transitionEnd: prefixStyle('transitionEnd')
};
