import init from './init/init';
import initEvent from './event/initEvent';
import updateSize from './update/updateSize';
import setTranslate from './translate/setTranslate';
import setTransition from './transition/setTransition';
import extend from '../../utils/extend';
import './scrollbar.less';
export default {
    params: {
        scrollbar: {
            el: null,
            dragClass: 'swiper-scrollbar-drag',
            draggable: false,
            hide: false,
            dragSize: 'auto'
        }
    },
    create () {
        const _that = this;
        extend(_that, {
            scrollbar: {
                init: init.bind(_that),
                initEvent: initEvent.bind(_that),
                updateSize: updateSize.bind(_that),
                setTranslate: setTranslate.bind(_that),
                setTransition: setTransition.bind(_that),
                timeout: null
            }
        });
    },
    on: {
        /**
         * 初始化事件回调
         */
        init () {
            const _that = this;
            const _scrollbar = _that.scrollbar;
            if (_scrollbar) {
                _scrollbar.init();
                _scrollbar.updateSize();
                _scrollbar.setTranslate();
            }
        },
        /**
         * 设置translate
         */
        setTranslate() {
            this.scrollbar.setTranslate();
        },
        /**
         * 设置动画时长
         * @param {Number} duration 动画时长
         */
        setTransition (duration) {
            this.scrollbar.setTransition(duration);
        }
    }
};
