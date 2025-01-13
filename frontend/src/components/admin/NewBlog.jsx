import React, { useEffect, useRef, useState } from "react";
import { useCreateNewBlogMutation } from "../../redux/api/blogApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminFrame from "../layout/AdminFrame";
import { Typography } from "@mui/material";
import { RxCross1 } from "react-icons/rx";

import "./admin.scss";

const NewBlog = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  
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

  const [createNewBlog, { isLoading, isSuccess, error }] =
    useCreateNewBlogMutation();
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

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("New Blog created");
      navigate("/admin/blogs");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const blogData = {
      ...newBlog,
      images,
    };

    createNewBlog(blogData);
    // ...
  };

  return (
    <>
      <MetaData title="Create New Blog" />
      <AdminFrame>
        <div className="newBlog">
          <Typography sx={{ my: 2, fontSize: "20px" }}>
            Write a new Blog
          </Typography>
          <form onSubmit={submitHandler}>
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
              rows={4}
              name="description"
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
                        <img
                          src={img}
                          alt="Card"
                        />
                      </div>
                      <button
                        onClick={() => handleImagePreviewDelete(img)}
                        type="button"
                      >
                        <RxCross1 color="red" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* <!-- End New Images --> */}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "CREATE"}
            </button>
          </form>
        </div>
      </AdminFrame>
    </>
  );
};

export default NewBlog;
