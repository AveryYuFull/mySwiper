import init from './init/init';
import initEvent from './event/initEvent';
import updateSize from './update/updateSize';
import extend from '../../utils/extend';
import './scrollbar.less';
export default {
    params: {
        scrollbar: {
            el: null,
            dragClass: 'swiper-scrollbar-drag',
            draggable: false,
            hide: true,
            dragSize: 'auto'
        }
    },
    create () {
        const _that = this;
        extend(_that, {
            scrollbar: {
                init: init.bind(_that),
                initEvent: initEvent.bind(_that),
                updateSize: updateSize.bind(_that)
            }
        });
    },
    on: {
        init () {
            const _that = this;
            _that.scrollbar.init();
            _that.scrollbar.updateSize();
        }
    }
};
