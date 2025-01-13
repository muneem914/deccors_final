import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { addToWishlist, getUserWishlist, removeFromWishlist } from "../controllers/wishlistControllers.js";

const router = express.Router();

router
  .route("/wishlist")
  .post(isAuthenticatedUser, addToWishlist)
  .get(isAuthenticatedUser, getUserWishlist)
  .delete(isAuthenticatedUser, removeFromWishlist);

export default router;
