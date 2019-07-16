import extend from '../../utils/extend';
import update from './update/update';
import render from './render/render';
import init from './init/init';
import destroy from './destroy/destroy';

import './pagination.less';

export default {
    params: {
        pagination: {
            el: null,
            modifierClass: 'swiper-pagination-',
            type: 'bullets',
            dynamicBullets: true,
            dynamicMainBullets: 1,
            clickable: true,
            clickableClass: 'swiper-pagination-clickable',
            progressbarOpposite: false,
            progressbarOppositeClass: 'swiper-pagination-progress-opposite',
            renderBullet: null,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            bulletElement: 'span',
            renderProgressbar: null,
            progressbarFillClass: 'swiper-pagination-progressbar-fill',
            renderFraction: null,
            currentClass: 'swiper-pagination-current',
            totalClass: 'swiper-pagination-total',
            formatFractionCurrent: null,
            formatFractionTotal: null,
            renderCustom: null
        }
    },
    create () {
        const _that = this;
        extend(_that, {
            pagination: {
                init: init.bind(_that),
                render: render.bind(_that),
                update: update.bind(_that),
                destroy: destroy.bind(_that),
                dynamicBulletIndex: 0
            }
        });
    },
    on: {
        /**
         * 初始化
         */
        init () {
            const _that = this;
            const _pagination = _that.pagination || {};
            _pagination.init();
            _pagination.render();
            _pagination.update();
        },
        /**
         * snapIndex改变
         */
        snapIndexChange() {
            const _that = this;
            if (!_that.params.loop) {
                _that.pagination.update();
            }
        },
        destroy () {
            this.pagination.destroy();
        }
    }
};
