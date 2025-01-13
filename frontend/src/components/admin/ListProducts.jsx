import React, { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import AdminFrame from "../layout/AdminFrame";
import { Typography } from "@mui/material";

import { CiEdit } from "react-icons/ci";
import { TbPhotoEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";


const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();
  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Deleted");
    }
  }, [error, deleteError, isSuccess]);

  if (isLoading) return <Loader />;

  const columns = [
    { field: "createdAt", headerName: "Created At", width: 100 },
    { field: "id", headerName: "ID", width: 210 },
    { field: "name", headerName: "Name", width: 220 },
    { field: "category", headerName: "Category", width: 300 },
    { field: "price", headerName: "Price($)", width: 80 },
    { field: "stock", headerName: "Stock", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Link
            to={`/admin/products/${params.row.id}`}
          >
            <CiEdit size={24} color="blue" style={{marginRight: '15px'}}/>
          </Link>
          <Link
            to={`/admin/products/${params.row.id}/upload_images`}
          >
            <TbPhotoEdit size={24} color="green" style={{marginRight: '15px'}}/>
          </Link>
          <span style={{cursor: 'pointer'}}
            onClick={() => deleteProductHandler(params.row.id)}
            disabled={isDeleteLoading}
          >
            <HiOutlineTrash size={24} color="red" style={{marginRight: '5px'}}/>
          </span>
        </>
      ),
    },
  ];

  const rows = data?.products?.map((product) => ({
    createdAt: product?.createdAt?.substring(0,10),
    id: product?._id,
    name: product?.name,
    category: product?.category.join(", "),
    price: product?.price,
    stock: product?.stock,
  }));

  return (
    <>
      <MetaData title={"All Products"} />

      <AdminFrame>
        <Typography sx={{my: 2, fontSize: '20px'}}><strong>{data?.products?.length}</strong> Products</Typography>

        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        </div>
      </AdminFrame>
    </>
  );
};

export default ListProducts;
