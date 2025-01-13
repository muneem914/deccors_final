import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";
import NewProduct from "../admin/NewProduct";
import UpdateProduct from "../admin/UpdateProduct";
import UploadImages from "../admin/UploadImages";
import ListOrders from "../admin/ListOrders";
import ProcessOrder from "../admin/ProcessOrder";
import ListUsers from "../admin/ListUsers";
import UpdateUser from "../admin/UpdateUser";
import ProductReview from "../admin/ProductReview";
import UpdateBlog from "../admin/UpdateBlog";
import ListBlogs from "../admin/ListBlogs";
import NewBlog from "../admin/NewBlog";
import ListMessages from "../admin/ListMessages";
import MessageDetails from "../admin/MessageDetails";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/new"
        element={
          <ProtectedRoute admin={true}>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id/upload_images"
        element={
          <ProtectedRoute admin={true}>
            <UploadImages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <ListOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <ListUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute admin={true}>
            <ProductReview />
          </ProtectedRoute>
        }
      />

      {/* blog routes for v2 */}
      <Route
        path="/admin/blogs/edit/:id"
        element={
          <ProtectedRoute>
            <UpdateBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute>
            <ListBlogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog/new"
        element={
          <ProtectedRoute>
            <NewBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <ListMessages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages/:id"
        element={
          <ProtectedRoute>
            <MessageDetails />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
