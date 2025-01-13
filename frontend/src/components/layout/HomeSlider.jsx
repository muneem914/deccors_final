import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.scss';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const HomeSlider = () => {

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="homeSlideContainer">
                <div className="homeSlideContent onlyImage">
                    <img src="/images/home/hm11.jpg" alt="homeSlider" />
                </div>
                <div className="homeSlideContent imageWithData">
                <div className="imagePart">
                <img src="/images/home/hm12.jpg" alt="homeSlider" />
                </div>
                <div className="contentPart">
                    <h1>Stylish Design</h1>
                    <p>Gravida quis blandit turpis cursus in hac habitasse platea. Sit amet justo donec enim diam vulputate ut.</p>
                    <Link>shop now</Link>
                </div>
                </div>
                <div className="homeSlideContent onlyImage">
                    <img src="/images/home/hm13.jpg" alt="homeSlider" />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="homeSlideContainer">
                <div className="homeSlideContent onlyImage">
                    <img src="/images/home/hm21.jpg" alt="homeSlider" />
                </div>
                <div className="homeSlideContent imageWithData">
                <div className="imagePart">
                <img src="/images/home/hm22.jpg" alt="homeSlider" />
                </div>
                <div className="contentPart">
                    <h1>Unique Style</h1>
                    <p>Gravida quis blandit turpis cursus in hac habitasse platea. Sit amet justo donec enim diam vulputate ut.</p>
                    <Link>shop now</Link>
                </div>
                </div>
                <div className="homeSlideContent onlyImage">
                    <img src="/images/home/hm23.jpg" alt="homeSlider" />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="homeSlideContainer">
                <div className="homeSlideContent onlyImage">
                    <img src="/images/home/hm31.jpg" alt="homeSlider" />
                </div>
                <div className="homeSlideContent imageWithData">
                <div className="imagePart">
                <img src="/images/home/hm32.jpg" alt="homeSlider" />
                </div>
                <div className="contentPart">
                    <h1>Fine Quality</h1>
                    <p>Gravida quis blandit turpis cursus in hac habitasse platea. Sit amet justo donec enim diam vulputate ut.</p>
                    <Link>shop now</Link>
                </div>
                </div>
                <div className="homeSlideContent onlyImage">
                    <img src="/images/home/hm33.jpg" alt="homeSlider" />
                </div>
            </div>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default HomeSlider