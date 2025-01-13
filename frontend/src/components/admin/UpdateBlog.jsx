import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBlogCommentMutation,
  useDeleteBlogImageMutation,
  useGetBlogDetailsQuery,
  useUpdateBlogImageMutation,
  useUpdateBlogMutation,
} from "../../redux/api/blogApi";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";
import AdminFrame from "../layout/AdminFrame";
import { Box, Typography } from "@mui/material";
import { RxCross1, RxSlash } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import "./admin.scss";

const UpdateBlog = () => {
  const params = useParams();
  const { data } = useGetBlogDetailsQuery(params?.id);
  const [updateBlog, { isLoading, isSuccess, error }] = useUpdateBlogMutation();
  const [updateBlogImage] = useUpdateBlogImageMutation();
  const [deleteBlogImage, { isLoading: isDeleteLoading, error: deleteError }] =
    useDeleteBlogImageMutation();
  const [
    deleteBlogComment,
    {
      isSuccess: isCommentDeletedSuccesss,
      isLoading: isDeleteCommentLoading,
      error: deleteCommentError,
    },
  ] = useDeleteBlogCommentMutation();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    subTitle: "",
    description: "",
    quote1: "",
    quote2: "",
  });
  const { title, subTitle, description, quote1, quote2 } = newBlog;

  const onChangeText = (e) => {
    e.preventDefault();
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image);
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };
  useEffect(() => {
    if (data?.blog) {
      setNewBlog({
        title: data?.blog?.title,
        subTitle: data?.blog?.subTitle,
        description: data?.blog?.description,
        quote1: data?.blog?.quote1,
        quote2: data?.blog?.quote2,
      });
      setUploadedImages(data?.blog?.images);
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      setImagesPreview([]);
      toast.success("blog updated");
      navigate("/admin/blogs");
    }
    if (isCommentDeletedSuccesss) {
      toast.success("comment deleted");
      // navigate('/admin/blogs')
    }
  }, [error, isSuccess, data, isCommentDeletedSuccesss]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateBlog({ id: params?.id, body: newBlog });
    updateBlogImage({ id: params?.id, body: { images } });
  };
  const deleteImage = (imgId) => {
    deleteBlogImage({ id: params?.id, body: { imgId } });
  };

  // const date = new Date(data?.blog?.createdAt);

  // Format the date object into the desired format
  function dateFormatter(dateString) {
    const date = new Date(dateString); // Convert to Date object
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  }

  const deleteCommentHandler = (commentId) => {
    const blogId = params?.id;
    console.log(blogId, commentId);
    deleteBlogComment({ blogId, commentId });
    // toast.success("Commented Deleted")
  };

  return (
    <>
      <MetaData title="Update Blog" />
      <AdminFrame>
        <Box className="breadcrumb">
          <Link to="/admin/blogs">Blogs</Link> <RxSlash />{" "}
          <Link>Update Blogs</Link>
        </Box>
        <div className="newBlog">
          <Typography sx={{ my: 2, fontSize: "20px", textAlign: "center" }}>
            Update Your Blog
          </Typography>
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChangeText}
              placeholder="Blog Title (Max length: 80 Character)"
            />
            <input
              type="text"
              name="subTitle"
              id="subTitle"
              value={subTitle}
              onChange={onChangeText}
              placeholder="Blog Subtitle (Optional, Max Length: 100 Character)"
            />
            <textarea
              type="text"
              name="description"
              rows={4}
              id="description"
              value={description}
              onChange={onChangeText}
              placeholder="Blog Description"
            />
            <input
              type="text"
              name="quote1"
              id="quote1"
              value={quote1}
              onChange={onChangeText}
              placeholder="Blog Quote (Optional)"
            />
            <input
              type="text"
              name="quote2"
              id="quote2"
              value={quote2}
              onChange={onChangeText}
              placeholder="Another Blog Quote (Optional)"
            />

            <div className="imageInput">
              <input
                ref={fileInputRef}
                onClick={handleResetFileInput}
                type="file"
                onChange={onChange}
                name="product_images"
                multiple
              />
            </div>

            {/* <!-- New Images --> */}
            {imagesPreview?.length > 0 && (
              <div className="newImages ">
                <p>New Images:</p>
                <div className="previewContainer">
                  {imagesPreview?.map((img) => (
                    <div className="previewImage">
                      <div className="cardImg">
                        <img src={img} alt="Card" />
                      </div>
                      <button
                        onClick={() => handleImagePreviewDelete(img)}
                        type="button"
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* <!-- End New Images --> */}

            {/* <!-- Uploaded Images --> */}
            {uploadedImages?.length > 0 && (
              <div className="newImages ">
                <p>Uploaded Images:</p>
                <div className="previewContainer">
                  {uploadedImages?.map((img) => (
                    <div className="previewImage">
                      <div className="cardImg">
                        <img src={img?.url} alt="Card" />
                        <button
                          type="button"
                          disabled={isLoading || isDeleteLoading}
                          onClick={() => deleteImage(img?.public_id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3>Total comments {data?.blog?.comments?.length}</h3>
            {data?.blog?.comments?.length > 0
              ? data?.blog?.comments?.map((item) => (
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "1rem",
                      margin: "1rem",
                    }}
                  >
                    <p>Commented By: {item?.name}</p>
                    <p>Email: {item?.email}</p>
                    <p>Comment: {item?.message}</p>
                    <p>Time: {dateFormatter(item?.createdAt)} </p>
                    <button
                      onClick={() => deleteCommentHandler(item?._id)}
                      disabled={isDeleteCommentLoading}
                    >
                      Delete This Comment
                    </button>
                  </div>
                ))
              : "No comments for this post"}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "UPDATE"}
            </button>
          </form>
        </div>
      </AdminFrame>
    </>
  );
};

export default UpdateBlog;
