import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import { EffectCoverflow, Pagination } from 'swiper'; // import required modules
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Discover.css';

const Discover = props => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      loop={true}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-1.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-2.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-3.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-4.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-5.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-6.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-7.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://swiperjs.com/demos/images/nature-8.jpg"
          alt="swiper-img"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Discover;
