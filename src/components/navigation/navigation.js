import extend from '../../utils/extend';
import getElements from '../../utils/getElements';
import callFn from '../../utils/callFn';
const Navigation = {
    /**
     * 更新
     */
    update () {
        const _that = this;
        const _navigation = _that.navigation || {};
        const _nextEl = _navigation.nextEl;
        const _prevEl = _navigation.prevEl;
        if (!_nextEl && !_prevEl) {
            return;
        }
        const _params = _that.params || {};
        const _navigationParams = _params.navigation || {};
        _nextEl && _nextEl.classList.remove(_navigationParams.disabledClass);
        _prevEl && _prevEl.classList.remove(_navigationParams.disabledClass);
        const _isBegin = _that.isBeginning;
        const _isEnd = _that.isEnd;
        if (_isBegin && _prevEl) {
            _prevEl.classList.add(_navigationParams.disabledClass);
        } else if (_isEnd && _nextEl) {
            _nextEl.classList.add(_navigationParams.disabledClass);
        }
    },
    /**
     * navigation初始化
     */
    init () {
        const _that = this;
        const _params = _that.params || {};
        const _navigation = _that.navigation || {};
        const _navigationParams = _params.navigation || {};
        let _$nextEl = _getElements(_navigationParams.nextEl || '', _that.el, _params.uniqueNavElements);
        let _$prevEl = _getElements(_navigationParams.prevEl || '', _that.el, _params.uniqueNavElements);
        if (_$nextEl && _$nextEl.length > 0) {
            _$nextEl[0].addEventListener('click', _navigation.onNextClick);
        }
        if (_$prevEl && _$prevEl.length > 0) {
            _$prevEl[0].addEventListener('click', _navigation.onPrevClick);
        }
        extend(_that.navigation, {
            $nextEl: _$nextEl,
            nextEl: _$nextEl[0],
            $prevEl: _$prevEl,
            prevEl: _$prevEl[0]
        });

        /**
         * 获取元素
         * @param {String|HTMLElement} el 目标元素
         * @param {HTMLElement} rootEl 根元素
         * @param {Boolean} uniqueNavElements 是否使用container内部的navigaiton元素
         * @returns {Array} 返回获取到的元素
         */
        function _getElements (el, rootEl, uniqueNavElements) {
            let _$el = getElements(el);
            if (uniqueNavElements &&
                _$el && _$el.length &&
                typeof el === 'string') {
                let _tmpEl = getElements(el, rootEl);
                if (_tmpEl && _tmpEl.length) {
                    _$el = _tmpEl;
                }
            }
            return _$el;
        }
    },
    /**
     * 点击next的回调
     */
    onNextClick () {
        const _that = this;
        const _params = _that.params || {};
        if (_params.loop || _that.isEnd) {
            return;
        }
        _that.slideNext();
    },
    /**
     * 点击prev的回调
     */
    onPrevClick () {
        const _that = this;
        const _params = _that.params || {};
        if (_params.loop || _that.isBeginning) {
            return;
        }
        _that.slidePrev();
    },
    /**
     * 销毁
     */
    destroy () {
        const _that = this;
        const _navigation = _that.navigation || {};
        const _nextEl = _navigation.nextEl;
        const _prevEl = _navigation.prevEl;
        const _params = _that.params || {};
        const _paginationParams = _params.pagination || {};
        if (_nextEl) {
            _nextEl.classList && _nextEl.classList.remove(_paginationParams.disabledClass);
            _nextEl.removeEventListener('click', _that.onNextClick);
        }
        if (_prevEl) {
            _prevEl.classList && _prevEl.classList.remove(_paginationParams.disabledClass);
            _prevEl.removeEventListener('click', _that.onPrevClick);
        }
    }
};

export default {
    params: {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'swiper-button-disabled'
        }
    },
    create () {
        const _that = this;
        extend(_that, {
            navigation: {
                init: Navigation.init.bind(_that),
                onNextClick: Navigation.onNextClick.bind(_that),
                onPrevClick: Navigation.onPrevClick.bind(_that),
                update: Navigation.update.bind(_that),
                destroy: Navigation.destroy.bind(_that)
            }
        });
    },
    on: {
        /**
         * 初始化
         */
        init () {
            const _that = this;
            const _navigation = _that.navigation || {};
            callFn(_navigation.init);
            callFn(_navigation.update);
        },
        /**
         * 到达边缘
         */
        toEdge () {
            const _that = this;
            const _navigation = _that.navigation || {};
            callFn(_navigation.update);
        },
        /**
         * 离开边缘
         */
        fromEdge () {
            const _that = this;
            const _navigation = _that.navigation || {};
            callFn(_navigation.update);
        },
        destroy () {
            const _navigation = _that.navigation || {};
            callFn(_navigation.destroy);
        }
    }
};
