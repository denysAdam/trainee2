import Swiper, {
    Pagination,
    Autoplay,
    FreeMode,
    Thumbs,
    Controller,
    Navigation,
    EffectFade
  } from "swiper";
  
  document.querySelectorAll('.jc-swiper-reviews').forEach(swiper => {
    const swiperStep = new Swiper(`#${swiper.id}`, {
      modules: [Navigation], 
      navigation: {
        nextEl: '.reviewsSwiper-button-next',
        prevEl: '.reviewsSwiper-button-prev'
      },
      slidesPerView: 1.1,
      spaceBetween: 16,
      breakpoints: {
        640: {
          slidesPerView: 2.1
        },
        992: {
          slidesPerView: 2.5
        },
        1024: {
          slidesPerView: 1.8
        },
        1280: {
          slidesPerView: 2.5
        },
      }
    });
  })