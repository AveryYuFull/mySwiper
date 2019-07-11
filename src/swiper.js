import Swiper from './components/core/core-class';

import Device from './modules/device/device';
import Navigation from './components/navigation/navigation';

const _modules = [
    Device,
    Navigation
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
