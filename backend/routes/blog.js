import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  addCommentToBlog,
  createNewBlog,
  deleteBlog,
  deleteBlogComment,
  deleteBlogImage,
  getAdminBlogs,
  getBlogDetails,
  getBlogs,
  updateBlog,
  updateBlogImage,
} from "../controllers/blogControllers.js";

const router = express.Router();

router.route("/blogs").get(getBlogs);
router.route("/blogs/:id").get(getBlogDetails);
// commenting to blog
router.route("/blogs/:id/comments").post(isAuthenticatedUser, addCommentToBlog);
router.route("/admin/blogs/:blogId/comments/:commentId").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlogComment)
router
  .route("/admin/blogs")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBlogs);
router
  .route("/admin/blogs/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createNewBlog);
router
  .route("/admin/blogs/:id/update_blog_data")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog);
router
  .route("/admin/blogs/:id/delete_full_blog")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

router
  .route("/admin/blogs/:id/delete_image")
  .put(isAuthenticatedUser, authorizeRoles("admin"), deleteBlogImage);
router
  .route("/admin/blogs/:id/update_image")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBlogImage);
export default router;
