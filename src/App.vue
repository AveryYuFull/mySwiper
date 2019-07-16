<template>
  <div id="app">
    <div class="swiper-container" style="padding: 10px;">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
      <div class="swiper-button-prev">&lt;</div>
      <div class="swiper-button-next">&gt;</div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper';
export default {
    name: 'App',
    mounted () {
        const _that = this;
        let _swiper = new Swiper('.swiper-container', {
            // slidesOffsetBefore: 400,
            spaceBetween: 20,
            slidesPerView: 2,
            // normalizeSlideIndex: false,
            initialSlide: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                // type: 'fraction'
                // type: 'progressbar'
                dynamicMainBullets: 2
            }
        });
        // console.log('_swiper', _swiper);
    }
};
</script>

<style lang="less">
.swiper-button-prev, .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
    border: 1px solid #d9d9d9;
    width: 34px;
    background: #fff;
    cursor: pointer;
    &.swiper-button-disabled {
      display: none;
    }
}
.swiper-button-next {
    right: 29px;
}
.swiper-button-prev {
    left: 5px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
}
html, body {
  position: relative;
  height: 100%;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color:#000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 100%;;
}
</style>
