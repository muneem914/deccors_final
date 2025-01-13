import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Blog from "../models/blog.js";
// import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import mongoose, { mongo } from "mongoose";


// create new blog => api/v1/blogs/new
// export const createNewBlog = catchAsyncErrors(async (req, res) => {
//   req.body.user = req.user._id;
//   const blog = await Blog.create(req.body);
//   res.status(200).json({
//     blog,
//   });
// });

export const createNewBlog = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;

  // Validate image data (optional)
  if (!req.body.images || !Array.isArray(req.body.images)) {
    return next(new ErrorHandler("Invalid image data", 400));
  }

  // Process and store image data
  const imageUrls = await Promise.all(req.body.images.map(async (image) => {
    const uploadedImage = await upload_file(image, "shopit-copy/blogs");
    return {
      public_id: uploadedImage.public_id,
      url: uploadedImage.url,
    };
  }));

  // Generate a unique ID for the blog
  const blogId = new mongoose.Types.ObjectId();

  // Create blog with image URLs and generated ID
  const blog = await Blog.create({
    _id: blogId,
    ...req.body,
    images: imageUrls,
  });

  res.status(200).json({
    blog,
  });
});

// commenting to blog => api/v1/blogs/:id/comments
export const addCommentToBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }
  const newComment = {
    name,
    email,
    message,
  };
  blog.comments.push(newComment);
  await blog.save();
  res.status(200).json({
    success: true,
    comments: blog.comments,
  });
});


// deleting comments from blog ADMIN => /api/v1/admin/blogs/:id
export const deleteBlogComment = catchAsyncErrors(async(req, res, next) => {
  const { blogId, commentId } = req.params;
  const blog = await Blog.findById(blogId);
  
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  // Filter out the comment by its id
  blog.comments = blog.comments.filter(comment => comment._id.toString() !== commentId);
  await blog.save();

  // Send the updated comments array
  res.status(200).json({
    success: true,
    comments: blog.comments,
  });
});



// get all blogs => api/v1/blogs
export const getBlogs = catchAsyncErrors(async (req, res) => {
  // req.body.user = req.user._id;
  const blogs = await Blog.find().populate("user");

  res.status(200).json({
    blogs,
  });
});


// get admin blogs => api/v1/admin/blogs
export const getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find().populate("user");
  res.status(200).json({
    blogs,
  });
});


// get single blog => api/v1/blogs/:id
export const getBlogDetails = catchAsyncErrors(async (req, res, next) => {
  // req.body.user = req.user._id;
  const blog = await Blog.findById(req?.params?.id).populate("user");
  if (!blog) {
    return next(new ErrorHandler("blog Not found", 404));
  }

  res.status(200).json({
    blog,
  });
});



// update blog details => api/v1/blogs/:id
export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  let blog = await Blog.findById(req?.params?.id);

  if (!blog) {
    return next(new ErrorHandler("Blog Not found", 404));
  }

  blog = await Blog.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    blog,
  });
});

// update blog images => /api/v1/admin/blogs/:id/update_image
export const updateBlogImage = catchAsyncErrors(async (req, res, next) => {
  let blog = await Blog.findById(req?.params?.id);
  if (!blog) {
    return next(new ErrorHandler("blog Not found", 404));
  }
  const uploader = async (image) => upload_file(image, "shopit-copy/blogs");
  const urls = await Promise.all((req?.body?.images).map(uploader));

  blog?.images?.push(...urls);
  await blog?.save();
  res.status(200).json({
    blog,
  });
});



// delete blog image => /api/v1/admin/blogs/:id/delete_image
export const deleteBlogImage = catchAsyncErrors(async (req, res, next) => {
  let blog = await Blog.findById(req?.params?.id);
  if (!blog) {
    return next(new ErrorHandler("blog Not found", 404));
  }

  const isDeleted = await delete_file(req.body.imgId);
  // console.log(req.body.imgId);
  if (isDeleted) {
    blog.images = blog?.images?.filter(
      (img) => img.public_id !== req.body.imgId
    );
    await blog?.save();
  }
  res.status(200).json({
    blog,
  });
});


// delete blog  => api/v1/blogs/:id
export const deleteBlog = catchAsyncErrors(async (req, res) => {
  const blog = await Blog.findById(req?.params?.id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  // Deleting image associated with product
  for (let i = 0; i < blog?.images?.length; i++) {
    await delete_file(blog?.images[i].public_id);
  }

  await blog.deleteOne();

  res.status(200).json({
    message: "Blog Deleted",
  });
});