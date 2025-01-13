import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Wishlist from "../models/wishlist.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// Add product to wishlist
export const addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [productId] });
  } else {
    if (wishlist.products.includes(productId)) {
      return next(new ErrorHandler("Product already in wishlist", 400));
    }
    wishlist.products.push(productId);
    await wishlist.save();
  }

  res.status(200).json({ success: true, wishlist });
});

// Remove product from wishlist
export const removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return next(new ErrorHandler("Wishlist not found", 404));
  }

  wishlist.products = wishlist.products.filter(
    (product) => product.toString() !== productId
  );

  await wishlist.save();

  res.status(200).json({ success: true, wishlist });
});

// Get user wishlist
export const getUserWishlist = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "products"
  );

  if (!wishlist) {
    return next(new ErrorHandler("Wishlist not found", 404));
  }

  res.status(200).json({ success: true, wishlist });
});
