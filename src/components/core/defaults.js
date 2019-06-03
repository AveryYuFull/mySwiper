export default {
    init: true,
    direction: 'horizontal',

    // NS
    containerModifierClass: 'swiper-container',
    wrapperClass: 'swiper-wrapper',
    slideClass: 'swiper-slide', // slide元素的class

    width: undefined, // swiperContainer的宽度
    height: undefined, // swiperContainer的高度

    spaceBetween: 0, // 每个slide之间的间距
    slidesOffsetBefore: 0, // swiper的前偏移量
    slidesOffsetAfter: 0, // swiper的后偏移量
    slidesPerView: 'auto', // swiper容器能同时容纳的slide数量
    roundLengths: false, // 如果设置为true，则将slide的宽／高进行四舍五入
    centeredSlides: false, // 设定为true时，active slide会居中，而不是默认状态下的居左
    slidesPerGroup: 1 // slides的数量多少为一组
};
