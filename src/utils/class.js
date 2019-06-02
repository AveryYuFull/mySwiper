export default class SwiperClass {
    /**
     * 事件监听列表
     */
    eventListeners = {};

    /**
     * 构造方法
     * @param  {Object} params 参数
     */
    constructor (params) {
        const _that = this;
        _that.params = params;
        _that.eventListeners = {};

        /**
         * 处理事件
         */
        const _events = params && params.on;
        if (_events) {
            for (let key in _events) {
                if (_events.hasOwnProperty(key)) {
                    const _fn = _events[key];
                    _that.$on(key, _fn.bind(_that));
                }
            }
        }
    }

    /**
     * 过滤events参数
     * @param {String|Array} events 参数
     * @returns {Array} 返回events参数
     */
    _filterEvents (events) {
        if (typeof events === 'string') {
            events = (events.trim()).split(' ');
        }
        return events || [];
    }

    /**
     * 注册事件
     * @param {String|Array} events 事件
     * @param {Function} handler 事件处理程序
     * @param {Boolean} priority 事件优先级
     * @returns {SwiperClass} 返回当前的对象
     */
    $on(events, handler, priority) {
        const _that = this;
        if (!events || 
            ((events instanceof Array) && events.length <= 0) ||
            !handler) {
            return _that;
        }

        events = _that._filterEvents(events);
        const _methods = priority ? 'unshift' : 'push';
        events.forEach((event) => {
            const _listener = _that.eventListeners[event] = _that.eventListeners[event] || [];
            _listener[_methods](handler);
        });
        return _that;
    }

    /**
     * 注册事件
     * @param {String|Array} events 事件
     * @param {Function} handler 事件处理程序
     * @param {Boolean} priority 事件优先级
     * @returns {SwiperClass} 返回当前的对象
     */
    $once (events, handler, priority) {
        const _that = this;
        if (!events || 
            ((events instanceof Array) && events.length <= 0) ||
            !handler) {
            return _that;
        }
        _eventOnce.proxy = handler;
        _that.$on(events, _eventOnce, priority);

        /**
         * 代理方法
         */
        function _eventOnce (...args) {
            handler.apply(_that, args);
            _that.$off(events, _eventOnce);
            if (_eventOnce.proxy) {
                delete _eventOnce.proxy;
            }
        }
    }

    /**
     * 解除事件
     * @param {String|Array} events 事件
     * @param {Function} handler 事件处理程序
     * @returns {SwiperClass} 返回当前的对象
     */
    $off (events, handler) {
        const _that = this;
        if (!events ||
            ((events instanceof Array) && events.length <= 0)) {
            return _that;
        }
        events = _that._filterEvents(events);
        events.forEach((event) => {
            let _listeners = _that.eventListeners[event];
            if (typeof handler === 'undefined') {
                _that.eventListeners[event] = [];
            } else if (_listeners && _listeners.length > 0) {
                _listeners = _listeners.filter((listener) => {
                    if (!listener || listener === handler ||
                        listener.proxy === handler) {
                        return false;
                    }
                    return true;
                });
                _that.eventListeners[event] = _listeners;
            }
        });
        return _that;
    }

    /**
     * 事件执行
     * @param  {...any} args 参数
     * @returns {SwiperClass} 返回当前对象
     */
    $emit (...args) {
        const _that = this;
        let events;
        let data;
        let context;
        if (typeof args[0] === 'string' || (args[0] instanceof Array)) {
            events = args[0];
            data = args.slice(1);
            context = _that;
        } else {
            [events, data, context] = args[0];
        }
        events = _that._filterEvents(events);
        events.forEach((event) => {
            const _listeners = _that.eventListeners[event] || [];
            _listeners.forEach((listener) => {
                listener && listener.apply(context, data);
            });
        });
        return _that;
    }
}