import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_MATERIALS,
  PRODUCT_STYLES,
} from "../../constants/contstants";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";
import AdminFrame from "../layout/AdminFrame";
import { Tooltip, Typography } from "@mui/material";
import { BsInfoCircle } from "react-icons/bs";
import "./admin.scss";

const NewProduct = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading, isSuccess, error }] =
    useCreateProductMutation();

  const initialProductState = {
    name: "",
    description: {
      designs: "",
      specifications: "",
      features: "",
    },
    price: "",
    size: "",
    style: "",
    material: "",
    weight: "",
    stock: "",
    seller: "",
    category: [],
    optional: "",
    ratings: "",
    numOfReviews: "",
  };
  const [product, setProduct] = useState(initialProductState);
  const {
    name,
    description,
    price,
    size,
    style,
    material,
    weight,
    stock,
    seller,
    category,
    optional,
    ratings,
    numOfReviews,
  } = product;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("description.")) {
      const [key, subKey] = name.split(".");
      setProduct({
        ...product,
        [key]: {
          ...product[key],
          [subKey]: value,
        },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProduct({ ...product, category: [...category, value] });
    } else {
      setProduct({
        ...product,
        category: category.filter((category) => category !== value),
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product created");
      // setProduct(initialProductState)
      navigate("/admin/products");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <>
      <MetaData title={"Create New Product - Admin"} />
      <AdminFrame>
        <div className="newProduct">
          <Typography sx={{ my: 2, fontSize: "20px" }}>
            Add New Product
          </Typography>
          <form onSubmit={submitHandler}>
            <div className="inputBox">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="descriptionContainer">
              <Tooltip title="Use separator ( | ) in each field, if you want to display as list item" arrow>
                Description <BsInfoCircle />
              </Tooltip>
              <br /> <br />
              <div className="descriptionBox">
                <div className="inputBox">
                  <label htmlFor="description.designs">Designs</label>
                  <textarea
                    type="text"
                    rows={2}
                    id="description.designs"
                    name="description.designs"
                    value={description.designs}
                    onChange={onChange}
                  />
                </div>
                <div className="inputBox">
                  <label htmlFor="description.specifications">
                    Specifications
                  </label>
                  <textarea
                    type="text"
                    rows={2}
                    id="description.specifications"
                    name="description.specifications"
                    value={description.specifications}
                    onChange={onChange}
                  />
                </div>
                <div className="inputBox">
                  <label htmlFor="description.features">Features</label>
                  <textarea
                    type="text"
                    rows={2}
                    id="description.features"
                    name="description.features"
                    value={description.features}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="inputBox">
              <label htmlFor="category_field">Category</label>
              <div className="categoryContainer">
                {PRODUCT_CATEGORIES.map((category) => (
                  <div key={category} className="categoryBox">
                    <input
                      type="checkbox"
                      id={`category_${category}`}
                      name="category"
                      value={category}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={`category_${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="optionalContainer">
              <div className="inputBox">
                <label htmlFor="price_field"> Price </label>
                <input
                  type="text"
                  id="price_field"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="size_field"> size </label>
                <input
                  type="text"
                  id="size_field"
                  name="size"
                  value={size}
                  onChange={onChange}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="stock_field"> Stock </label>
                <input
                  type="number"
                  id="stock_field"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="style_field">Style</label>
                <select
                  id="style_field"
                  name="style"
                  value={style}
                  onChange={onChange}
                >
                  <option>Select Style</option>
                  {PRODUCT_STYLES?.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inputBox">
                <label htmlFor="material_field">Material</label>
                <select
                  id="material_field"
                  name="material"
                  value={material}
                  onChange={onChange}
                >
                  <option>Select material</option>
                  {PRODUCT_MATERIALS?.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inputBox">
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={onChange}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="seller_field"> Seller Name </label>
                <input
                  type="text"
                  id="seller_field"
                  name="seller"
                  value={seller}
                  onChange={onChange}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="optional">Optional</label>
                <input
                  type="text"
                  id="optional"
                  name="optional"
                  value={optional}
                  onChange={onChange}
                />
              </div>

              <div className="inputBox">
                <label htmlFor="ratings">Ratings</label>
                <input
                  type="text"
                  id="ratings"
                  name="ratings"
                  value={ratings}
                  onChange={onChange}
                />
              </div>
              <div className="inputBox">
                <label htmlFor="numOfReviews">Number of Reviews</label>
                <input
                  type="text"
                  id="numOfReviews"
                  name="numOfReviews"
                  value={numOfReviews}
                  onChange={onChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "CREATE"}
            </button>
          </form>
        </div>
      </AdminFrame>
    </>
  );
};

export default NewProduct;
