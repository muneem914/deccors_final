import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import AdminFrame from "../layout/AdminFrame";
import { Box, Typography } from "@mui/material";
import { RxCross1, RxSlash } from "react-icons/rx";
import MetaData from "../layout/MetaData";
import { FaRegTrashAlt } from "react-icons/fa";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { data } = useGetProductDetailsQuery(params?.id);
  const [uploadProductImages, { isLoading, isSuccess, error }] =
    useUploadProductImagesMutation();
  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      setImagesPreview([]);
      toast.success("Image Uploaded");
      navigate("/admin/products");
    }
  }, [data, isSuccess, error, deleteError]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };
  return (
    <>
    <MetaData title={"Update Product Image - Admin"} />
      <AdminFrame>
      <Box className='breadcrumb'>
          <Link to="/admin/products">Products</Link> <RxSlash/> <Link>Update Image</Link>
      </Box>
      <div className="newBlog">
          <Typography sx={{ my: 2, fontSize: "20px", textAlign: "center" }}>
            Upload Product Images
          </Typography>
          <form onSubmit={submitHandler}>
              <label >
                Choose Product Images
              </label>

              <div className="imageInput">
                <input
                  ref={fileInputRef}
                  onClick={handleResetFileInput}
                  type="file"
                  onChange={onChange}
                  name="product_images"
                  id="customFile"
                  multiple
                />
              </div>

              {/* <!-- New Images --> */}
              {imagesPreview?.length > 0 && (
                <div className="newImages">
                  <p>New Images:</p>
                  <div className="previewContainer">
                    {imagesPreview?.map((img) => (
                      <div className="previewImage">
                        <div className="cardImg">
                          <img
                            src={img}
                            alt="Card"
                          />
                          <button
                            onClick={() => handleImagePreviewDelete(img)}
                            type="button"
                          >
                            <RxCross1 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <!-- End New Images --> */}

              {/* <!-- Uploaded Images --> */}
              {uploadedImages?.length > 0 && (
                <div className="newImages">
                  <p>Uploaded Product Images:</p>
                  <div className="previewContainer">
                    {uploadedImages?.map((img) => (
                      <div className="previewImage">
                        <div className="cardImg">
                          <img
                            src={img?.url}
                            alt="Card"
                          />
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

            <button
              type="submit"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
      </div>
      </AdminFrame>
    </>
  );
};

export default UploadImages;
