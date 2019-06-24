import prefixStyle from "../../utils/prefixStyle";

/**
 * 事件类型
 */
export const EVENT_TYPE = {
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

    SET_TRANSLATE: 'setTranslate'
};

/**
 * 样式名称
 */
export const styleName = {
    TRANSITION: prefixStyle('transition'),
    TRANSFORM: prefixStyle('transform')
};
