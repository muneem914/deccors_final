import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import {
  useGetAdminProductsQuery,
  useGetAllProductsQuery,
  useGetProductsQuery,
} from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Filters from "../layout/Filters";
import {
  useGetAdminBlogsQuery,
  useGetBlogsQuery,
} from "../../redux/api/blogApi";
// import Blogs from "../blog/Blogs";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";
import { Box } from "@mui/material";

import "./pages.scss"
const ProductFilter = () => {

  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
//   const { data: productData } = useGetAllProductsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const columnSize = keyword || category ? 4 : 3;

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Products"} />
      <PageFrame>
        <MainFrame>
          <div className="row mt-3">
            {(keyword || category) && (
              <div className="col-6 col-md-3">
                <Filters />
              </div>
            )}
            <div
              className={
                keyword || category ? "col-6 col-md-9" : "col-6 col-md-12"
              }
            >
              <h2 style={{marginBottom: 20}}>
                {keyword
                  ? `${data?.products?.length} Products found with keyword: ${keyword}`
                  : category
                  ? `${data?.products?.length} Products found with category: ${category}`
                  : "Latest Products"}
              </h2>

              <Box className="filterProductContainer">
                  {data?.products?.map((product, index) => (
                  <ProductItem
                    key={index}
                    product={product}
                  />
                ))}
              </Box>

              <CustomPagination
                resPerPage={data?.resPerPage}
                filteredProductsCount={data?.filteredProductsCount}
              />

            </div>
          </div>
        </MainFrame>
      </PageFrame>
    </>
  );
};

export default ProductFilter;
