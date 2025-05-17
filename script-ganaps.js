

document.querySelectorAll('.swiper').forEach((swiperEl, index) => {
  new Swiper(swiperEl, {
    loop: true,
    navigation: {
      nextEl: swiperEl.querySelector('.swiper-button-next'),
      prevEl: swiperEl.querySelector('.swiper-button-prev'),
    },
    pagination: {
      el: swiperEl.querySelector('.swiper-pagination'),
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});
