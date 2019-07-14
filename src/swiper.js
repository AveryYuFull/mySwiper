import Swiper from './components/core/core-class';

import Device from './modules/device/device';
import Navigation from './components/navigation/navigation';
import Pagination from './components/pagination/pagination';

const _modules = [
    Device,
    Navigation,
    Pagination
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
