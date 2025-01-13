import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const ProductSlider = () => {

  const products = [
    {
      id: 1,
      name: "Arm Accent Chair",
      price: "$14.50",
      image: "/images/ss1.jpg",
      largeImage: "/images/bs1.jpg",
    },
    {
      id: 2,
      name: "Gathering Set",
      price: "$120.00",
      image: "/images/ss2.png",
      largeImage: "/images/bs2.jpg",
    },
    {
      id: 3,
      name: "Cushion Sofa",
      price: "$150.00",
      image: "/images/ss3.png",
      largeImage: "/images/bs3.jpg",
    },
  ];


  const settings = {
    // dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
<div className="slider-container dynamicSlider">
    <Slider {...settings}>
      {products.map((product) => (
        <div>
          <div className="dualSlideContainer">
            <div className="largeImage">
              <img src={product.largeImage} alt={product.name} />
            </div>
            <div className="smallImage">
              <div className="smallSlideImage">
                <div className="slideImage">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="slideDetails">
                  <Link>{product.name}</Link>
                  <p>{product.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default ProductSlider;
