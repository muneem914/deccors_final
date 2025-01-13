import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import {
  useGetAdminProductsQuery,
  useGetAllProductsQuery,
  useGetProductsQuery,
} from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "../layout/Filters";
import {
  useGetAdminBlogsQuery,
  useGetBlogsQuery,
} from "../../redux/api/blogApi";
// import Blogs from "../blog/Blogs";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlSocialInstagram } from "react-icons/sl";
import Slider from "react-slick";
import CountdownTimer from "../layout/CountdownTimer";
import ProductSlider from "../layout/ProductSlider";
import HomeSlider from "../layout/HomeSlider";
import BlogItem from "../blog/BlogItem";

const Home = () => {
  const {
    data: productData,
    error,
    isError,
    isLoading,
  } = useGetAllProductsQuery();

  const { data } = useGetBlogsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // for countdown
  const targetDate = new Date("2025-02-31T00:00:00").toString(); // Set your target date here

  return (
    <>
      <MetaData title={"Buy Best Products"} />
      <PageFrame>
        <Box sx={{ mt: 1, mb: 15 }}>
          <HomeSlider />
        </Box>
        <MainFrame>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              560: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1000: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1444: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            className="categorySlider"
          >
            <SwiperSlide className="categorySlide">
              <Link>
                <div className="slideDetails">
                  <img src="/images/home/hc1.png" alt="slideImg" />
                  <p>Furniture</p>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="categorySlide">
              <Link>
                <div className="slideDetails">
                  <img src="/images/home/hc2.png" alt="slideImg" />
                  <p>Cupboard</p>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="categorySlide">
              <Link>
                <div className="slideDetails">
                  <img src="/images/home/hc3.png" alt="slideImg" />
                  <p>Partylights</p>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="categorySlide">
              <Link>
                <div className="slideDetails">
                  <img src="/images/home/hc4.png" alt="slideImg" />
                  <p>Lighting</p>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="categorySlide">
              <Link>
                <div className="slideDetails">
                  <img src="/images/home/hc5.png" alt="slideImg" />
                  <p>Kitchenset</p>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="categorySlide">
              <Link>
                <div className="slideDetails">
                  <img src="/images/home/hc6.png" alt="slideImg" />
                  <p>Dining</p>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </MainFrame>

        <MainFrame>
          <Box className="gridContainer">
            <Box className="grid grid1">
              <img src="/images/home/tc1.jpg" alt="product" />
              <Link>ligghtnings</Link>
            </Box>
            <Box className="grid2">
              <Box className="mainText" sx={{ textAlign: "center" }}>
                <p>top categories</p>
                <h1>perfect for your house</h1>
                <Link>Shop Now</Link>
              </Box>
            </Box>
            <Box className="grid grid3">
              <img src="/images/home/tc2.jpg" alt="product" />
              <Link>Tea Tables</Link>
            </Box>
            <Box className="grid grid4">
              <img src="/images/home/tc3.jpg" alt="product" />
              <Link>decoratives</Link>
            </Box>
            <Box className="grid grid5">
              <img src="/images/home/tc4.jpg" alt="product" />
              <Link>room set</Link>
            </Box>
          </Box>
        </MainFrame>
        <MainFrame>
          <Box className="mainText" sx={{ textAlign: "center" , mb: 7}}>
            <p>look your products</p>
            <h1>trendy collections</h1>
          </Box>
          <Box className="trendyContainer">
            {productData?.products
              ?.filter((product) => product.optional === "trendy")
              ?.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
          </Box>
        </MainFrame>

        {/* =========================== */}
        <Box sx={{ mt: 15, mb: 10 }}>
          <ProductSlider />
        </Box>
        {/* =========================== */}

        <MainFrame>
          <Box
            className="mainText"
            sx={{
              mt: 5,
              mb: 8,
              maxWidth: "500px",
              mx: "auto",
              textAlign: "center",
            }}
          >
            <p>tenor brand</p>
            <h1>furniture and accessories</h1>
            <div className="inner_txt">
              <h6>
                Interdum velit laoreet id donec ultrices tincidunt arcu. Risus
                nullam eget felis eget nunc lobortis mattis. Vitae purus
                faucibus.
              </h6>
            </div>
            <Link className="tenorButton">Shop Now</Link>
          </Box>
        </MainFrame>
        <Box className="megaSale">
          <div className="countdownContainer">
            <Box
              className="mainText"
              sx={{ my: 5, maxWidth: "500px", mx: "auto", textAlign: "center" }}
            >
              <p>sale up to 50% off</p>
              <h1>mega offer on every sale</h1>
              <div className="inner_txt">
                <CountdownTimer targetDate={targetDate} />
              </div>
              <br />
              <Link className="saleButton">Shop all</Link>
            </Box>
          </div>
          <div className="countdownImage">
            <img src="/images/home/cntdn1.jpg" alt="countdownImage" />
          </div>
        </Box>

        <MainFrame>
          <Box className="mainText" sx={{ textAlign: "center" }}>
            <p>trending news</p>
            <h1>Our Blog</h1>
          </Box>
          <div className="blogContainer">
              {data?.blogs?.slice(0, 4).map((item, index) => (
                <BlogItem key={index} item={item}/>
            ))}
          </div>
        </MainFrame>

        <MainFrame>
          <Box
            className="mainText"
            sx={{
              mb: 15,
              mt: 5,
              maxWidth: "500px",
              mx: "auto",
              textAlign: "center",
            }}
          >
            <p>your brand</p>
            <h1>join our list</h1>
            <div className="inner_txt">
              <h6>
                Vitae nunc sed velit dignissim. Vitae proin sagittis nisl
                rhoncus. Elementum tempus egestas sed sed risus.
              </h6>
            </div>
            <form className="emailContainer">
              <input type="text" id="email" placeholder="Your Email Id" />
              <button>Submit now</button>
            </form>
          </Box>
        </MainFrame>

        <Box className="mainText" sx={{ textAlign: "center", mb: 5, mt: 3 }}>
          <p>@deccors</p>
          <h1>insta-gallery</h1>
        </Box>

        <div className="slider-container">
          <Slider className="galleryContainer" {...settings}>
            <Link className="gallery" to="/collections">
              <div className="galleryImg">
                <img src="/images/home/ig1.jpg" alt="galleryImg" />
              </div>
              <div className="galleryIcon">
                <div>
                  <SlSocialInstagram />
                </div>
              </div>
            </Link>
            <Link className="gallery" to="/collections">
              <div className="galleryImg">
                <img src="/images/home/ig2.jpg" alt="galleryImg" />
              </div>
              <div className="galleryIcon">
                <div>
                  <SlSocialInstagram />
                </div>
              </div>
            </Link>
            <Link className="gallery" to="/collections">
              <div className="galleryImg">
                <img src="/images/home/ig3.jpg" alt="galleryImg" />
              </div>
              <div className="galleryIcon">
                <div>
                  <SlSocialInstagram />
                </div>
              </div>
            </Link>
            <Link className="gallery" to="/collections">
              <div className="galleryImg">
                <img src="/images/home/ig4.jpg" alt="galleryImg" />
              </div>
              <div className="galleryIcon">
                <div>
                  <SlSocialInstagram />
                </div>
              </div>
            </Link>
            <Link className="gallery" to="/collections">
              <div className="galleryImg">
                <img src="/images/home/ig5.jpg" alt="galleryImg" />
              </div>
              <div className="galleryIcon">
                <div>
                  <SlSocialInstagram />
                </div>
              </div>
            </Link>
            <Link className="gallery" to="/collections">
              <div className="galleryImg">
                <img src="/images/home/ig6.jpg" alt="galleryImg" />
              </div>
              <div className="galleryIcon">
                <div>
                  <SlSocialInstagram />
                </div>
              </div>
            </Link>
          </Slider>
        </div>
      </PageFrame>
    </>
  );
};

export default Home;
