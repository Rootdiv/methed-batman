'use strict';

//Бургер
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const navigationClose = document.querySelector('.navigation__close');

burger.addEventListener('click', () => {
  navigation.classList.add('navigation--active');
});

navigationClose.addEventListener('click', () => {
  navigation.classList.remove('navigation--active');
});

//Музыка
try {
  const mute = document.querySelector('.mute__checkbox');
  const audio = new Audio('./audio/waterTower.mp3');
  //audio.autoplay = true;
  const checkMute = () => {
    if (mute.checked) {
      audio.play().catch(() => {
        mute.checked = false;
      });
    } else {
      audio.pause();
    }
  };

  if (mute) {
    setTimeout(checkMute, 2000);
  }

  mute.addEventListener('change', checkMute);
} catch {
  console.log('На этой странице нет музыки');
}

try {
  const pagination = document.querySelector('.pagination');
  const paginationButton = document.querySelector('.pagination__arrow');
  const videos = document.querySelectorAll('video');

  const sliderThumbs = new Swiper('.slider-thumbs', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    centeredSlides: true,
    loopedSlides: 4,
    grabCursor: true,
  });

  sliderThumbs.on('click', swiper => {
    swiper.slideTo(swiper.clickedIndex);
    pagination.classList.toggle('pagination--active');
    videos[swiper.realIndex].play();
  });

  const sliderMain = new Swiper('.slider-main', {
    loop: true,
    spaceBetween: 10,
    loopedSlides: 4,
  });

  sliderThumbs.controller.control = sliderMain;
  sliderMain.controller.control = sliderThumbs;
  sliderMain.on('slideChange', () => {
    for (let i = 0; i < videos.length; i++) {
      videos[i].pause();
    }
  });

  paginationButton.addEventListener('click', () => {
    pagination.classList.toggle('pagination--active');
  });
} catch {
  console.log('На этой странице нет слайдера');
}
