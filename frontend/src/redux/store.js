import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { orderApi } from "./api/orderApi";
import { blogApi } from "./api/blogApi";
import { wishlistApi } from "./api/wishlistApi";
import { contactApi } from "./api/contactApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      blogApi.middleware,
      wishlistApi.middleware,
      contactApi.middleware,
    ]),
});