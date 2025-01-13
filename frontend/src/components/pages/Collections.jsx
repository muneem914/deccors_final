import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";
import "./pages.scss";

const Collections = () => {
  const collectionArray = [
    {
      name: "Cupboard",
      img1: "/images/collections/cup1.jpg",
      img2: "/images/collections/cup2.jpg",
      link: "/products/?category=Cupboard",
    },
    {
      name: "Decorative",
      img1: "/images/collections/decorative1.jpg",
      img2: "/images/collections/decorative2.jpg",
      link: "/products/?category=Decorative",
    },
    {
      name: "Designer Furniture",
      img1: "/images/collections/designer_furniture1.jpg",
      img2: "/images/collections/designer_furniture2.jpg",
      link: "/products/?category=Designer+Furniture",
    },
    {
      name: "Dining",
      img1: "/images/collections/dining1.jpg",
      img2: "/images/collections/dining2.jpg",
      link: "/products/?category=Dining",
    },
    {
      name: "Furniture",
      img1: "/images/collections/furniture1.jpg",
      img2: "/images/collections/furniture2.jpg",
      link: "/products/?category=Furniture",
    },
    {
      name: "Lamps & Lightings",
      img1: "/images/collections/lamps1.jpg",
      img2: "/images/collections/lamps2.jpg",
      link: "/products/?category=Lamps+%26+Lighting",
    },
    {
      name: "Living Room Furniture",
      img1: "/images/collections/living1.jpg",
      img2: "/images/collections/living2.jpg",
      link: "/products/?category=Living+Room+Furniture",
    },
    {
      name: "Modern Light",
      img1: "/images/collections/modern1.jpg",
      img2: "/images/collections/modern2.jpg",
      link: "/products/?category=Modern+Light",
    },
    {
      name: "Modular Kitchen",
      img1: "/images/collections/modular_kitchen1.jpg",
      img2: "/images/collections/modular_kitchen2.jpg",
      link: "/products/?category=Modular+Kitchen",
    },
    {
      name: "Room Set",
      img1: "/images/collections/room_set1.jpg",
      img2: "/images/collections/room_set2.jpg",
      link: "/products/?category=Room+Set",
    },
    {
      name: "Tea Tables",
      img1: "/images/collections/tea1.jpg",
      img2: "/images/collections/tea2.jpg",
      link: "/products/?category=Tea+Tables",
    },
    {
      name: "Other",
      img1: "/images/collections/other1.jpg",
      img2: "/images/collections/other2.jpg",
      link: "/products/?category=Other",
    },
  ];
  return (
    <>
      <MetaData title="All collections" />
      <PageFrame>
        <div className="imageContainer collection">
          {/* <img src="/images/collections/collection_banner.jpg" alt="banner" /> */}
          <div className="row">
            <h1>All Collections</h1>
          </div>
        </div>
        <MainFrame>
            <div className="collections">
              {collectionArray.map((item) => (
                <Link to={item.link}>
                  <div className="collection">
                    <img src={item.img1} alt="product" />
                    <div className="collectionTitle">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
        </MainFrame>
      </PageFrame>
    </>
  );
};

export default Collections;
