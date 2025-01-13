import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { SlEye } from "react-icons/sl";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";
import {
  useAddToWishlistMutation,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/api/wishlistApi";
import Dialog from "@mui/material/Dialog";
import { RxCross1 } from "react-icons/rx";
import { FaPlus, FaMinus, FaArrowRightLong } from "react-icons/fa6";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [addToWishlist, { isLoading: addLoading }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removeLoading }] =
    useRemoveFromWishlistMutation();
  const { data: wishlist } = useGetUserWishlistQuery();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const increaseQty = () => {
  //   const count = document.querySelector(".count");
  //   if (count.valueAsNumber >= product?.stock) return;
  //   const qty = count.valueAsNumber + 1;
  //   setQuantity(qty);
  // };
  // const decreaseQty = () => {
  //   const count = document.querySelector(".count");
  //   if (count.valueAsNumber <= 1) return;
  //   const qty = count.valueAsNumber - 1;
  //   setQuantity(qty);
  // };

  const increaseQty = () => {
    if (quantity >= product?.stock) return;
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity((prevQty) => prevQty - 1);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };
    dispatch(setCartItems(cartItem));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    if (product && wishlist) {
      const inWishlist = wishlist.wishlist.products.some(
        (item) => item._id === product._id
      );
      setIsInWishlist(inWishlist);
      // if (inWishlist) {
      //   toast.error("This product is already in your wishlist.");
      // }
    }
  }, [wishlist, product]);

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist({ productId: product._id });
      setIsInWishlist(true);
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlist({ productId: product._id });
      setIsInWishlist(false);
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };

  return (
    <>
      <div className="trendyCollection">
        <div className="imageBox">
          <img
            src={
              product?.images[0]
                ? product?.images[0]?.url
                : "/images/default_product.png"
            }
            alt={product?.name}
          />
          <div className="imageOverly">
            <div className="icons">
              <button title="Quick Order" onClick={handleClickOpen}>
                <SlEye />
              </button>
              {isInWishlist ? (
                <button
                  title="Remove from wishlist"
                  onClick={handleRemoveFromWishlist}
                >
                  <IoHeartDislikeOutline />
                </button>
              ) : (
                <button title="Add to wishlist" onClick={handleAddToWishlist}>
                  <HiOutlineHeart />
                </button>
              )}
            </div>
            <div className="button">
              <button disabled={product.stock <= 0} onClick={setItemToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="details">
          <h5>
            <Link to={`/product/${product?._id}`}>{product?.name}</Link>
          </h5>
          <p>$ {(product?.price ?? 0).toFixed(2)}</p>
        </div>
      </div>

      <Dialog open={open} maxWidth="md" onClose={handleClose}>
        <div className="dialogContainer">
          <div className="dialogContent">
            <div className="dialogImgContainer">
              <button className="closeBtn" onClick={handleClose}>
                <RxCross1 />
              </button>
              <img
                src={
                  product?.images[0]
                    ? product?.images[0]?.url
                    : "/images/default_product.png"
                }
                alt={product?.name}
              />
            </div>
            <div className="dialogInfoContainer">
              <h3>{product?.name}</h3>
              <div className="starRating">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#000000"
                  numberOfStars={5}
                  name="rating"
                  starDimension="16px"
                  starSpacing="1px"
                />
                <span>{product?.numOfReviews} Reviews</span>
              </div>
              <p className="price">
                Our Price: <span>$ {(product?.price ?? 0).toFixed(2)}</span>
              </p>
              <hr />
              <p>Grab the best quality fabrics with free size.</p>
              <div className="detailBox">
                <div>Material:</div>
                <span className="info">{product?.material}</span>
              </div>
              <div className="detailBox">
                <div>Style:</div>
                <span className="info">{product?.style}</span>
              </div>
              <div className="detailBox">
                <div>Size:</div>
                <span className="info">{product?.size}</span>
              </div>
              {product.weight ? (
                <div className="detailBox">
                  <div>Weight:</div>
                  <span className="info">{product?.weight}</span>
                </div>
              ) : (
                ""
              )}
              <div className="detailBox">
                <p>Category:</p>
                <span className="category">{product?.category.join(", ")}</span>
              </div>

              <div className="incDecBtn">
                <div className="incDecStock">
                  <span onClick={decreaseQty}>
                    <FaMinus />
                  </span>
                  <input type="number" value={quantity} readOnly />
                  <span onClick={increaseQty}>
                    <FaPlus />
                  </span>
                </div>
                <button disabled={product.stock <= 0} onClick={setItemToCart}>
                  Add to Cart
                </button>
              </div>
              <div className="fullDetails">
                <Link to={`/product/${product?._id}`}>
                  view full details <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductItem;
