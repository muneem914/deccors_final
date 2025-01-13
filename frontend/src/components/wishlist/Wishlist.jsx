import React from "react";
import {
  useGetUserWishlistQuery,
  useMyWishlistsQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/api/wishlistApi";
import toast from "react-hot-toast";
import "./wishlist.css";
import MetaData from "../layout/MetaData";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";
import Button from '@mui/material/Button';
import { GoTrash } from "react-icons/go";

const Wishlist = () => {
  const { data: wishlist, error, isLoading } = useGetUserWishlistQuery();
  const [removeFromWishlist, { isLoading: removeLoading }] =
    useRemoveFromWishlistMutation();

  // console.log(wishlist.wishlist.products.length);
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist({ productId });
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>Error loading wishlist: {error.data.message}</p>;
  }
  return (
    <>
      <MetaData title={"Your Cart"} />
      <PageFrame>
        <MainFrame>
          <h4>{wishlist?.wishlist?.products?.length} product in your wishlist</h4>
          <br />
          {wishlist.wishlist.products.length > 0 ? (
            <div>
              {wishlist.wishlist.products.map((product) => (
                <div key={product._id} className="wishlist-item">
                  <img
                    src={
                      product?.images[0]
                        ? product?.images[0]?.url
                        : "/images/default_product.png"
                    }
                    alt={product.name}
                  />
                  <div className="details">
                  <h5>{product?.name}</h5>
                  <h6>$ {product?.price}</h6>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    disabled={removeLoading}
                  >
                     <GoTrash size={24} color="red"/>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            "no products in wishlist"
          )}
        </MainFrame>
      </PageFrame>
    </>
  );
};

export default Wishlist;
