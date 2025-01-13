import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/features/cartSlice";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";
import MetaData from "../layout/MetaData";
import NotFound from "../layout/NotFound";
import {
  useAddToWishlistMutation,
  useGetUserWishlistQuery,
  useNewWishlistItemMutation,
  useRemoveFromWishlistMutation,
} from "../../redux/api/wishlistApi";

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  // Add these hooks
  const [addToWishlist, { isLoading: addLoading }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removeLoading }] =
    useRemoveFromWishlistMutation();
  const { data: wishlist } = useGetUserWishlistQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const product = data?.product;

  const dispatch = useDispatch();

  const [activeImg, setActiveImg] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

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

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
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

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist({ productId: product._id })
      setIsInWishlist(true);
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlist({ productId: product._id })
      setIsInWishlist(false);
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };

  if (isLoading) return <Loader />;
  if (error && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <MetaData title={product?.name} />
      <div className="row d-flex justify-content-around mt-5">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="p-3">
            <img
              className="d-block w-100"
              src={activeImg}
              alt={product?.name}
              width="340"
              height="390"
            />
          </div>
          <div className="row justify-content-start mt-5">
            {product?.images?.map((img) => (
              <div className="col-2 ms-4 mt-2">
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer ${
                      img.url === activeImg ? "border-warning" : ""
                    } `}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={(e) => setActiveImg(img.url)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3>
          <p id="product_id">Product # {product?._id}</p>

          <hr />

          <div className="d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="24px"
              starSpacing="1px"
            />
            <span id="no-of-reviews" className="pt-1 ps-2">
              {" "}
              ({product?.numOfReviews} Reviews){" "}
            </span>
          </div>
          <hr />

          <p id="lead">Our Price: ${product?.price}</p>

          <hr />
          <p>Grab the best quality product from us !</p>
          <br />
          <p>Style: {product?.style}</p>
          <p>Material: {product?.material}</p>
          <p>Size: {product?.size}</p>
          {product?.weight ? <p>Weight: {product?.weight}</p> : ""}
          <p>Categories: {product?.category.join(", ")}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>
              -
            </span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />
            <span className="btn btn-primary plus" onClick={increaseQty}>
              +
            </span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ms-4"
            disabled={product.stock <= 0}
            onClick={setItemToCart}
          >
            Add to Cart
          </button>

          {/* <button
            type="button"
            id="wishlist_btn"
            className="btn btn-primary d-inline ms-4"
            onClick={handleAddToWishlist}
            disabled={addLoading}
          >
            Add to Wishlist
          </button>
          <button className="btn btn-danger d-inline ms-4" onClick={handleRemoveFromWishlist} disabled={removeLoading}>
            Remove from Wishlist
          </button> */}

          {isInWishlist ? (
            <button className="btn btn-danger d-inline ms-4" onClick={handleRemoveFromWishlist} disabled={removeLoading}>
              Remove from Wishlist
            </button>
          ) : (
            <button className="btn btn-primary d-inline ms-4" onClick={handleAddToWishlist} disabled={addLoading}>
              Add to Wishlist
            </button>
          )}

          <hr />

          <p>
            Status:
            <span
              id="stock_status"
              className={product?.stock > 0 ? "greenColor" : "redColor"}
            >
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          <hr />

          <div className="description-block">
            <h4 className="mt-2">Description:</h4>
            <div className="designs">
              <h3>Designs</h3>
              <p>{product?.description[0]?.designs}</p>
            </div>
            <div className="specifications">
              <h3>Specifications</h3>
              {/* <p>{product?.description[0]?.specifications}</p> */}
              {product.description[0].specifications.includes("|") ? (
                <ul>
                  {product.description[0].specifications
                    .split("|")
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
              ) : (
                <p>{product?.description[0]?.specifications}</p>
              )}
            </div>
            <div className="features">
              <h3>Features</h3>
              {/* <p>{product.description[0].features}</p> */}
              {product.description[0].features.includes("|") ? (
                <ul>
                  {product.description[0].features
                    .split("|")
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
              ) : (
                <p>{product.description[0].features}</p>
              )}
            </div>
          </div>

          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{product?.seller}</strong>
          </p>

          {isAuthenticated ? (
            <NewReview productId={product?._id} />
          ) : (
            <div className="alert alert-danger my-5" type="alert">
              Login to post your review.
            </div>
          )}
        </div>
      </div>
      {product?.reviews?.length > 0 && (
        <ListReviews reviews={product?.reviews} />
      )}
    </>
  );
};

export default ProductDetails;
