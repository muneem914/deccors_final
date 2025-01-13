import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { FaXTwitter } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import "swiper/css";
import "./pages.scss";

const AboutUs = () => {
  return (
    <>
      <MetaData title="About Us" />
      <PageFrame>
        <div className="imageContainer aboutUs">
          <div className="row">
            <h1>About Us</h1>
            <p>
              <Link to="/">Home</Link> <span>|</span> About us
            </p>
          </div>
        </div>
        <MainFrame>
          <Box sx={{ my: 8 }}>
            <Box className="bannerWrapper">
              <Box className="bannerImage">
                <img src="/images/about/b1.jpg" alt="bannerImg" />
              </Box>
              <Box className="bannerContent">
                <Box className="mainText">
                  <p>luxury collections</p>
                  <h1>Unique And Designer Furniture's</h1>
                  <h6>
                    Posuere lorem ipsum dolor sit amet consectetur adipiscing.
                    Quis risus sed vulputate odio ut enim. Egestas fringilla
                    phasellus faucibus scelerisque eleifend donec pretium.
                  </h6>
                  <Link>Shop Now</Link>
                </Box>
              </Box>
            </Box>
            <Box className="bannerWrapper rowReverse">
              <Box className="bannerImage">
                <img src="/images/about/b2.jpg" alt="bannerImg" />
              </Box>
              <Box className="bannerContent">
                <Box className="mainText">
                  <p>YOUR DREAMS COLLECTIONS</p>
                  <h1>Bed To Desk, Complete Furnishing</h1>
                  <h6>
                    Nec tincidunt praesent semper feugiat nibh sed. Neque
                    sodales ut etiam sit amet. Urna cursus eget nunc scelerisque
                    viverra mauris in aliquam. Risus in hendrerit gravida
                    rutrum.
                  </h6>
                  <Link>Shop Now</Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </MainFrame>

        <Box className="bannerContainer">
          <Box className="imageContainer">
            <img src="/images/about/cb1.jpg" alt="image1" />
            <img src="/images/about/cb2.jpg" alt="image2" />
          </Box>
          <img
            src="/images/about/cb1.jpg"
            className="hiddenImage"
            alt="image1"
          />
          <Box className=" floatingContent">
            <Box className="mainText">
              <p>New branded</p>
              <h1>versatile and elegant design funiture's</h1>
              <div className="inner_txt">
                <h6>
                  Tellus orci ac auctor augue mauris augue. Sodales ut etiam sit
                  amet nisl purus. Dolor magna eget est lorem ipsum dolor sit.
                  Pulvinar pellentesque habitant morbi tristique senectus.
                </h6>
              </div>
              <Link>Shop Now</Link>
            </Box>
          </Box>
          <img
            src="/images/about/cb2.jpg"
            className="hiddenImage"
            alt="image1"
          />
        </Box>
        <MainFrame>
          <Box className="gridContainer">
            <Box className='grid grid1' >
                <img src='/images/about/mg1.jpg' alt="product" />
                <Link>cupboard</Link>
            </Box>
            <Box className='grid2' >
              <Box className="mainText" sx={{ textAlign: "center",}}>
                <p>new categories</p>
                <h1>worldwide best collection</h1>
                <Link>Shop Now</Link>
              </Box>
            </Box>
            <Box className='grid grid3'>
                  <img src='/images/about/mg3.jpg' alt="product" />
                  <Link>living room furniture</Link>
            </Box>
            <Box className='grid grid4'>
                  <img src='/images/about/mg4.jpg' alt="product" />
                  <Link>dining</Link>
            </Box>
            <Box className='grid grid5'>
                  <img src='/images/about/mg5.jpg' alt="product" />
                  <Link>swing</Link>
            </Box>
          </Box>
        </MainFrame>
        <Box className="bigBanner">
          <div className="bannerContents">
            <p>limited availability 30% off</p>
            <h1>list with rebates on home furniture</h1>
            <Link>shop all</Link>
          </div>
        </Box>
        <Box className="mainText" sx={{ textAlign: "center",}}>
          <p>successful team</p>
          <h1>meet our team</h1>
        </Box>
        <MainFrame>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              540: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // 768: {
              //   slidesPerView: 2,
              //   spaceBetween: 20,
              // },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1444: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="teamSwiper"
          >
            <SwiperSlide className="teamCard">
              <img src="/images/about/t1.jpg" className="cardFullImage" alt="teamImg" />
              <div className="teamContent">
                <div className="cardImage">
                	<img src="/images/about/t1s.jpg" alt="teamImg" />
                </div>
                <div className="teamDetails">
                  <h3>Muneem</h3>
                  <h5>ceo</h5>
                  <ul>
                  <li><a href="#"><FaXTwitter/></a></li>
                <li><a href="#"><GrFacebookOption/></a></li>
                <li><a href="#"><FaPinterest/></a></li>
                <li><a href="#"><FaInstagram/></a></li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="teamCard">
              <img src="/images/about/t1.jpg" className="cardFullImage" alt="teamImg" />
              <div className="teamContent">
                <div className="cardImage">
                	<img src="/images/about/t1s.jpg" alt="teamImg" />
                </div>
                <div className="teamDetails">
                  <h3>Muneem</h3>
                  <h5>ceo</h5>
                  <ul>
                  <li><a href="#"><FaXTwitter/></a></li>
                <li><a href="#"><GrFacebookOption/></a></li>
                <li><a href="#"><FaPinterest/></a></li>
                <li><a href="#"><FaInstagram/></a></li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="teamCard">
              <img src="/images/about/t1.jpg" className="cardFullImage" alt="teamImg" />
              <div className="teamContent">
                <div className="cardImage">
                	<img src="/images/about/t1s.jpg" alt="teamImg" />
                </div>
                <div className="teamDetails">
                  <h3>Muneem</h3>
                  <h5>ceo</h5>
                  <ul>
                  <li><a href="#"><FaXTwitter/></a></li>
                <li><a href="#"><GrFacebookOption/></a></li>
                <li><a href="#"><FaPinterest/></a></li>
                <li><a href="#"><FaInstagram/></a></li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="teamCard">
              <img src="/images/about/t1.jpg" className="cardFullImage" alt="teamImg" />
              <div className="teamContent">
                <div className="cardImage">
                	<img src="/images/about/t1s.jpg" alt="teamImg" />
                </div>
                <div className="teamDetails">
                  <h3>Muneem</h3>
                  <h5>ceo</h5>
                  <ul>
                  <li><a href="#"><FaXTwitter/></a></li>
                <li><a href="#"><GrFacebookOption/></a></li>
                <li><a href="#"><FaPinterest/></a></li>
                <li><a href="#"><FaInstagram/></a></li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </MainFrame>
        <Box className="mainText" sx={{ textAlign: "center", pb: 3 }}>
          <p>production</p>
          <h1>client & partners</h1>
        </Box>
        <Box sx={{ px: 2 }}>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            loop="true"
            breakpoints={{
              // 640: {
              //   slidesPerView: 2,
              //   spaceBetween: 20,
              // },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 50,
              },
            }}
            className="partnerSwiper"
          >
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b1.png" alt="slideImage" />
            </SwiperSlide>
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b2.png" alt="slideImage" />
            </SwiperSlide>
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b3.png" alt="slideImage" />
            </SwiperSlide>
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b4.png" alt="slideImage" />
            </SwiperSlide>
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b5.png" alt="slideImage" />
            </SwiperSlide>
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b6.png" alt="slideImage" />
            </SwiperSlide>
            <SwiperSlide className="pSwiperSlide">
              <img src="/images/about/b2.png" alt="slideImage" />
            </SwiperSlide>
          </Swiper>
        </Box>
      </PageFrame>
    </>
  );
};

export default AboutUs;
