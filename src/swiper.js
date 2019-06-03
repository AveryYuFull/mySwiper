import Swiper from './components/core/core-class';

import Device from './modules/device';

const _modules = [
    Device
];

if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
}

Swiper.use(_modules);

export default Swiper;
export {
    Swiper
};
